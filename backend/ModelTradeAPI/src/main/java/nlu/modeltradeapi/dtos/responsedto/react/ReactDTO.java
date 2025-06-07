package nlu.modeltradeapi.dtos.responsedto.react;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ReactDTO {
    private Long reactId;
    private String userName;
    private String reactName; // Thay reactType bằng reactName
     boolean isPositive; // Thêm isPositive
    private LocalDateTime reactTime;
}
