package nlu.modeltradeapi.entities;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.io.Serializable;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "models")
@Entity(name = "model")
@FieldDefaults(level = AccessLevel.PRIVATE)
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
    @Lob
    @Column(name = "description", columnDefinition = "TEXT")
    private String description;
    @Column(name = "price")
    private double price;
    @Column(name = "quantity")
    private int quantity;
    @Column(name = "see")
    @Builder.Default
    private boolean see = false;
    @Column(name = "is_delete")
    @Builder.Default
    private boolean isDelete = false;

}
