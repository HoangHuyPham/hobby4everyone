package vn.edu.hcmuaf.hobby4everyone.constant;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum ExchangeStatus {
    PENDING("Trong quá trình giao dịch"),
    FAIL_TRADE("Giao dịch thất bại"),
    SUCCESS_TRADE("Giao dịch thành công"),
    READY("Sẵn sàng");
    private final String description;
}
