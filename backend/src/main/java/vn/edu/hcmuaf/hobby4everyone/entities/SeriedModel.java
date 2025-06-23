package vn.edu.hcmuaf.hobby4everyone.entities;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import vn.edu.hcmuaf.hobby4everyone.entities.embedded_id.SeriedModelId;

import java.io.Serializable;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "seried_models")
@Entity(name = "seried_model")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SeriedModel implements Serializable {
    @EmbeddedId
    private SeriedModelId seriedModelId;

    @ManyToOne
    @MapsId("modelId")
    @JoinColumn(name = "model_id")
    Model model;
    @ManyToOne
    @MapsId("serieId")
    @JoinColumn(name = "serie_id")
    Serie serie;
}
