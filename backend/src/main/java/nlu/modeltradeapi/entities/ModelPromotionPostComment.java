package nlu.modeltradeapi.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "model_promotion_post_comments")
@Entity(name = "model_promotion_post_comment")
public class ModelPromotionPostComment implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "mppc_id")
    private String mppcId;
    @ManyToOne
    @JoinColumn(name = "user_id")
    User user;
    @ManyToOne
    @JoinColumn(name = "mpp_id")
    private ModelPromotionPost modelPromotionPost;
    @Column(name = "parent_id")
    private String parentId;
    @Column(name = "context", columnDefinition = "TEXT")
    private String context;
    @Column(name = "created_time")
    private LocalDateTime createdTime;
}
