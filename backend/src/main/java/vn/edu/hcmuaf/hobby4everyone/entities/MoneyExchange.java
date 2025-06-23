package vn.edu.hcmuaf.hobby4everyone.entities;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import vn.edu.hcmuaf.hobby4everyone.constant.ExchangeStatus;

import java.io.Serializable;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "money_exchanges")
@Entity(name = "money_exchange")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class MoneyExchange implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "moneye_id")
    private String moneyEId;
    @ManyToOne
    @JoinColumn(name = "exchange_id")
    Exchange exchange;
    @ManyToOne
    @JoinColumn(name = "buyer_id")
    User buyer;
    @Column(name = "money")
    double money;
    @Column(name = "status")
    @Builder.Default
    private ExchangeStatus status = ExchangeStatus.PENDING;
}
