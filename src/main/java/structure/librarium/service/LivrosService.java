package structure.librarium.service;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import structure.librarium.dto.LivrosRecordDto;
import structure.librarium.models.LivrosEntity;
import structure.librarium.repository.LivrosRepository;

import java.util.List;
import java.util.Optional;

@Service
public class LivrosService {

    @Autowired
    private LivrosRepository livrosRepository;

    public LivrosEntity saveLivro(LivrosRecordDto dto){
        LivrosEntity livros = new LivrosEntity();
        BeanUtils.copyProperties(dto, livros);
        return livrosRepository.save(livros);
    }

    public List<LivrosEntity> getAllLivros(){
        return livrosRepository.findAll();
    }

    public Optional<LivrosEntity> getLivrosById(Integer id){
        return livrosRepository.findById(id);
    }

    public LivrosEntity updateLivro(Integer id,LivrosEntity dto){
        LivrosEntity livros = livrosRepository.findById(id).get();
        BeanUtils.copyProperties(dto, livros);
        livros.setId_livros(id);
        return livrosRepository.save(livros);
    }

    public void deleteLivro(Integer id){
        livrosRepository.deleteById(id);
    }
}
