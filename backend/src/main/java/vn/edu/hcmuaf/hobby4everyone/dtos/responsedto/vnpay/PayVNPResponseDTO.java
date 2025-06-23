package vn.edu.hcmuaf.hobby4everyone.dtos.responsedto.vnpay;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
public class PayVNPResponseDTO {
    String payTmnCode;
    double payAmount;
    String payBankCode;
    String payBankTranNo;
    String payCardType;
    String payDate;
    String payOrderInfo;
    Double payTransactionNo;
    Integer payResponseCode;
    Integer payTransactionStatus;
    String payTxnRef;
    String paySecureHash;
}
