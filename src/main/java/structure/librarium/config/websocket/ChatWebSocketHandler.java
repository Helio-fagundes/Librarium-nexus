package structure.librarium.config.websocket;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import structure.librarium.models.ChatMessage;
import structure.librarium.service.ChatService;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;


@Component
public class ChatWebSocketHandler extends TextWebSocketHandler {

    private final ObjectMapper objectMapper;
    private final SessionManager sessionManager;
    private final ChatService chatService;

    private final Map<String, String> SessionUserMap = new ConcurrentHashMap<>();

    @Autowired
    public ChatWebSocketHandler(ObjectMapper objectMapper, SessionManager sessionManager, ChatService chatService) {
        this.objectMapper = objectMapper;
        this.sessionManager = sessionManager;
        this.chatService = chatService;
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {


    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        String payload = message.getPayload();
        ChatMessage chatMessage = objectMapper.readValue(payload, ChatMessage.class);

        if(chatMessage.getType() == ChatMessage.MessageType.JOIN){
            handlerUserJoin(session, chatMessage);
        }
        else {
            handlerChatMessage(chatMessage);
        }
    }

    private void handlerUserJoin(WebSocketSession session, ChatMessage message){
        String userID = message.getSenderId();

        sessionManager.register(userID, session);
        SessionUserMap.put(session.getId(), userID);

        chatService.handlerUserJoin(userID);

        try{
            ChatMessage confirmationMessage = new ChatMessage();
            confirmationMessage.setType(ChatMessage.MessageType.JOIN);
            confirmationMessage.setContent("conectado com sucesso!");

            session.sendMessage(new TextMessage(objectMapper.writeValueAsString(confirmationMessage)));
        }
        catch (IOException e){
            e.printStackTrace();
        }
    }

    private void handlerChatMessage(ChatMessage message){
        chatService.saveMessage(message);

        String recipientId = message.getRecipientId();

        if (sessionManager.isUserOnline(recipientId)) {
            try {
                String JsonMessage = objectMapper.writeValueAsString(message);

                sessionManager.sendToUser(recipientId, JsonMessage);
            }
            catch (IOException e){
                e.printStackTrace();
            }
        }
        else {
            chatService.storeOfflineMessage(message);
        }
    }

    @Override

    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        String userId = SessionUserMap.get(session.getId());

        if(userId != null){
            sessionManager.remove(userId);
            SessionUserMap.remove(session.getId());

            chatService.handlerUserLeave(userId);
        }
    }
}
