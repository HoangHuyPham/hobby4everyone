package nlu.modeltradeapi.services.implement;

import lombok.RequiredArgsConstructor;
import nlu.modeltradeapi.dtos.requestdto.post.PostCreateRequestDTO;
import nlu.modeltradeapi.dtos.responsedto.comment.CommentDTO;
import nlu.modeltradeapi.dtos.responsedto.image.ImageDTO;
import nlu.modeltradeapi.dtos.responsedto.model.ModelDTO;
import nlu.modeltradeapi.dtos.responsedto.post.PostResponseDTO;
import nlu.modeltradeapi.dtos.responsedto.react.ReactDTO;
import nlu.modeltradeapi.entities.Model;
import nlu.modeltradeapi.entities.ModelPromotionPost;
import nlu.modeltradeapi.entities.User;
import nlu.modeltradeapi.repository.ModelPromotionPostRepository;
import nlu.modeltradeapi.repository.ModelRepository;
import nlu.modeltradeapi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PostService {

    @Autowired
    UserRepository userRepository;
    @Autowired
    private final ModelPromotionPostRepository postRepository;
    @Autowired
    private final ModelRepository modelRepository;


    public ModelPromotionPost createPost(PostCreateRequestDTO request) {

        //tìm model theo modelid
        Model model = modelRepository.findById(request.getModelID()).
                orElseThrow(() -> new RuntimeException("Model not found"));

        //Tao modelPromotionPost
        ModelPromotionPost post = ModelPromotionPost.builder()
                .model(model)
                .promotionDescription(request.getDescription())
                .totalShare(0)
                .isDelete(false)
                .build();

        return postRepository.save(post);


    }
    public List<PostResponseDTO> getAllPosts() {
        List<ModelPromotionPost> posts = postRepository.findAll();

        return posts.stream()
                .filter(post -> !post.isDelete())
                .map(post -> {
                    // Kiểm tra model
                    Model model = post.getModel();
                    if (model == null) {
                        return null; // Bỏ qua post không có model
                    }

                    // Lấy thông tin user
                    User user = model.getUser();
                    String userName = (user != null) ? user.getName() : "Unknown";

                    // Lấy thông tin model
                    ModelDTO modelDTO = ModelDTO.builder()
                            .modelId(model.getModelId())
                            .name(model.getName() != null ? model.getName() : "N/A")
                            .description(model.getDescription() != null ? model.getDescription() : "N/A")
                            .price(model.getPrice())
                            .quantity(model.getQuantity())
                            .build();

                    // Lấy danh sách ảnh
                    List<ImageDTO> images = (model.getImages() != null) ? model.getImages().stream()
                            .filter(imageEntity -> imageEntity != null && imageEntity.getImage() != null)
                            .map(imageEntity -> ImageDTO.builder()
                                    .imageId(imageEntity.getImage().getImageId())
                                    .url(imageEntity.getImage().getUrl() != null ? imageEntity.getImage().getUrl() : "N/A")
                                    .build())
                            .collect(Collectors.toList()) : Collections.emptyList();

                    // Lấy danh sách comment
                    List<CommentDTO> comments = (post.getModelPromotionPostComments() != null) ? post.getModelPromotionPostComments().stream()
                            .filter(comment -> comment != null && comment.getUser() != null)
                            .map(comment -> CommentDTO.builder()
                                    .commentId(comment.getMppcId())
                                    .userName(comment.getUser().getName() != null ? comment.getUser().getName() : "Unknown")
                                    .context(comment.getContext() != null ? comment.getContext() : "N/A")
                                    .createdTime(comment.getCreatedTime())
                                    .build())
                            .collect(Collectors.toList()) : Collections.emptyList();

                    // Lấy danh sách react
                    List<ReactDTO> reacts = (post.getModelPromotionPostReacts() != null) ? post.getModelPromotionPostReacts().stream()
                            .filter(react -> react != null && react.getUser() != null && react.getReact() != null)
                            .map(react -> ReactDTO.builder()
                                    .reactId(react.getMpprId())
                                    .userName(react.getUser().getName() != null ? react.getUser().getName() : "Unknown")
                                    .reactName(react.getReact().getName() != null ? react.getReact().getName() : "N/A") // Thay reactType bằng name
                                    .isPositive(react.getReact().isPositive()) // Thêm isPositive
                                    .reactTime(react.getReactTime())
                                    .build())
                            .collect(Collectors.toList()) : Collections.emptyList();

                    return PostResponseDTO.builder()
                            .postId(post.getMppId())
                            .userName(userName)
                            .postTime(post.getPostTime())
                            .promotionDescription(post.getPromotionDescription() != null ? post.getPromotionDescription() : "N/A")
                            .model(modelDTO)
                            .images(images)
                            .comments(comments)
                            .reacts(reacts)
                            .build();
                })
                .filter(postDTO -> postDTO != null)
                .collect(Collectors.toList());
    }


}
