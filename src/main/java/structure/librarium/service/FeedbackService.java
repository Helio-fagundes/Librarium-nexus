package structure.librarium.service;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import structure.librarium.dto.FeedbackRecordDto;
import structure.librarium.models.FeedbackEntity;
import structure.librarium.repository.FeedbackRepository;

import java.util.List;
import java.util.Optional;

@Service
public class FeedbackService {

    @Autowired
    private FeedbackRepository feedbackRepository;

    public FeedbackEntity saveFeedback(FeedbackRecordDto dto){
        FeedbackEntity feedback = new FeedbackEntity();
        BeanUtils.copyProperties(dto, feedback);
        return feedbackRepository.save(feedback);
    }

    public List<FeedbackEntity> getAllFeedback(){
        return feedbackRepository.findAll();
    }

    public Optional<FeedbackEntity> getFeedbackById(Integer id){
        return feedbackRepository.findById(id);
    }

    public FeedbackEntity updateFeedback(Integer id,FeedbackRecordDto dto){
        FeedbackEntity feedback = feedbackRepository.findById(id).get();
        BeanUtils.copyProperties(dto, feedback);
        feedback.setId_avaliacao(id);
        return feedbackRepository.save(feedback);
    }

    public void deleteFeedback(Integer id){
        feedbackRepository.deleteById(id);
    }
}
