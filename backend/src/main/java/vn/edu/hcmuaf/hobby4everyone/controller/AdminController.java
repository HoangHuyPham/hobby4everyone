package vn.edu.hcmuaf.hobby4everyone.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.hcmuaf.hobby4everyone.dtos.responsedto.ApiResponse;
import vn.edu.hcmuaf.hobby4everyone.dtos.responsedto.model.ModelResponseDTO;
import vn.edu.hcmuaf.hobby4everyone.dtos.responsedto.post.PostResponseDTO;
import vn.edu.hcmuaf.hobby4everyone.entities.Exchange;
import vn.edu.hcmuaf.hobby4everyone.entities.User;
import vn.edu.hcmuaf.hobby4everyone.exceptions.CustomException;
import vn.edu.hcmuaf.hobby4everyone.services.implement.ModelService;
import vn.edu.hcmuaf.hobby4everyone.services.implement.PostService;
import vn.edu.hcmuaf.hobby4everyone.services.template.IExchangeService;
import vn.edu.hcmuaf.hobby4everyone.services.template.IUserService;

import java.util.List;

@RestController
@RequestMapping("api/admin")
@RequiredArgsConstructor
public class AdminController {
    private final IUserService userService;
    private final ModelService modelService;
    private final IExchangeService exchangeService;

    @PutMapping("/deactivateUser/{userId}")
    public ApiResponse<User> deactivateUser(@PathVariable("userId") String userId) throws CustomException {
        System.out.println("deactivateUser:");
        return ApiResponse.<User>builder().message("Update user thành công").result(userService.deactivateUser(userId)).build();
    }

    @GetMapping("getAllModelByUserId/{userId}")
    public ApiResponse<List<ModelResponseDTO>> getAllModelByUserId(@PathVariable("userId") String userId) {
        return ApiResponse.<List<ModelResponseDTO>>builder()
                .message("Danh sách model : ")
                .result(modelService.getAllModelByUserId(userId))
                .build();
    }

    @GetMapping("getAllExchangeByUserId/{userId}")
    public ApiResponse<List<Exchange>> getAllExchangeByUserId(@PathVariable("userId") String userId) {
        List<Exchange> list = exchangeService.getExchangesByUserId(userId);
        if (list == null || list.isEmpty()) {
            return ApiResponse.<List<Exchange>>builder()
                    .message("Empty")
                    .code(1010)
                    .build();
        }
        return ApiResponse.<List<Exchange>>builder()
                .result(list)
                .build();
    }

    @DeleteMapping("deleteModelById/{modelId}")
    public ApiResponse<Boolean> deleteModelById(@PathVariable("modelId") String id) {
        return ApiResponse.<Boolean>builder().message("Xóa sản phẩm thành công").result(modelService.deleteModelById(id)).build();
    }
}
