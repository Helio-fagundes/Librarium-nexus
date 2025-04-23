package structure.librarium.service;

import jakarta.validation.Valid;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import structure.librarium.dto.AutorRecordDto;
import structure.librarium.models.AutorEntity;
import structure.librarium.repository.AutorRepository;

import java.util.List;
import java.util.Optional;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@Service
public class AutorService {

    @Autowired
    private AutorRepository autorRepository;

    public AutorEntity saveAutor(AutorRecordDto dto){
        AutorEntity autor = new AutorEntity();
        BeanUtils.copyProperties(dto, autor);
        return autorRepository.save(autor);
    }

    public List<AutorEntity> getAllAutor(){
        return autorRepository.findAll();
    }

    public Optional<AutorEntity> getAutorById(Integer id){
        return autorRepository.findById(id);
    }

    public AutorEntity updateAutor(Integer id, AutorRecordDto dto){
        AutorEntity autor = autorRepository.findById(id).get();
        BeanUtils.copyProperties(dto, autor);
        autor.setId_autor(id);
        return autorRepository.save(autor);
    }

    public void deleteAutor(Integer id){
        autorRepository.deleteById(id);
    }
}
