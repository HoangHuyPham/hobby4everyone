package nlu.modeltradeapi.controller;

import nlu.modeltradeapi.dtos.responsedto.MessageResponseDTO;
import nlu.modeltradeapi.services.implement.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("api/models")
public class ProductController {
    @Autowired
    ImageService imageService;

    @PostMapping("/image/{modelId}")
    public ResponseEntity<MessageResponseDTO> uploadImage(@PathVariable final String modelId, @RequestPart final MultipartFile file) {
        this.imageService.uploadImage(modelId, file);
        MessageResponseDTO message = MessageResponseDTO.builder().message("Image successfully").build();
        return new ResponseEntity<>(
                message,
                HttpStatus.OK
        );
    }
}
