package nlu.modeltradeapi.repository;

import nlu.modeltradeapi.entities.Avatar;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AvatarRepository extends JpaRepository<Avatar, String> {
}
