package vn.edu.hcmuaf.hobby4everyone.services.template;

import vn.edu.hcmuaf.hobby4everyone.dtos.requestdto.post.PostCreateRequestDTO;
import vn.edu.hcmuaf.hobby4everyone.dtos.responsedto.ApiResponse;
import vn.edu.hcmuaf.hobby4everyone.dtos.responsedto.post.PostResponseDTO;

import java.util.List;

public interface IPostService {
    public PostCreateRequestDTO createPost(PostCreateRequestDTO post);
    List<PostResponseDTO> searchPosts(String keyword);
}
