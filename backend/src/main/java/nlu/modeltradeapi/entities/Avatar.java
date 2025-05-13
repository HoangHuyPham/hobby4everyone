package nlu.modeltradeapi.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "avatars")
@Entity(name = "avatar")
public class Avatar implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "avatar_id")
    private String avatarId;
    @ManyToOne
    @JoinColumn(name = "image_id")
    private Image image;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    @Column(name = "main")
    private boolean main = true;
    @Column(name = "see")
    @Builder.Default
    private boolean see = true;
}
