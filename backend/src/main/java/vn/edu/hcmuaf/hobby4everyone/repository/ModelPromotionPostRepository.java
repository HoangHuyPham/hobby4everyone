package vn.edu.hcmuaf.hobby4everyone.repository;

import vn.edu.hcmuaf.hobby4everyone.entities.ModelPromotionPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ModelPromotionPostRepository extends JpaRepository<ModelPromotionPost, String> {
    List<ModelPromotionPost> findByModel_NameContainingIgnoreCase(String keyword);
    @Query("SELECT m.model.modelId FROM model_promotion_post m WHERE m.mppId = :mppId")
    String getModelIdByPromotionPostId(@Param("mppId") String mppId);

}
