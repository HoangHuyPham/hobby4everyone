package vn.edu.hcmuaf.hobby4everyone.websocket.handler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import vn.edu.hcmuaf.hobby4everyone.services.implement.AuthenticationService;
import vn.edu.hcmuaf.hobby4everyone.services.service_sp_object.JWTInfo;
import vn.edu.hcmuaf.hobby4everyone.websocket.WebSocketSessionManager;

@Component
public class WebSocketHandler extends TextWebSocketHandler {

    @Autowired
    private WebSocketSessionManager sessionManager;

    @Autowired
    private AuthenticationService authenticationService;

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        String token = session.getUri().getQuery().split("token=")[1];
        JWTInfo info = authenticationService.extractInfo(token);

        session.getAttributes().put("user", info.getUserName());
        sessionManager.register(info.getUserName(), session);

        System.out.println("User " + info.getUserName() + " connected");
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        String user = (String) session.getAttributes().get("user");
        sessionManager.unregister(user);
        System.out.println("User " + user + " disconnected");
    }
}

