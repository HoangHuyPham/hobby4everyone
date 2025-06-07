package nlu.modeltradeapi.dtos.requestdto.model;

import jakarta.validation.constraints.Min;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ModelAddRequestDTO {
    String modelName;
    String description;
    double price;
    @Min(value = 0,message = "Số lượng không được âm")
    int quantity;
}
