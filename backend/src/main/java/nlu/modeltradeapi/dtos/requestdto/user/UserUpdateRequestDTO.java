package nlu.modeltradeapi.dtos.requestdto.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserUpdateRequestDTO {
    private String email;
    private String password;
    private String name;
    private String phoneNumber;
    private LocalDate dateOfBirth;
    private boolean isDeleted;
}
