package structure.librarium.config.websocket;

import jakarta.websocket.Session;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketSession;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class SessionManager {

    private final Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>();


    public void register(String userId, WebSocketSession session){
        sessions.put(userId, session);
    }

    public void remove(String userId){
        sessions.remove(userId);
    }

    public void removeBySession(Session session){
     String userIdToRemove = null;

     for (Map.Entry<String, WebSocketSession> entry : sessions.entrySet()) {
         if(entry.getValue().getId().equals(session.getId())){
             userIdToRemove = entry.getKey();
                break;
         }
     }
        if(userIdToRemove != null){
            sessions.remove(userIdToRemove);
        }
    }

    public boolean isUserOnline(String userId){
        return sessions.containsKey(userId);
    }

    public WebSocketSession getSession(String userId){
        return sessions.get(userId);
    }

    public boolean sendToUser(String userId, String message){
        WebSocketSession session = sessions.get(userId);
        if (session != null && session.isOpen()){
            try {
                session.sendMessage(new org.springframework.web.socket.TextMessage(message));
                return true;
            }
            catch (IOException e){
                e.printStackTrace();
                return  false;
            }
        }
        return false;
    }

    public int getActiveSessionCount(){
        return sessions.size();
    }
}
