package structure.librarium.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import structure.librarium.dto.AutorRecordDto;
import structure.librarium.models.AutorEntity;
import structure.librarium.service.AutorService;

import java.util.List;
import java.util.Optional;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@RestController
@RequestMapping("/autor")
public class AutorController {

    @Autowired
    private AutorService autorService;

    @PostMapping
    public ResponseEntity<AutorEntity> saveAutor(@RequestBody @Valid AutorRecordDto dto){
        var autor = autorService.save(dto);
        autor.add(linkTo(methodOn(AutorController.class)
                .getAutorById(autor.getId_autor())).withSelfRel());
        return ResponseEntity.status(HttpStatus.CREATED).body(autor);
    }

    @GetMapping
    public ResponseEntity<List<AutorEntity>> getAllAutor(){
        List<AutorEntity> autorList = autorService.getAll();
        if(!autorList.isEmpty()){
            for(AutorEntity autor : autorList){
                Integer id = autor.getId_autor();
                autor.add(linkTo(methodOn(AutorController.class)
                        .getAutorById(id)).withSelfRel());
            }
        }
        return ResponseEntity.ok(autorList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getAutorById(@PathVariable(value = "id") Integer id){
        Optional<AutorEntity> autor = autorService.getById(id);
        if(autor.isEmpty()){
            ResponseEntity.status(HttpStatus.NOT_FOUND).body("Autor Não Encontrado");

        AutorEntity autorLinks = autor.get();
        autorLinks.add(linkTo(methodOn(AutorController.class)
                .getAutorById(id)).withSelfRel());
        autorLinks.add(linkTo(methodOn(AutorController.class)
                .getAllAutor()).withRel("Lista de Autores"));
        }
        return ResponseEntity.ok(autor);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> updateAutor(@PathVariable(value = "id") Integer id,
                                              @RequestBody @Valid AutorRecordDto dto){
        Optional<AutorEntity> autor = autorService.getById(id);
        if (autor.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Autor Não Encontrado");}

        var autorUpdated = autorService.update(id, dto);
        autorUpdated.add(linkTo(methodOn(AutorController.class)
                .getAutorById(autorUpdated.getId_autor())).withSelfRel());

        return ResponseEntity.ok(autorUpdated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteAutor(@PathVariable(value = "id") Integer id){
        Optional<AutorEntity> autor = autorService.getById(id);
        if(autor.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Autor Não Encontrado");
        }
        autorService.delete(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("autor deletado com sucesso");
    }
}
