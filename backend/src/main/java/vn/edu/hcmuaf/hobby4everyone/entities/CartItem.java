package vn.edu.hcmuaf.hobby4everyone.entities;

import java.util.UUID;

import org.hibernate.annotations.UuidGenerator;

import jakarta.persistence.Entity;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.EqualsAndHashCode.Include;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@Builder
@AllArgsConstructor
@Getter
@Setter
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Table(name="cart_items")
public class CartItem {
    @Id
    @GeneratedValue
    @UuidGenerator
    @Include
    private String id;
    private boolean isSelected;
    private int quantity;

    @ManyToOne
    @JoinColumn(name="cart_id", foreignKey = @ForeignKey(name="cart_id"))
    private Cart cart;

    @ManyToOne
    @JoinColumn(name = "model_id", foreignKey = @ForeignKey(name = "model_id"))
    private Model model;
}