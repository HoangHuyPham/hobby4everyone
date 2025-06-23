package vn.edu.hcmuaf.hobby4everyone.constant;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum PayStatus {
    FAILED("Thanh toán thất bại"),
    PENDING("Trong quá trình xử lí thanh toán "),
    SUCCESS("Thanh toán thành công");
    private final String description;
}
