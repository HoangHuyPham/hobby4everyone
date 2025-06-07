package nlu.modeltradeapi.services.implement;

import nlu.modeltradeapi.dtos.requestdto.model.ModelAddRequestDTO;
import nlu.modeltradeapi.dtos.requestdto.model.ModelResponseDTO;
import nlu.modeltradeapi.dtos.requestdto.model.ModelUpdateRequestDTO;
import nlu.modeltradeapi.dtos.responsedto.model.ModelAddResponseDTO;
import nlu.modeltradeapi.entities.Model;
import nlu.modeltradeapi.repository.ImageRepository;
import nlu.modeltradeapi.repository.ModelImageRepository;
import nlu.modeltradeapi.repository.ModelRepository;
import nlu.modeltradeapi.repository.UserRepository;
import nlu.modeltradeapi.services.template.IModelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Service
public class ModelService implements IModelService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ModelRepository modelRepository;

    @Autowired
    private ImageService imageService;

    @Override
    public ModelAddResponseDTO addModel(ModelAddRequestDTO modelAddRequestDTO, List<MultipartFile> files) {
        if(modelAddRequestDTO.getModelName() == null || modelAddRequestDTO.getModelName().isEmpty()) return null;
        if (files.isEmpty()) return null;

        UserDetails userTrue = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        var userValue = userRepository.findByUserName(userTrue.getUsername()).orElseThrow(() -> new RuntimeException("User không tồn tại"));

        Model model = Model.builder()
                .user(userValue)
                .name(modelAddRequestDTO.getModelName())
                .description(modelAddRequestDTO.getDescription())
                .price(modelAddRequestDTO.getPrice())
                .quantity(modelAddRequestDTO.getQuantity())
                .build();
        Model savedModel = modelRepository.save(model);

        List<String> images = new ArrayList<>();
        for (int i = 0; i < files.size(); i++) {
            MultipartFile file = files.get(i);
            images.add(imageService.uploadImageModel(savedModel.getModelId(),file,i));
        }

        return ModelAddResponseDTO.builder()
                .modelName(savedModel.getName())
                .description(savedModel.getDescription())
                .price(savedModel.getPrice())
                .quantity(savedModel.getQuantity())
                .images(images)
                .build();
    }

    @Override
    public List<ModelResponseDTO> getAllModelByUser() {
        UserDetails userTrue = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        var userValue = userRepository.findByUserName(userTrue.getUsername()).orElseThrow(() -> new RuntimeException("User không tồn tại"));
        List<Model> lists = modelRepository.findByUser(userValue);
        List<ModelResponseDTO> result = new ArrayList<>();
        for(Model m : lists){
            result.add(
                    ModelResponseDTO.builder()
                    .modelId(m.getModelId())
                    .name(m.getName())
                    .description(m.getDescription())
                    .price(m.getPrice())
                    .quantity(m.getQuantity())
                    .see(m.isSee())
                    .isDelete(m.isDelete())
                    .images(m.getImageLinks())
                    .build()
            );
        }
        return result;
    }

    @Override
    public ModelResponseDTO updateModel(ModelUpdateRequestDTO modelUpdateRequestDTO, List<MultipartFile> files) {
        var model = modelRepository.findById(modelUpdateRequestDTO.getModelId()).orElseThrow(()->new RuntimeException("Không thấy model"));
        model.setName(modelUpdateRequestDTO.getModelName());
        model.setDescription(modelUpdateRequestDTO.getDescription());
        model.setPrice(modelUpdateRequestDTO.getPrice());
        model.setQuantity(modelUpdateRequestDTO.getQuantity());
        model.setDelete(modelUpdateRequestDTO.isDelete());
        Model modelSaved = modelRepository.save(model);
        int count = modelSaved.getImageLinks().size();
        List<String> images = new ArrayList<>();
        for (int i = 0; i < files.size(); i++) {
            MultipartFile file = files.get(i);
            images.add(imageService.uploadImageModel(modelSaved.getModelId(),file,i));
        }

        return ModelResponseDTO.builder()
                .modelId(modelSaved.getModelId())
                .name(modelSaved.getName())
                .description(modelSaved.getDescription())
                .price(modelSaved.getPrice())
                .quantity(model.getQuantity())
                .see(modelSaved.isSee())
                .isDelete(modelSaved.isDelete())
                .images(images)
                .build();
    }
}
