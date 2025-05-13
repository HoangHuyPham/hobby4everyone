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
@Table(name = "addresses")
@Entity(name = "address")
public class Address implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "address_id")
    String addressId;
    @Column(name = "province")
    String province;
    @Column(name = "city")
    String city;
    @Column(name = "ward")
    String ward;
    @Column(name = "home_address")
    String homeAddress;
    @Column(name = "address_detail")
    String addressDetail;
    @Column(name = "type")
    String type;
    @Column(name = "is_main")
    @Builder.Default
    boolean is_main = false;
}
