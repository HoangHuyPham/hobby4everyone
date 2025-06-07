package nlu.modeltradeapi.dtos.requestdto.model;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ModelResponseDTO {
    String modelId;
    String name;
    String description;
    double price;
    int quantity;
    boolean see;
    boolean isDelete;
    List<String> images;
}
