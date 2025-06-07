package nlu.modeltradeapi.repository;

import nlu.modeltradeapi.entities.Serie;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SerieRepository extends JpaRepository<Serie, String> {
}
