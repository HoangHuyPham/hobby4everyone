package vn.edu.hcmuaf.hobby4everyone.controller;

import lombok.RequiredArgsConstructor;
import vn.edu.hcmuaf.hobby4everyone.dtos.requestdto.model.ModelAddRequestDTO;
import vn.edu.hcmuaf.hobby4everyone.dtos.responsedto.model.ModelResponseDTO;
import vn.edu.hcmuaf.hobby4everyone.dtos.responsedto.ApiResponse;
import vn.edu.hcmuaf.hobby4everyone.dtos.responsedto.model.ModelAddResponseDTO;
import vn.edu.hcmuaf.hobby4everyone.services.implement.ModelService;
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

    @GetMapping("{modelId}")
    public ApiResponse<ModelResponseDTO> getModelById(@PathVariable String modelId) {
        try{
        ModelResponseDTO model = modelService.getModelById(modelId);
        if (model == null) {
            return ApiResponse.<ModelResponseDTO>builder()
                    .message("Không tìm thấy sản phẩm với modelId: " + modelId)
                    .result(null)
                    .build();
        }
        return ApiResponse.<ModelResponseDTO>builder()
                .message("Lấy thông tin sản phẩm thành công")
                .result(model)
                .build();
    } catch (Exception e) {
        return ApiResponse.<ModelResponseDTO>builder()
                .message("Lỗi khi lấy thông tin sản phẩm: " + e.getMessage())
                .result(null)
                .build();
    }
    }



}
