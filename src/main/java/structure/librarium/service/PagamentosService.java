package structure.librarium.service;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import structure.librarium.dto.PagamentosRecordDto;
import structure.librarium.models.PagamentosEntity;
import structure.librarium.repository.PagamentosRepository;

import java.util.List;
import java.util.Optional;

@Service
public class PagamentosService {

    @Autowired
    private PagamentosRepository pagamentosRepository;

    public PagamentosEntity savePagamento(PagamentosRecordDto dto){
        PagamentosEntity pagamentos = new PagamentosEntity();
        BeanUtils.copyProperties(dto,pagamentos);
        return pagamentosRepository.save(pagamentos);
    }

    public List<PagamentosEntity> getAllPagamentos(){
        return pagamentosRepository.findAll();
    }

    public Optional<PagamentosEntity> getPagamentoById(Integer id){
        return pagamentosRepository.findById(id);
    }

    public PagamentosEntity updatePagamentos(Integer id, PagamentosRecordDto dto){
        PagamentosEntity pagamentos = pagamentosRepository.findById(id).get();
        BeanUtils.copyProperties(dto,pagamentos);
        pagamentos.setId_pagamento(id);
        return pagamentosRepository.save(pagamentos);
    }

    public void deletePagamentos(Integer id){
        pagamentosRepository.deleteById(id);
    }
}
