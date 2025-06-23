package vn.edu.hcmuaf.hobby4everyone.dtos.requestdto.model;

import jakarta.validation.constraints.Min;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.experimental.FieldDefaults;

@Getter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ModelAddRequestDTO {
    String modelName;
    String description;
    double price;
    @Min(value = 0,message = "Số lượng không được âm")
    int quantity;
}
