package nlu.modeltradeapi.entities;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.io.Serializable;
import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "requests")
@Entity(name = "request")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Request implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "request_id")
    private Long requestId;
    @ManyToOne
    @JoinColumn(name = "mpp_id")
    private ModelPromotionPost mpp;
    @ManyToOne
    @JoinColumn(name = "requestor_id")
    private User requestor;
    @Lob
    @Column(name = "description")
    private String description;
    @Column(name = "type")
    private String type;
    @Column(name = "appointment_date")
    @Builder.Default
    private LocalDate appointmentDate = LocalDate.now();
    @Column(name = "status")
    private String status;
}
