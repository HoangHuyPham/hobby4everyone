package nlu.modeltradeapi.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "series")
@Entity(name = "serie")
public class Serie implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "serie_id")
    private String serieId;
    @Column(name = "name")
    private String name;
    @Column(name = "is_special")
    @Builder.Default
    private boolean isSpecial = false;
    @Column(name = "active")
    @Builder.Default
    private boolean active = false;
}
