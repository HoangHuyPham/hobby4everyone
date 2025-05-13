package nlu.modeltradeapi.repository;

import nlu.modeltradeapi.entities.ModelImage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ModelImageRepository extends JpaRepository<ModelImage, String> {
}
