package vn.edu.hcmuaf.hobby4everyone.dtos.requestdto.post;

import lombok.*;
import lombok.experimental.FieldDefaults;
import java.time.LocalDateTime;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PostCreateRequestDTO {
    String description;
    String modelID;
}
