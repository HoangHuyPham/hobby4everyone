package nlu.modeltradeapi.services.template;

import nlu.modeltradeapi.dtos.requestdto.post.PostCreateRequestDTO;

public interface IPostService {
public PostCreateRequestDTO createPost(PostCreateRequestDTO post);
}
