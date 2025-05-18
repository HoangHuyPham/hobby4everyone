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
@Table(name = "model_promotion_posts")
@Entity(name = "model_promotion_post")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ModelPromotionPost implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "mpp_id")
    private String mppId;
    @ManyToOne
    @JoinColumn(name = "model_id")
    private Model model;
    @Lob
    @Column(name = "promotion_description", columnDefinition = "TEXT")
    private String promotionDescription;
    @Column(name = "post_time")
    @Builder.Default
    private LocalDateTime postTime = LocalDateTime.now();
    @Column(name = "total_share")
    private int totalShare;
    @Column(name = "is_delete")
    @Builder.Default
    private boolean isDelete = false;
}
