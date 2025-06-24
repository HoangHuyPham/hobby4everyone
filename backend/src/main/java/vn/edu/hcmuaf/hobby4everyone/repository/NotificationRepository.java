package vn.edu.hcmuaf.hobby4everyone.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.edu.hcmuaf.hobby4everyone.entities.Notification;

public interface NotificationRepository extends JpaRepository<Notification, String> {
    List<Notification> findAllByTarget_UserIdOrderByCreatedAtDesc(String userId);
}
