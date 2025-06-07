package nlu.modeltradeapi.entities;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.io.Serializable;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "wallets")
@Entity(name = "wallet")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Wallets implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "wallet_id")
    private String walletId;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    @Column(name = "total")
    private double total;
    @Column(name = "currency")
    private String currency;
    @Column(name = "spend")
    private double spend;
}
