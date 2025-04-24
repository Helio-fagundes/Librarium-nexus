package structure.librarium.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import structure.librarium.dto.FeedbackRecordDto;
import structure.librarium.models.FeedbackEntity;
import structure.librarium.service.FeedbackService;

import java.util.List;
import java.util.Optional;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@RestController
@RequestMapping("/feedback")
public class FeedbackController {

    @Autowired
    private FeedbackService feedbackService;

    @PostMapping
    public ResponseEntity<FeedbackEntity> saveFeedback(@RequestBody @Valid FeedbackRecordDto dto){
        FeedbackEntity feedback = feedbackService.save(dto);
        feedback.add(linkTo(methodOn(FeedbackController.class)
                .getFeedbackById(feedback.getId_avaliacao())).withSelfRel());
        return ResponseEntity.status(HttpStatus.CREATED).body(feedback);
    }

    @GetMapping
    public ResponseEntity<List<FeedbackEntity>> getAllFeedback(){
        List<FeedbackEntity> feedback = feedbackService.getAll();
        if(!feedback.isEmpty()){
            for(FeedbackEntity feedbackUnidade : feedback){
                Integer id = feedbackUnidade.getId_avaliacao();
                feedbackUnidade.add(linkTo(methodOn(FeedbackController.class)
                        .getFeedbackById(id)).withSelfRel());
            }
        }
        return ResponseEntity.ok(feedback);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getFeedbackById(@PathVariable(value = "id") Integer id){
        Optional<FeedbackEntity> feedback = feedbackService.getById(id);
        if(feedback.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Feedback Não Encontrado");
        }
        FeedbackEntity feedbackUnidade = feedback.get();
        feedbackUnidade.add(linkTo(methodOn(FeedbackController.class)
                .getFeedbackById(id)).withSelfRel());
        feedbackUnidade.add(linkTo(methodOn(FeedbackController.class)
                .getAllFeedback()).withRel("todos os feedbacks"));
        return ResponseEntity.ok(feedbackUnidade);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> updateFeedback(@PathVariable(value = "id") Integer id,
                                                 @RequestBody @Valid FeedbackRecordDto dto){
        Optional<FeedbackEntity> feedbackOptional = feedbackService.getById(id);
        if(feedbackOptional.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Feedback Não Encontrado");
        }
        var feedback = feedbackService.update(id, dto) ;
        feedback.add(linkTo(methodOn(FeedbackController.class)
                .getFeedbackById(feedback.getId_avaliacao())).withSelfRel());
        return ResponseEntity.status(HttpStatus.OK).body(feedback);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteFeedback(@PathVariable(value = "id") Integer id){
        Optional<FeedbackEntity> feedback = feedbackService.getById(id);
        if(feedback.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Feedback Não Encontrado");
        }
        feedbackService.delete(id);
        return ResponseEntity.status(HttpStatus.OK).body("Feedback Deletado com Sucesso");
    }

}
