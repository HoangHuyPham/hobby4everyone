package vn.edu.hcmuaf.hobby4everyone.dtos.responsedto.post;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import vn.edu.hcmuaf.hobby4everyone.dtos.responsedto.comment.CommentDTO;
import vn.edu.hcmuaf.hobby4everyone.dtos.responsedto.image.ImageDTO;
import vn.edu.hcmuaf.hobby4everyone.dtos.responsedto.model.ModelDTO;
import vn.edu.hcmuaf.hobby4everyone.dtos.responsedto.react.ReactDTO;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PostResponseDTO {
    private String postId;
    private String userName;
    private LocalDateTime postTime;
    private String promotionDescription;
    private ModelDTO model;
    private List<ImageDTO> images;
    private List<CommentDTO> comments;
    private List<ReactDTO> reacts;
}

