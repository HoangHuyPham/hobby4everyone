package nlu.modeltradeapi.dtos.requestdto.user;

import jakarta.validation.constraints.Size;
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
    @Size(min = 6, max = 20, message = "Password must be at least 6 characters")
    private String password;
    private String name;
    private String phoneNumber;
    private LocalDate dateOfBirth;
    private boolean isDeleted;
}
