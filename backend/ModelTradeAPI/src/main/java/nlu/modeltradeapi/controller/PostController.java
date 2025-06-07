package nlu.modeltradeapi.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import nlu.modeltradeapi.dtos.requestdto.post.PostCreateRequestDTO;
import nlu.modeltradeapi.dtos.responsedto.post.PostResponseDTO;
import nlu.modeltradeapi.entities.Model;
import nlu.modeltradeapi.entities.ModelPromotionPost;
import nlu.modeltradeapi.repository.ModelRepository;
import nlu.modeltradeapi.services.implement.PostService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor

public class PostController {
    private final PostService postService;
    private final ModelRepository modelRepository;

    @PostMapping("/createPost")
    public ResponseEntity<ModelPromotionPost> createPost(@Valid @RequestBody PostCreateRequestDTO request){
        ModelPromotionPost post = postService.createPost(request);
        return ResponseEntity.ok(post);
    }

    @GetMapping("/getModels")
    public ResponseEntity<List<Model>> getModels(){
        List<Model> models = modelRepository.findAll();
        return ResponseEntity.ok(models);

    }
    @GetMapping("/getAllPosts")
    public ResponseEntity<List<PostResponseDTO>> getAllPosts() {
        List<PostResponseDTO> posts = postService.getAllPosts();
        return ResponseEntity.ok(posts);
    }

}
