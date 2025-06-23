package vn.edu.hcmuaf.hobby4everyone.dtos.responsedto.cart;

import java.util.ArrayList;
import java.util.List;

import lombok.Data;
import vn.edu.hcmuaf.hobby4everyone.entities.Image;

@Data
public class CartDTO {
    private String id;
    private List<CartItemDTO> cartItems = new ArrayList<>();

    @Data
    public static class CartItemDTO {
        private String id;
        private boolean isSelected;
        private int quantity;
        private ModelDTO model;
    }

    @Data
    public static class ModelDTO {
        private String modelId;
        private String name;
        private String description;
        private double price;
        private int quantity;
        private List<ModelImageDTO> images;
    }

    @Data
    public static class ModelImageDTO {
        private String MIId;
        private Image image;
    }
}
