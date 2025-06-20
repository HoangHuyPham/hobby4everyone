package vn.edu.hcmuaf.hobby4everyone.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import vn.edu.hcmuaf.hobby4everyone.dtos.requestdto.post.PostCreateRequestDTO;
import vn.edu.hcmuaf.hobby4everyone.dtos.responsedto.post.PostResponseDTO;
import vn.edu.hcmuaf.hobby4everyone.entities.Model;
import vn.edu.hcmuaf.hobby4everyone.entities.ModelPromotionPost;
import vn.edu.hcmuaf.hobby4everyone.repository.ModelRepository;
import vn.edu.hcmuaf.hobby4everyone.services.implement.PostService;
import vn.edu.hcmuaf.hobby4everyone.services.template.IModelService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor

public class PostController {
    private final PostService postService;
    private final ModelRepository modelRepository;
    private final IModelService modelService;

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
    @GetMapping("/search")
    public ResponseEntity<List<PostResponseDTO>> searchPosts(
            @RequestParam("keyword") String keyword,
            @RequestHeader("Authorization") String authorization) {
        List<PostResponseDTO> posts = postService.searchPosts(keyword);
        return ResponseEntity.ok(posts);
    }

    @GetMapping("/getModelIdFromPost/{postId}")
    public ResponseEntity<List<String>> getModelIdFromPost(@PathVariable String postId) {
        List<String> response = new ArrayList<>();
        String modelId = postService.getModelIdFromPost(postId);
        String payAmount = modelService.getPriceByModelId(modelId);
        response.add(modelId);
        response.add(payAmount);
        return ResponseEntity.ok(response);
    }

}
