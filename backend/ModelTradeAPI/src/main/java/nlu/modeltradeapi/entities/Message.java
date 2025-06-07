package nlu.modeltradeapi.entities;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "messages")
@Entity(name = "message")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Message implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "message_id")
    String messageId;
    @ManyToOne
    @JoinColumn(name = "chatu_id")
    ChatUser chatUser;
    @Lob
    @Column(name = "context")
    String context;
    @Column(name = "send_at")
    @Builder.Default
    LocalDateTime sendAt = LocalDateTime.now();
    @Column(name = "is_read")
    boolean isRead;
}
