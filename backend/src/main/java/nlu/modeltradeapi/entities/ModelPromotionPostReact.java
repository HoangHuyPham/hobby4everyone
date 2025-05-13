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
@Table(name = "model_promotion_post_reacts")
@Entity(name = "model_promotion_post_react")
public class ModelPromotionPostReact implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "mppr_id")
    private Long mpprId;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    @ManyToOne
    @JoinColumn(name = "mpp_id")
    ModelPromotionPost modelPromotionPost;
    @ManyToOne
    @JoinColumn(name = "react_id")
    private React react;
    @Column(name = "react_time")
    private LocalDateTime reactTime;
}
