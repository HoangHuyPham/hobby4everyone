package nlu.modeltradeapi.dtos.responsedto.comment;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CommentDTO {
    private String commentId;
    private String userName;
    private String context;
    private LocalDateTime createdTime;
}
