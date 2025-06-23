package vn.edu.hcmuaf.hobby4everyone.entities;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "wallet_changes")
@Entity(name = "wallet_change")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class WalletChange {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "wc_id")
    Long wcId;
    @ManyToOne
    @JoinColumn(name = "pay_id")
    Pay pay;
    @ManyToOne
    @JoinColumn(name = "wallet_id")
    Wallet wallet;
    @Column(name = "type")
    String type;
}
