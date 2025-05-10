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
@Table(name = "reacts")
@Entity(name = "react")
public class React implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "react_id")
    private Long reactId;
    @ManyToOne
    @JoinColumn(name = "image_id")
    private Image image;
    @Column(name = "name")
    private String name;
    @Column(name = "is_positive")
    private boolean isPositive;
}
