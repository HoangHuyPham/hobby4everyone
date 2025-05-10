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
@Table(name = "evaluate_users")
@Entity(name = "evaluate_user")
public class EvaluateUser implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "eu_id")
    private Long id;
    @ManyToOne
    @JoinColumn(name = "reviewer_id")
    private User reviewer;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    @Column(name ="evaluate_detail")
    private String evaluateDetail;
    @Column(name ="star")
    private int star;
    @Column(name = "evaluate_date")
    private LocalDateTime evaluateDate;
}
