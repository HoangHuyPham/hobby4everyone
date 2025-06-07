package nlu.modeltradeapi.exceptions;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

@Getter
public enum ErrorCode {
    USER_NOT_EXISTED(1003, "User is not existed!", HttpStatus.NOT_FOUND),
    FILE_NOT_EXISTED(1004, "File is not existed!", HttpStatus.NOT_FOUND);
    private final int code;
    private final String message;
    private final HttpStatusCode statusCode;
    ErrorCode(int code, String message, HttpStatusCode statusCode) {
        this.code = code;
        this.message = message;
        this.statusCode = statusCode;
    }
}
