package nlu.modeltradeapi.dtos.responsedto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class MessageResponseDTO {
    private String message;
}
