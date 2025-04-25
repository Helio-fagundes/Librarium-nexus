package structure.librarium.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import structure.librarium.dto.PagamentosRecordDto;
import structure.librarium.models.PagamentosEntity;
import structure.librarium.service.PagamentosService;

import java.util.List;
import java.util.Optional;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@RestController
@RequiredArgsConstructor
@RequestMapping("/pagamentos")
public class PagamentosController {

    private final PagamentosService pagamentosService;

    @PostMapping
    public ResponseEntity<PagamentosEntity> savePagamentos(@RequestBody @Valid PagamentosRecordDto dto){
        var pagamentos = pagamentosService.save(dto);
        pagamentos.add(linkTo(methodOn(PagamentosController.class)
                .getPagamentosById(pagamentos.getId_pagamentos())).withSelfRel());

        return  ResponseEntity.status(HttpStatus.CREATED).body(pagamentos);
    }

    @GetMapping
    public ResponseEntity<List<PagamentosEntity>> getAllPagamentos(){
        List<PagamentosEntity> pagamentosList = pagamentosService.getAll();
        if(!pagamentosList.isEmpty()){
            for(PagamentosEntity pagamentos : pagamentosList){
                Integer id = pagamentos.getId_pagamentos();
                pagamentos.add(linkTo(methodOn(PagamentosController.class)
                        .getPagamentosById(id)).withSelfRel());
            }
        }
        return ResponseEntity.ok(pagamentosList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getPagamentosById(@PathVariable(value = "id") Integer id){
        Optional<PagamentosEntity> pagamentos = pagamentosService.getById(id);
        if(pagamentos.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Pagamento Não Encontrado");
        }
        PagamentosEntity pagamentosEntity = pagamentos.get();
        pagamentosEntity.add(linkTo(methodOn(PagamentosController.class)
                .getPagamentosById(id)).withSelfRel());
        pagamentosEntity.add(linkTo(methodOn(PagamentosController.class)
                .getAllPagamentos()).withRel("Lista de Pagamentos"));

        return ResponseEntity.ok(pagamentosEntity);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> updatePagamentos(@PathVariable(value = "id") Integer id,
                                                   @RequestBody @Valid PagamentosRecordDto dto){
        Optional<PagamentosEntity> pagamentos = pagamentosService.getById(id);
        if(pagamentos.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Pagamento Não Encontrado");
        }
        var PagamentosEntity = pagamentosService.update(id, dto);
        PagamentosEntity.add(linkTo(methodOn(PagamentosController.class)
                .getPagamentosById(PagamentosEntity.getId_pagamentos())).withSelfRel());
        return ResponseEntity.status(HttpStatus.OK).body(PagamentosEntity);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deletePagamentos(@PathVariable(value = "id") Integer id){
        Optional<PagamentosEntity> pagamentos = pagamentosService.getById(id);
        if(pagamentos.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Pagamento Não Encontrado");
        }
        pagamentosService.delete(id);
        return ResponseEntity.status(HttpStatus.OK).body("Pagamento Deletado com Sucesso");
    }

}
