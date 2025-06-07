package nlu.modeltradeapi.entities;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.io.Serializable;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "model_exchanges")
@Entity(name = "model_exchange")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ModelExchange implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "modele_id")
    private String modelEId;
    @ManyToOne
    @JoinColumn(name = "exchange_id")
    Exhange exhange;
    @ManyToOne
    @JoinColumn(name = "model_id")
    Model model;
    @Column(name = "quantity")
    int quantity;
    @Column(name = "note")
    String note;
    @Column(name = "money_compensation")
    double moneyCompensation;
}
