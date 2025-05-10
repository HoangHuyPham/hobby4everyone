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
@Table(name = "vote_serie_posts")
@Entity(name = "vote_serie_post")
public class VoteSeriePost implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "vsp_id")
    private String vspId;
    @ManyToOne
    @JoinColumn(name = "serie_id")
    private Serie serie;
    @Column(name = "description", columnDefinition = "TEXT")
    private String description;
    @Column(name = "created_time")
    private LocalDateTime createdTime;
    @Column(name = "expiration_time")
    private LocalDateTime expirationTime;
    @Column(name = "total_share")
    private int totalShare;
}
