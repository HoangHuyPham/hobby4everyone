package vn.edu.hcmuaf.hobby4everyone.dtos.responsedto.model;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
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
    private SellerDTO seller;

    @Data
    public static class SellerDTO {
        
        private String userId;
        private String name;
        private String phoneNumber;
        private LocalDateTime createDate;

//        private Double rating; // Có thể lấy từ bảng đánh giá nếu có
//        private Long followCount; // Có thể lấy từ bảng theo dõi nếu có
    }
}
