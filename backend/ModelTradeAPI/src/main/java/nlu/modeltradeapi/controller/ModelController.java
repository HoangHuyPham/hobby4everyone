package nlu.modeltradeapi.controller;

import lombok.RequiredArgsConstructor;
import nlu.modeltradeapi.dtos.requestdto.model.ModelAddRequestDTO;
import nlu.modeltradeapi.dtos.requestdto.model.ModelResponseDTO;
import nlu.modeltradeapi.dtos.responsedto.ApiResponse;
import nlu.modeltradeapi.dtos.responsedto.model.ModelAddResponseDTO;
import nlu.modeltradeapi.entities.Model;
import nlu.modeltradeapi.services.implement.ModelService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("api/model")
@RequiredArgsConstructor
public class ModelController {
    private final ModelService modelService;

    @PostMapping(path = "addModel", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ApiResponse<ModelAddResponseDTO> addModel(@RequestPart("model") ModelAddRequestDTO modelAddRequestDTO,
                                                     @RequestPart("images") List<MultipartFile> images) {
        if(images.isEmpty()){
            return ApiResponse.<ModelAddResponseDTO>builder()
                    .message("Add model success")
                    .result(null)
                    .build();
        }
        ModelAddResponseDTO responseDTO = modelService.addModel(modelAddRequestDTO, images);
        return ApiResponse.<ModelAddResponseDTO>builder()
                .message("Add model success")
                .result(responseDTO)
                .build();
    }

    @GetMapping("getAllModelByUser")
    public ApiResponse<List<ModelResponseDTO>> getModels() {
        return ApiResponse.<List<ModelResponseDTO>>builder()
                .message("Danh sách model : ")
                .result(modelService.getAllModelByUser())
                .build();
    }
}
