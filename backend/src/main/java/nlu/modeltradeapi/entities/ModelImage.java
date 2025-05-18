package nlu.modeltradeapi.entities;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.io.Serializable;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "model_images")
@Entity(name = "model_image")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ModelImage implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "mi_id")
    private String MIId;
    @ManyToOne
    @JoinColumn(name = "model_id")
    private Model model;
    @ManyToOne
    @JoinColumn(name = "image_id")
    private Image image;
    @Column(name = "main")
    private boolean main;
    @Column(name = "order_index")
    private int orderIndex;
}
