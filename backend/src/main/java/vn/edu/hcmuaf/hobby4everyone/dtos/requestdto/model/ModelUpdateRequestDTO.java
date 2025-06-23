package vn.edu.hcmuaf.hobby4everyone.dtos.requestdto.model;

import jakarta.validation.constraints.Min;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ModelUpdateRequestDTO {
    String modelId;
    String modelName;
    String description;
    double price;
    @Min(value = 0,message = "Số lượng không được âm")
    int quantity;
    boolean isDelete;
}
