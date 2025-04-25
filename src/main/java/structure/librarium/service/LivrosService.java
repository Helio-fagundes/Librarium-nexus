package structure.librarium.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import structure.librarium.dto.LivrosRecordDto;
import structure.librarium.models.LivrosEntity;
import structure.librarium.repository.LivrosRepository;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LivrosService {

    private final LivrosRepository livrosRepository;

    public LivrosEntity save(LivrosRecordDto dto){
        LivrosEntity livros = new LivrosEntity();
        BeanUtils.copyProperties(dto, livros);
        return livrosRepository.save(livros);
    }

    public List<LivrosEntity> getAll(){
        return livrosRepository.findAll();
    }

    public Optional<LivrosEntity> getById(Integer id){
        return livrosRepository.findById(id);
    }

    public LivrosEntity update(Integer id,LivrosRecordDto dto){
        LivrosEntity livros = livrosRepository.findById(id).get();
        BeanUtils.copyProperties(dto, livros);
        livros.setId_livros(id);
        return livrosRepository.save(livros);
    }

    public void delete(Integer id){
        livrosRepository.deleteById(id);
    }
}
