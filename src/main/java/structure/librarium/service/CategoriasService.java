package structure.librarium.service;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import structure.librarium.dto.CategoriasRecordDto;
import structure.librarium.models.CategoriasEntity;
import structure.librarium.repository.CategoriasRepository;

import java.util.List;
import java.util.Optional;

@Service
public class CategoriasService {

    @Autowired
    private CategoriasRepository categoriasRepository;

    public CategoriasEntity save(CategoriasRecordDto dto){
        CategoriasEntity categorias = new CategoriasEntity();
        BeanUtils.copyProperties(dto, categorias);
        return categoriasRepository.save(categorias);
    }

    public List<CategoriasEntity> getAll(){
        return categoriasRepository.findAll();
    }

    public Optional<CategoriasEntity> getById(Integer id){
        return categoriasRepository.findById(id);
    }

    public CategoriasEntity update(Integer id, CategoriasRecordDto dto){
        CategoriasEntity categorias = categoriasRepository.findById(id).get();
        BeanUtils.copyProperties(dto, categorias);
        return  categoriasRepository.save(categorias);
    }

    public void delete(Integer id){
        categoriasRepository.deleteById(id);
    }
}
