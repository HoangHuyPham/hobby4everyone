package nlu.modeltradeapi.services.service_sp_object;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class JWTInfo {
    String token;
    String userName;
    String issuer;
}
