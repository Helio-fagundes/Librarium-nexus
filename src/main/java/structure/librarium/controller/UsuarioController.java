package structure.librarium.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import structure.librarium.config.BCrypt.SenhaUtils;
import structure.librarium.dto.LoginRecordDto;
import structure.librarium.dto.RegistrarRecordDto;
import structure.librarium.models.UsuarioEntity;
import structure.librarium.service.UsuarioService;

import java.util.List;
import java.util.Optional;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@RestController
@RequiredArgsConstructor
@RequestMapping("/usuario")
@CrossOrigin(origins = {"http://127.0.0.1:5500/", "http://localhost:5500", "http://localhost:3000", "http://127.0.0.1:5500/pages/login.html"})
public class UsuarioController {

    private final UsuarioService usuarioService;

    @PostMapping("/registrar")
    public ResponseEntity<UsuarioEntity> registrarUsuario(@RequestBody @Valid RegistrarRecordDto dto) {
        if(usuarioService.getByEmail(dto.email()).isPresent()){
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
        }
        UsuarioEntity savedUsuario = usuarioService.save(dto);
        savedUsuario.add(linkTo(methodOn(UsuarioController.class)
                .getUsuarioById(savedUsuario.getId_usuario())).withSelfRel());
        return ResponseEntity.status(HttpStatus.CREATED).body(savedUsuario);
    }

    @PostMapping("/login")
    public ResponseEntity<Object> loginUsuario(@RequestBody @Valid LoginRecordDto dto){
        if(usuarioService.getByEmail(dto.email()).isPresent()){
            Optional<UsuarioEntity> usuario = usuarioService.getByEmail(dto.email());
            SenhaUtils senhaUtils = new SenhaUtils();
            if(senhaUtils.verificar_senha(dto.senha(), usuario.get().getSenha())){
                UsuarioEntity usuarioUnidade = usuario.get();
                usuarioUnidade.add(linkTo(methodOn(UsuarioController.class)
                        .getUsuarioById(usuarioUnidade.getId_usuario())).withSelfRel());
                return ResponseEntity.ok(usuario);
            } else{
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("senha incorreta");
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("esse email não existe");
    }


    @GetMapping
    public ResponseEntity<List<UsuarioEntity>> getAllUsuarios(){
        List<UsuarioEntity> usuarios = usuarioService.getAll();
        if(!usuarios.isEmpty()){
            for(UsuarioEntity usuario : usuarios){
                Integer id = usuario.getId_usuario();
                usuario.add(linkTo(methodOn(UsuarioController.class)
                        .getUsuarioById(id)).withSelfRel());
            }
        }
        return ResponseEntity.ok(usuarios);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getUsuarioById(@PathVariable(value = "id") Integer id){
        Optional<UsuarioEntity> usuario = usuarioService.getById(id);
        if(usuario.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuário Não Encontrado");
        }
        UsuarioEntity usuarioUnidade = usuario.get();
        usuarioUnidade.add(linkTo(methodOn(UsuarioController.class)
                .getUsuarioById(id)).withSelfRel());

        usuarioUnidade.add(linkTo(methodOn(UsuarioController.class)
                .getAllUsuarios()).withRel("Lista de Usuários"));
        return ResponseEntity.ok(usuarioUnidade);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> updateUsuario(@PathVariable(value = "id") Integer id,
                                                        @RequestBody @Valid RegistrarRecordDto dto) {
        Optional<UsuarioEntity> usuario = usuarioService.getById(id);
        if(usuario.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuário Não Encontrado");
        }
        UsuarioEntity usuarioUnidade = usuarioService.update(id, dto);
        usuarioUnidade.add(linkTo(methodOn(UsuarioController.class)
                .getUsuarioById(id)).withSelfRel());
        return ResponseEntity.ok(usuarioUnidade);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteUsuario(@PathVariable(value = "id") Integer id){
        Optional<UsuarioEntity> usuario = usuarioService.getById(id);
        if(usuario.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuário Não Encontrado");
        }
        usuarioService.delete(id);
        return ResponseEntity.status(HttpStatus.OK).body("Usuário Deletado com Sucesso");
    }


}
