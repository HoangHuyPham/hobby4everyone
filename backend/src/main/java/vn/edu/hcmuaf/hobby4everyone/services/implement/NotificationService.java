package vn.edu.hcmuaf.hobby4everyone.services.implement;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import vn.edu.hcmuaf.hobby4everyone.entities.Notification;
import vn.edu.hcmuaf.hobby4everyone.entities.User;
import vn.edu.hcmuaf.hobby4everyone.repository.NotificationRepository;
import vn.edu.hcmuaf.hobby4everyone.services.template.INotificationService;
import vn.edu.hcmuaf.hobby4everyone.websocket.WebSocketSessionManager;

@Service
public class NotificationService implements INotificationService{

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private WebSocketSessionManager sessionManager;

    @Override
    public void addNotification(String title, String content, User target) {
        Notification newNotification = Notification.builder()
        .title(title)
        .content(content)
        .target(target)
        .build();

        notificationRepository.save(newNotification);
    }

    @Override
    public void notifyUser(User user, String message) {
        WebSocketSession session = sessionManager.getSession(user.getUserName());
        if (session != null && session.isOpen()) {
            try {
                session.sendMessage(new TextMessage(message));
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
