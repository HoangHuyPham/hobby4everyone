package vn.edu.hcmuaf.hobby4everyone.dtos.requestdto.cart;

import lombok.Data;

@Data
public class AddCartItemDTO {
    private String modelId;
    private boolean isSelected;
    private int quantity;
}
