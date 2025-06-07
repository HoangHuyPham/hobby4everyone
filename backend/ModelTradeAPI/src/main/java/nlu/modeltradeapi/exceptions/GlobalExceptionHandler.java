package nlu.modeltradeapi.exceptions;

import nlu.modeltradeapi.dtos.responsedto.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(value = RuntimeException.class)
    ResponseEntity<ApiResponse<String>> handleRuntimeException(RuntimeException e) {
        ApiResponse<String> response = ApiResponse.<String>builder().message(e.getMessage()).code(1001).build();
        return ResponseEntity.badRequest().body(response);
    }
    @ExceptionHandler(value = MethodArgumentNotValidException.class)
    ResponseEntity<ApiResponse<String>> handlingValidation(MethodArgumentNotValidException e) {
        ApiResponse<String> response = ApiResponse.<String>builder().message(e.getFieldError().getDefaultMessage()).code(1001).build();
        return ResponseEntity.badRequest().body(response);
    }
    @ExceptionHandler(CustomException.class)
    ResponseEntity<String> handleCustomException(CustomException e) {
        return ResponseEntity.badRequest().body(e.getMessage());
    }
}
