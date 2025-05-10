package nlu.modeltradeapi.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "images")
@Entity(name = "image")
public class Image implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "image_id")
    private String imageId;
    @Column(name = "url")
    private String url;
    @Column(name = "upload_date")
    private LocalDateTime uploadDate;
}
