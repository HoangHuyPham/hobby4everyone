package vn.edu.hcmuaf.hobby4everyone.websocket;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketSession;

import java.util.concurrent.ConcurrentHashMap;

@Component
public class WebSocketSessionManager {
    private final ConcurrentHashMap<String, WebSocketSession> sessions = new ConcurrentHashMap<>();

    public void register(String user, WebSocketSession session) {
        sessions.put(user, session);
    }

    public void unregister(String user) {
        sessions.remove(user);
    }

    public WebSocketSession getSession(String user) {
        return sessions.get(user);
    }

    public boolean isConnected(String user) {
        return sessions.containsKey(user);
    }
}
