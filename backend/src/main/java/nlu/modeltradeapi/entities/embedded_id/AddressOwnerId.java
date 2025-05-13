package nlu.modeltradeapi.entities.embedded_id;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Embeddable
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class AddressOwnerId implements Serializable {
    private String addressId;
    private String userId;
}
