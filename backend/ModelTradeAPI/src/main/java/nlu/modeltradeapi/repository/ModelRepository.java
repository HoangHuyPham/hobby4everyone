package nlu.modeltradeapi.repository;

import nlu.modeltradeapi.entities.Model;
import nlu.modeltradeapi.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ModelRepository extends JpaRepository<Model, String> {
    Optional<Model>findById(String id);
    List<Model> findByUser(User user);
}
