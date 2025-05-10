package nlu.modeltradeapi.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import nlu.modeltradeapi.entities.embedded_id.SeriedModelId;

import java.io.Serializable;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "seried_models")
@Entity(name = "seried_model")
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
