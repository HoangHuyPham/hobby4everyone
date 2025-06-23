package vn.edu.hcmuaf.hobby4everyone.dtos.requestdto.user;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OTPVerificationRequestDTO {
    private String email;
    private String otp;
}