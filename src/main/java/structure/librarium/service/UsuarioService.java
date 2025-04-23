package structure.librarium.service;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import structure.librarium.dto.UsuarioRecordDto;
import structure.librarium.models.UsuarioEntity;
import structure.librarium.repository.UsuarioRepository;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public UsuarioEntity saveUsuario(UsuarioRecordDto dto){
        UsuarioEntity usuario = new UsuarioEntity();
        BeanUtils.copyProperties(dto, usuario);
        return usuarioRepository.save(usuario);
    }

    public List<UsuarioEntity> getAllUsuario(){
        return usuarioRepository.findAll();
    }

    public Optional<UsuarioEntity> getUsuarioById(Integer id){
        return usuarioRepository.findById(id);
    }

    public UsuarioEntity updateUsuario(Integer id, UsuarioRecordDto dto){
        UsuarioEntity usuario = usuarioRepository.findById(id).get();
        BeanUtils.copyProperties(dto, usuario);
        usuario.setId_usuario(id);
        return usuarioRepository.save(usuario);
    }

    public void deleteUsuario(Integer id){
        usuarioRepository.deleteById(id);
    }
}
