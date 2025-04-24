package structure.librarium.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import structure.librarium.dto.CategoriasRecordDto;
import structure.librarium.models.CategoriasEntity;
import structure.librarium.service.CategoriasService;

import java.util.List;
import java.util.Optional;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@RestController
@RequestMapping("/categorias")
public class CategoriasController {

    @Autowired
    private CategoriasService categoriasService;

    @PostMapping
    public ResponseEntity<CategoriasEntity> saveCategorias(@RequestBody @Valid CategoriasRecordDto dto){
        var categorias = categoriasService.save(dto);
        categorias.add(linkTo(methodOn(CategoriasController.class)
                .getCategoriasById(categorias.getId_categorias())).withSelfRel());

        return ResponseEntity.status(HttpStatus.CREATED).body(categorias);
    }

    @GetMapping
    public ResponseEntity<List<CategoriasEntity>> getAllCategorias(){
        List<CategoriasEntity> categoriasList = categoriasService.getAll();
        if(!categoriasList.isEmpty()){
            for(CategoriasEntity categoria : categoriasList){
                Integer id = categoria.getId_categorias();
                categoria.add(linkTo(methodOn(CategoriasController.class)
                        .getCategoriasById(id)).withSelfRel());
            }
        }
        return ResponseEntity.ok(categoriasList);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Object> getCategoriasById(@PathVariable(value = "id") Integer id){
        Optional<CategoriasEntity> categorias = categoriasService.getById(id);
        if(categorias.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Categoria Não Encontrada");
        }
        CategoriasEntity categoria = categorias.get();
        categoria.add(linkTo(methodOn(CategoriasController.class)
                .getCategoriasById(id)).withSelfRel());
        categoria.add(linkTo(methodOn(CategoriasController.class)
                .getAllCategorias()).withRel("Lista de Categorias"));
        return ResponseEntity.ok(categoria);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> updateCategorias(@PathVariable(value = "id") Integer id,
                                                   @RequestBody @Valid CategoriasRecordDto dto){
        Optional<CategoriasEntity> categorias = categoriasService.getById(id);
        if(categorias.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Categoria Não Encontrada");
        }
        var categoria = categoriasService.update(id, dto);
        categoria.add(linkTo(methodOn(CategoriasController.class)
                .getCategoriasById(categoria.getId_categorias())).withSelfRel());
        return ResponseEntity.ok(categoria);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteCategorias(@PathVariable(value = "id") Integer id){
        Optional<CategoriasEntity> categorias = categoriasService.getById(id);
        if(categorias.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Categoria Não Encontrada");
        }
        categoriasService.delete(id);
        return ResponseEntity.status(HttpStatus.OK).body("Categoria Deletada com Sucesso");
    }
}
