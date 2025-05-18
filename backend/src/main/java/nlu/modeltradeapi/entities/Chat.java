package nlu.modeltradeapi.entities;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.io.Serializable;
import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "chats")
@Entity(name = "chat")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Chat implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "chat_id")
    private Long chatId;
    @Column(name = "active")
    @Builder.Default
    boolean active = true;
    @Column(name = "create_date")
    @Builder.Default
    LocalDate createDate = LocalDate.now();
    @Column(name = "is_delete")
    @Builder.Default
    boolean isDelete = false;
}
