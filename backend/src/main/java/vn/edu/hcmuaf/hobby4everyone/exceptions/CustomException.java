package vn.edu.hcmuaf.hobby4everyone.exceptions;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.http.HttpStatus;

@Getter
@Setter
public class CustomException extends Exception {
    protected int errorCode = HttpStatus.BAD_REQUEST.value();
    public CustomException(String message) {
        super(message);
    }

    public CustomException(String message, int errorCode) {
        super(message);
        this.errorCode = errorCode;
    }
}
