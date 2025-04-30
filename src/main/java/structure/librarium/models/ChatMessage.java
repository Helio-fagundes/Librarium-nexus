package structure.librarium.models;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class ChatMessage {
    private String id;
    private String senderId;
    private String recipientId;
    private String content;
    private LocalDateTime timestamp;
    private MessageType type;

    public enum MessageType {
        CHAT,
        JOIN,
        LEAVE
    }

    public ChatMessage(){
        this.timestamp = LocalDateTime.now();
    }

    public ChatMessage(String senderId, String recipientId, String content) {
        this();
        this.senderId = senderId;
        this.recipientId = recipientId;
        this.content = content;
        this.type = MessageType.CHAT;
    }

}
