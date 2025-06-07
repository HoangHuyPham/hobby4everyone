package nlu.modeltradeapi.dtos.requestdto.user;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OTPVerificationRequestDTO {
    private String email;
    private String otp;
}