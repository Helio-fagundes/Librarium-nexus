package structure.librarium.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import structure.librarium.dto.AutorRecordDto;
import structure.librarium.models.AutorEntity;
import structure.librarium.repository.AutorRepository;

import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class AutorService {

    private final AutorRepository autorRepository;

    public AutorEntity save(AutorRecordDto dto){
        AutorEntity autor = new AutorEntity();
        BeanUtils.copyProperties(dto, autor);
        return autorRepository.save(autor);
    }

    public List<AutorEntity> getAll(){
        return autorRepository.findAll();
    }

    public Optional<AutorEntity> getById(Integer id){
        return autorRepository.findById(id);
    }

    public AutorEntity update(Integer id, AutorRecordDto dto){
        AutorEntity autor = autorRepository.findById(id).get();
        BeanUtils.copyProperties(dto, autor);
        return autorRepository.save(autor);
    }

    public void delete(Integer id){
        autorRepository.deleteById(id);
    }
}
