package vn.edu.hcmuaf.hobby4everyone.entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;

import lombok.*;
import lombok.experimental.FieldDefaults;
import vn.edu.hcmuaf.hobby4everyone.constant.UserRole;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "users")
@Entity(name = "user")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class User implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "user_id")
    private String userId;

    @Column(name = "user_name")
    @NotBlank(message = "Username is required")
    @Size(min = 3, max = 50, message = "Username must be between 3 and 50 characters")
    private String userName;

    @Column(name = "email")
    @NotBlank(message = "Email is required")
    @Email(message = "Email must be valid")
    private String email;

    @Column(name = "password")
    @NotBlank(message = "Password is required")
    @Size(min = 6, message = "Password must be at least 6 characters")
    private String password;

    @Column(name = "name")
    @NotBlank(message = "Name is required")
    @Size(min = 2, max = 100, message = "Name must be between 2 and 100 characters")
    private String name;

    @Column(name = "phone_number")
    @NotBlank(message = "Phone number is required")
    @Pattern(regexp = "^0\\d{9,10}$", message = "Phone number must start with 0 and be 10-11 digits")
    private String phoneNumber;

    @Column(name = "birth_date")
    private LocalDate dateOfBirth;
    @Column(name = "created_date")
    private LocalDateTime createdDate;
    @Column(name = "role")
    @Builder.Default
    private UserRole role = UserRole.CUSTOMER;
    @Column(name = "active")
    @Builder.Default
    private boolean active = false;
    @Column(name = "is_delete")
    @Builder.Default
    private boolean isDelete = false;
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    List<Model> models;
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    List<AddressOwner> addressOwners;
}
