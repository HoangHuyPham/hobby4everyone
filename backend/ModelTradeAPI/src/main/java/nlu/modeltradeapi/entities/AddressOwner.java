package nlu.modeltradeapi.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import nlu.modeltradeapi.entities.embedded_id.AddressOwnerId;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "address_owners")
@Entity(name = "address_owner")
public class AddressOwner {

    @EmbeddedId
    private AddressOwnerId id;

    @ManyToOne
    @MapsId("addressId")
    @JoinColumn(name = "address_id")
    private Address address;
    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    private User user;
}
