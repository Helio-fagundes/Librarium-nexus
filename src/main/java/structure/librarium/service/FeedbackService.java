package structure.librarium.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import structure.librarium.dto.FeedbackRecordDto;
import structure.librarium.models.FeedbackEntity;
import structure.librarium.repository.FeedbackRepository;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FeedbackService {

    private final FeedbackRepository feedbackRepository;

    public FeedbackEntity save(FeedbackRecordDto dto){
        getById(dto.id_livros())
                .orElseThrow(() -> new RuntimeException("Livro não encontrado"));

        FeedbackEntity feedback = new FeedbackEntity();
        BeanUtils.copyProperties(dto, feedback);
        return feedbackRepository.save(feedback);
    }

    public List<FeedbackEntity> getAll(){
        return feedbackRepository.findAll();
    }

    public Optional<FeedbackEntity> getById(Integer id){
        return feedbackRepository.findById(id);
    }

    public FeedbackEntity update(Integer id,FeedbackRecordDto dto){
        FeedbackEntity feedback = feedbackRepository.findById(id).get();
        BeanUtils.copyProperties(dto, feedback);
        feedback.setId_avaliacao(id);
        return feedbackRepository.save(feedback);
    }

    public void delete(Integer id){
        feedbackRepository.deleteById(id);
    }
}
