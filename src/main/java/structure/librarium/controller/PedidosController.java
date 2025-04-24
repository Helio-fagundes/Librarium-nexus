package structure.librarium.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import structure.librarium.dto.PedidosRecordDto;
import structure.librarium.models.PedidosEntity;
import structure.librarium.service.LivrosService;
import structure.librarium.service.PedidosService;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@RestController
@RequestMapping("/pedidos")
public class PedidosController {

    @Autowired
    private PedidosService pedidosService;


    @PostMapping
    public ResponseEntity<PedidosEntity> savePedidos(@RequestBody @Valid PedidosRecordDto dto) {
        PedidosEntity savedPedidos = pedidosService.save(dto);
        savedPedidos.add(linkTo(methodOn(PedidosController.class)
                .getPedidosById(savedPedidos.getId_pedidos())).withSelfRel());

        return  ResponseEntity.status(HttpStatus.CREATED).body(savedPedidos);
    }

    @GetMapping
    public ResponseEntity<List<PedidosEntity>> getAllPedidos() {
        List<PedidosEntity> pedidosList = pedidosService.getAll();
        if (!pedidosList.isEmpty()) {
            for (PedidosEntity pedido : pedidosList) {
                Integer id = pedido.getId_pedidos();
                pedido.add(linkTo(methodOn(PedidosController.class)
                        .getPedidosById(id)).withSelfRel());
            }
        }
        return ResponseEntity.ok(pedidosList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getPedidosById(@PathVariable(value = "id") Integer id) {
        Optional<PedidosEntity> pedidos = pedidosService.getById(id);
        if (pedidos.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Pedido Não Encontrado");
        }
        PedidosEntity pedidosEntity = pedidos.get();
        pedidosEntity.add(linkTo(methodOn(PedidosController.class)
                .getPedidosById(id)).withSelfRel());

        pedidosEntity.add(linkTo(methodOn(PedidosController.class)
                .getAllPedidos()).withRel("pedidos"));

        return ResponseEntity.ok(pedidosEntity);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> updatePedidos(@PathVariable(value = "id") Integer id,
                                                @RequestBody @Valid PedidosRecordDto dto) {
        Optional<PedidosEntity> pedidos = pedidosService.getById(id);
        if (pedidos.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Pedido Não Encontrado");
        }
        PedidosEntity updatedPedidos = pedidosService.update(id, dto);
        updatedPedidos.add(linkTo(methodOn(PedidosController.class)
                .getPedidosById(updatedPedidos.getId_pedidos())).withSelfRel());
        return ResponseEntity.ok(updatedPedidos);
    }

    @DeleteMapping("/{id}")
    public  ResponseEntity<Object> deletePedidosById(@PathVariable(value = "id") Integer id) {
        Optional<PedidosEntity> pedidos = pedidosService.getById(id);
        if (pedidos.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Pedido Não Encontrado");
        }
        pedidosService.deleteById(id);
        return ResponseEntity.status(HttpStatus.OK).body("Pedido Deletado com Sucesso");
    }

}
