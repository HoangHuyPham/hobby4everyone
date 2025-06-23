package vn.edu.hcmuaf.hobby4everyone.services.template;

import vn.edu.hcmuaf.hobby4everyone.dtos.requestdto.model.ModelAddRequestDTO;
import vn.edu.hcmuaf.hobby4everyone.dtos.responsedto.model.ModelResponseDTO;
import vn.edu.hcmuaf.hobby4everyone.dtos.requestdto.model.ModelUpdateRequestDTO;
import vn.edu.hcmuaf.hobby4everyone.dtos.responsedto.model.ModelAddResponseDTO;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface IModelService {
    public ModelAddResponseDTO addModel(ModelAddRequestDTO modelAddRequestDTO, List<MultipartFile> files);
    public List<ModelResponseDTO> getAllModelByUser();
    public ModelResponseDTO updateModel(ModelUpdateRequestDTO modelUpdateRequestDTO, List<MultipartFile> files);
    public ModelResponseDTO getModelById(String id);
    public String getPriceByModelId(String modelId);
}
