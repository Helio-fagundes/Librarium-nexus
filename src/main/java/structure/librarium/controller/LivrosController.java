package structure.librarium.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import structure.librarium.dto.LivrosRecordDto;
import structure.librarium.models.LivrosEntity;
import structure.librarium.service.LivrosService;

import java.util.List;
import java.util.Optional;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@RestController
@RequiredArgsConstructor
@RequestMapping("/livros")
public class LivrosController {

    private final LivrosService livrosService;

    @PostMapping
    public ResponseEntity<LivrosEntity> saveLivros (@RequestBody @Valid LivrosRecordDto dto){
        LivrosEntity livrosEntity = livrosService.save(dto);
        livrosEntity.add(linkTo(methodOn(LivrosController.class)
                .getLivrosById(livrosEntity.getId_livros())).withSelfRel());

        return ResponseEntity.ok(livrosEntity);
    }

    @GetMapping
    public ResponseEntity<List<LivrosEntity>> getAllLivros (){
        List<LivrosEntity> livrosEntity = livrosService.getAll();
        if(!livrosEntity.isEmpty()){
            for (LivrosEntity livros : livrosEntity){
                Integer id = livros.getId_livros();
                livros.add(linkTo(methodOn(LivrosController.class)
                        .getLivrosById(id)).withSelfRel());
            }
        }
        return ResponseEntity.ok(livrosEntity);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getLivrosById(@PathVariable(value = "id") Integer id){
        Optional<LivrosEntity> livros = livrosService.getById(id);
        if(livros.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Livro Não Encontrado");
        }
        LivrosEntity livrosEntity = livros.get();
        livrosEntity.add(linkTo(methodOn(LivrosController.class)
                .getLivrosById(id)).withSelfRel());
        livrosEntity.add(linkTo(methodOn(LivrosController.class).getAllLivros()).withRel("Lista de Livros"));

        return ResponseEntity.ok(livrosEntity);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> updateLivros(@PathVariable(value = "id") Integer id,
                                               @RequestBody @Valid LivrosRecordDto dto){
        Optional<LivrosEntity> livrosId = livrosService.getById(id);
        if(livrosId.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Livro Não Encontrado");
        }
        var livros = livrosService.update(id, dto);
        livros.add(linkTo(methodOn(LivrosController.class)
                .getLivrosById(livros.getId_livros())).withSelfRel());

        return ResponseEntity.status(HttpStatus.OK).body(livros);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteLivros(@PathVariable(value = "id") Integer id){
      Optional<LivrosEntity> livros = livrosService.getById(id);
        if(livros.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Livro Não Encontrado");
        }
        livrosService.delete(id);
        return ResponseEntity.status(HttpStatus.OK).body("Livro Deletado com Sucesso");
    }

}
