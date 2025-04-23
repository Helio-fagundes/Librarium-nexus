package structure.librarium.service;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import structure.librarium.dto.PedidosRecordDto;
import structure.librarium.models.PedidosEntity;
import structure.librarium.repository.PedidosRepository;

import java.util.List;
import java.util.Optional;

@Service
public class PedidosService {

    @Autowired
    private PedidosRepository pedidosRepository;

    public PedidosEntity savePedidos(PedidosRecordDto dto){
        PedidosEntity pedidos = new PedidosEntity();
        BeanUtils.copyProperties(dto, pedidos);
        return pedidosRepository.save(pedidos);
    }

    public List<PedidosEntity> getAllPedidos(){
        return pedidosRepository.findAll();
    }

    public Optional<PedidosEntity> getPedidosById(Integer id){
        return pedidosRepository.findById(id);
    }

    public PedidosEntity updatePedidos(Integer id, PedidosRecordDto dto){
        PedidosEntity pedidos = pedidosRepository.findById(id).get();
        BeanUtils.copyProperties(dto, pedidos);
        pedidos.setId_pedidos(id);
        return pedidosRepository.save(pedidos);
    }

    public void deletePedidosById(Integer id){
        pedidosRepository.deleteById(id);
    }
}
