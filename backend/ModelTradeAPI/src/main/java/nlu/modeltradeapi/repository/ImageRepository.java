package nlu.modeltradeapi.repository;

import nlu.modeltradeapi.entities.Image;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepository extends JpaRepository<Image, String> {
}
