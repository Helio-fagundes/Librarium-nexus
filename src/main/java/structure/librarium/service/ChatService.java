package structure.librarium.service;

import org.springframework.stereotype.Service;
import structure.librarium.models.ChatMessage;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;


@Service
public class ChatService {

    private final Map<String, List<ChatMessage>> offlineMessages = new ConcurrentHashMap<>();

    private  final List<ChatMessage> messageHistory = new ArrayList<>();

    public void saveMessage(ChatMessage message){
        if (message.getId() == null){
            message.setId(UUID.randomUUID().toString());
        }
        messageHistory.add(message);
    }

    public void storeOfflineMessage(ChatMessage message){
        String recipientId = message.getRecipientId();

        offlineMessages.computeIfAbsent(recipientId, K -> new ArrayList<>());

        offlineMessages.get(recipientId).add(message);
    }


    private List<ChatMessage> deliverOfflineMessages(String userId){
        List<ChatMessage> messages = offlineMessages.get(userId);

        if (messages != null && !messages.isEmpty()){

            offlineMessages.remove(userId);
            return messages;
        }
        return new ArrayList<>();
    }

    public List<ChatMessage> getChatHistory(String user1, String user2){
        List<ChatMessage> chatHistory = new ArrayList<>();

        for (ChatMessage message : messageHistory){
            if((message.getSenderId().equals(user1) && message.getRecipientId().equals(user2)) ||
                (message.getSenderId().equals(user2) && message.getRecipientId().equals(user1))){
                chatHistory.add(message);
            }
        }
        return chatHistory;
    }

    public void handlerUserJoin(String userId){
        deliverOfflineMessages(userId);

        System.out.println("usuario conectado: " + userId);
    }

    public void handlerUserLeave(String userId){
        System.out.println("usuario desconectado: " + userId);
    }
}
