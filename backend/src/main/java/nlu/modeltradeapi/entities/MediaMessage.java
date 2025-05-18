package nlu.modeltradeapi.entities;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.io.Serializable;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "media_messages")
@Entity(name = "media_message")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class MediaMessage implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "mmessage_id")
    private Long mmessageId;
    @ManyToOne
    @JoinColumn(name = "message_id")
    Message message;
    @Lob
    @Column(name = "link_media")
    String linkMedia;
}
