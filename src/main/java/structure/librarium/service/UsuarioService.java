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

    public UsuarioEntity save(UsuarioRecordDto dto){
        UsuarioEntity usuario = new UsuarioEntity();
        BeanUtils.copyProperties(dto, usuario, "version");
        return usuarioRepository.save(usuario);
    }

    public List<UsuarioEntity> getAll(){
        return usuarioRepository.findAll();
    }

    public Optional<UsuarioEntity> getById(Integer id){
        return usuarioRepository.findById(id);
    }

    public UsuarioEntity update(Integer id, UsuarioRecordDto dto){
        UsuarioEntity usuario = usuarioRepository.findById(id).get();
        BeanUtils.copyProperties(dto, usuario);
        return usuarioRepository.save(usuario);
    }

    public void delete(Integer id){
        usuarioRepository.deleteById(id);
    }
}
