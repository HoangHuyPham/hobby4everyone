package vn.edu.hcmuaf.hobby4everyone.dtos.responsedto;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults (level = AccessLevel.PRIVATE)
public class AuthenticationResponseonseDTO {
    String token;
    boolean authenticated;
}
