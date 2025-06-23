package vn.edu.hcmuaf.hobby4everyone.dtos.responsedto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class MessageResponseDTO {
    private String message;

}
