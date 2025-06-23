package vn.edu.hcmuaf.hobby4everyone.entities;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "pays")
@Entity(name = "pay")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Pay {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "pay_id")
    String payId;
    @ManyToOne(optional = true)
    @JoinColumn(name = "exchange_id")
    Exchange exchange;
    @Column(name = "pay_TmnCode")
    String payTmnCode;
    @Column(name = "pay_Amount")
    double payAmount;
    @Column(name = "pay_BankCode")
    String payBankCode;
    @Column(name = "pay_BankTranNo")
    String payBankTranNo;
    @Column(name = "pay_CardType")
    String payCardType;
    @Column(name = "pay_Date")
    LocalDateTime payDate;
    @Column(name = "pay_OrderInfo")
    String payOrderInfo;
    @Column(name = "pay_TransactionNo")
    Double payTransactionNo;
    @Column(name = "pay_ResponseCode")
    Integer payResponseCode;
    @Column(name = "pay_TransactionStatus")
    Integer payTransactionStatus;
    @Column(name = "pay_TxnRef")
    String payTxnRef;
    @Column(name = "pay_SecureHash")
    String paySecureHash;

}
