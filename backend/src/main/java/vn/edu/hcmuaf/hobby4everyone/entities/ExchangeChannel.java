package vn.edu.hcmuaf.hobby4everyone.entities;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "exchange_channels")
@Entity(name = "exchange_channel")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ExchangeChannel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "exchange_channel_id")
    Long id;
    @ManyToOne
    @JoinColumn(name = "exchange_id")
    Exchange exchange;
    @ManyToOne
    @JoinColumn(name = "user1")
    User user1;
    @ManyToOne
    @JoinColumn(name = "user2")
    User user2;
    @Column(name = "status1")
    String status1;
    @Column(name = "status2")
    String status2;
    @Column(name = "compen1")
    double compen1;
    @Column(name = "compen2")
    double compen2;
    @Column(name = "active")
    boolean active;
}
