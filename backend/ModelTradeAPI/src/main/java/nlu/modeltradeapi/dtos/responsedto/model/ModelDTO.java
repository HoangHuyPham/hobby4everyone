package nlu.modeltradeapi.dtos.responsedto.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ModelDTO {
    private String modelId;
    private String name;
    private String description;
    private double price;
    private int quantity;
}
