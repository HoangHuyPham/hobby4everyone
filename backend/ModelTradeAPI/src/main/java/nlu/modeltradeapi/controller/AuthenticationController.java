package nlu.modeltradeapi.controller;

import jakarta.validation.Valid;
import lombok.*;
import lombok.experimental.FieldDefaults;
import nlu.modeltradeapi.dtos.requestdto.user.UserLoginRequestDTO;
import nlu.modeltradeapi.dtos.requestdto.user.UserRegisterRequestDTO;
import nlu.modeltradeapi.dtos.responsedto.ApiResponse;
import nlu.modeltradeapi.dtos.responsedto.MessageResponseDTO;
import nlu.modeltradeapi.services.implement.AuthenticationService;
import nlu.modeltradeapi.services.template.IUserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
@FieldDefaults (level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthenticationController {
    private final AuthenticationService authenticationService;
    private final IUserService userService;

    @PostMapping("register")
    public ResponseEntity<MessageResponseDTO> register(@RequestBody @Valid UserRegisterRequestDTO urrd) {
        MessageResponseDTO message = MessageResponseDTO.builder().message("Không thành công").build();

        message.setMessage(urrd.getEmail() + message.getMessage());
        if(userService.registerUser(urrd)!= null) message.setMessage("Đăng kí thành công. Vui lòng kiểm tra email");

        return new ResponseEntity<>(
                message,
                HttpStatus.OK
        );
    }

    @PostMapping("login")
    public ApiResponse<String> login(@RequestBody UserLoginRequestDTO userLoginRequestDTO) {
        String token = authenticationService.authenticate(userLoginRequestDTO);
        if (token.isEmpty()) {
            return ApiResponse.<String>builder()
                    .message("Please verify OTP first")
                    .build();
        }
        return ApiResponse.<String>builder()
                .message("Login success. Token authenticated")
                .result(token)
                .build();
    }

}
