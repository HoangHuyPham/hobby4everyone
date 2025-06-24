package vn.edu.hcmuaf.hobby4everyone.services.template;

import vn.edu.hcmuaf.hobby4everyone.entities.User;

public interface INotificationService {
    void addNotification(String title, String content, User target);
    void notifyUser(User user, String message);
}
