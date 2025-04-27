package structure.librarium.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import structure.librarium.dto.PedidosRecordDto;
import structure.librarium.models.PedidosEntity;
import structure.librarium.repository.PedidosRepository;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PedidosService {

    private final PedidosRepository pedidosRepository;

    public PedidosEntity save(PedidosRecordDto dto){
        PedidosEntity pedidos = new PedidosEntity();
        BeanUtils.copyProperties(dto, pedidos);
        return pedidosRepository.save(pedidos);
    }

    public List<PedidosEntity> getAll(){
        return pedidosRepository.findAll();
    }

    public Optional<PedidosEntity> getById(Integer id){
        return pedidosRepository.findById(id);
    }

    public PedidosEntity update(Integer id, PedidosRecordDto dto){
        PedidosEntity pedidos = pedidosRepository.findById(id).get();
        BeanUtils.copyProperties(dto, pedidos);
        pedidos.setId_pedidos(id);
        return pedidosRepository.save(pedidos);
    }

    public void deleteById(Integer id){
        pedidosRepository.deleteById(id);
    }
}
