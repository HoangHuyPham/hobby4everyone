//package nlu.modeltradeapi.entities;
//
//import jakarta.persistence.*;
//import lombok.*;
//
//import java.time.LocalDateTime;
//
//@Data
//@Builder
//@AllArgsConstructor
//@NoArgsConstructor
//@Table(name = "active_otp_user")
//@Entity
//public class ActiveOTPUser {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "id")
//    private String id;
//
//    @Column(name = "otp", nullable = false)
//    private String otp;
//
//    @Column(name = "user_id", nullable = false)
//    private String userId;
//
//    @Column(name = "expiration_time", nullable = false)
//    private LocalDateTime expirationTime;
//
//
//}
package nlu.modeltradeapi.entities;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "active_otp_users")
@Entity(name = "active_otp_user")
public class ActiveOTPUser implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "otp_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "otp", nullable = false)
    private String otp;

    @Column(name = "expiration_time", nullable = false)
    private LocalDateTime expirationTime;


}