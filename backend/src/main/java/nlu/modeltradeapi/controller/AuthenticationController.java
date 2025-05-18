package nlu.modeltradeapi.controller;

import com.nimbusds.jose.JOSEException;
import lombok.*;
import lombok.experimental.FieldDefaults;
import nlu.modeltradeapi.dtos.requestdto.user.IntrospectRequestDTO;
import nlu.modeltradeapi.dtos.responsedto.ApiResponse;
import nlu.modeltradeapi.dtos.requestdto.user.AuthenticationRequestDTO;
import nlu.modeltradeapi.dtos.responsedto.AuthenticationResponseonseDTO;
import nlu.modeltradeapi.dtos.responsedto.IntrospecResponseonseDTO;
import nlu.modeltradeapi.services.implement.AuthenticationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
@FieldDefaults (level = AccessLevel.PRIVATE, makeFinal = true)

public class AuthenticationController {
    AuthenticationService authenticationService;

//    @PostMapping("/log-in")
//    ApiResponse<AuthenticationResponseonseDTO> authenticationResponseonseApiResponse(@RequestBody AuthenticationRequestDTO request){
//        boolean result =authenticationService.authenticate(request);
//        return  ApiResponse.<AuthenticationResponseonseDTO>builder().result(AuthenticationResponseonseDTO.builder().authenticated(result).build()).build();
//
//    }

    @PostMapping("/token")
    public ResponseEntity<AuthenticationResponseonseDTO> authenticate(@RequestBody AuthenticationRequestDTO authenticationRequestDTO) {
        var response = authenticationService.authenticate(authenticationRequestDTO);
        return new ResponseEntity<>(
                response,
                HttpStatus.OK

        );
    }
    @PostMapping("/introspect")
    public ResponseEntity<IntrospecResponseonseDTO> authenticate(@RequestBody IntrospectRequestDTO request) throws ParseException, JOSEException {
        var response = authenticationService.introspect(request);
        return new ResponseEntity<>(
                response,
                HttpStatus.OK

        );
    }



}
