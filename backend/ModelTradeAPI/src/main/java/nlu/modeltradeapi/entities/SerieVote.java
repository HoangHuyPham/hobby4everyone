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
@Table(name = "serie_votes")
@Entity(name = "serie_vote")
public class SerieVote implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "sv_id")
    private String svId;
    @ManyToOne
    @JoinColumn(name = "vsp_id")
    private VoteSeriePost voteSeriePost;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    @Column(name = "vote_type")
    private boolean voteType;
}
