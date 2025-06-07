package nlu.modeltradeapi.dtos.responsedto.model;

import jakarta.validation.constraints.Min;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ModelAddResponseDTO {
    String modelName;
    String description;
    double price;
    int quantity;
    List<String> images;
}
