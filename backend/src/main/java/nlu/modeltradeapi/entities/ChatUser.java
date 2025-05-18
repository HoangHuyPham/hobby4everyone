package nlu.modeltradeapi.entities;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.io.Serializable;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "chat_users")
@Entity(name = "chat_user")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ChatUser implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "chatu_id")
    String chatu_id;
    @ManyToOne
    @JoinColumn(name = "chat_id")
    Chat chat;
    @ManyToOne
    @JoinColumn(name = "sender_id")
    User sender;
    @Column(name = "is_ignore")
    boolean is_ignore;
}
