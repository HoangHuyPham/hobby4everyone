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
@Table(name = "models")
@Entity(name = "model")
public class Model implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "model_id")
    private String modelId;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    @Column(name = "name")
    private String name;
    @Column(name = "description", columnDefinition = "TEXT")
    private String description;
    @Column(name = "price")
    private double price;
    @Column(name = "see")
    @Builder.Default
    private boolean see = false;
    @Column(name = "is_delete")
    @Builder.Default
    private boolean isDelete = false;

}
