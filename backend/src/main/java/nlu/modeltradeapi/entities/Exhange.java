package nlu.modeltradeapi.entities;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "exchanges")
@Entity(name = "exchange")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Exhange implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "exchange_id")
    private String exchangeId;
    @Column(name = "type")
    private String type;
    @Column(name = "transaction_date")
    @Builder.Default
    LocalDateTime transactionDate = LocalDateTime.now();
    @Column(name = "status")
    private String status;
}
