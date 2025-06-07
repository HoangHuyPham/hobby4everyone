package nlu.modeltradeapi.constant;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum UserRole {
    ADMIN("Người quản trị"), MANAGER("Người quản lý"), CUSTOMER("Khách hàng");
    private final String description;
}
