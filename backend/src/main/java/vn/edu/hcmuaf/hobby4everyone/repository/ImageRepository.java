package vn.edu.hcmuaf.hobby4everyone.repository;

import vn.edu.hcmuaf.hobby4everyone.entities.Image;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepository extends JpaRepository<Image, String> {
}
