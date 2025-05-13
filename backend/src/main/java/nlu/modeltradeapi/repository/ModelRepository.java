package nlu.modeltradeapi.repository;

import nlu.modeltradeapi.entities.Model;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ModelRepository extends JpaRepository<Model, String> {
}
