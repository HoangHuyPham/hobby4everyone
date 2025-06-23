package vn.edu.hcmuaf.hobby4everyone.entities.embedded_id;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class SeriedModelId {
    private String modelId;
    private String serieId;
}
