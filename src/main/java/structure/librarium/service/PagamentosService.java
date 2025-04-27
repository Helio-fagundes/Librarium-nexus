package structure.librarium.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import structure.librarium.dto.PagamentosRecordDto;
import structure.librarium.models.PagamentosEntity;
import structure.librarium.repository.PagamentosRepository;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PagamentosService {

    private final PagamentosRepository pagamentosRepository;

    public PagamentosEntity save(PagamentosRecordDto dto){
        PagamentosEntity pagamentos = new PagamentosEntity();
        BeanUtils.copyProperties(dto,pagamentos);
        return pagamentosRepository.save(pagamentos);
    }

    public List<PagamentosEntity> getAll(){
        return pagamentosRepository.findAll();
    }

    public Optional<PagamentosEntity> getById(Integer id){
        return pagamentosRepository.findById(id);
    }

    public PagamentosEntity update(Integer id, PagamentosRecordDto dto){
        PagamentosEntity pagamentos = pagamentosRepository.findById(id).get();
        BeanUtils.copyProperties(dto,pagamentos);
        pagamentos.setId_pagamentos(id);
        return pagamentosRepository.save(pagamentos);
    }

    public void delete(Integer id){
        pagamentosRepository.deleteById(id);
    }
}
