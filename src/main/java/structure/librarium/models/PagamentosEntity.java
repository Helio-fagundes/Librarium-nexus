package structure.librarium.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.hateoas.RepresentationModel;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "pagamentos")
public class PagamentosEntity extends RepresentationModel<PagamentosEntity> {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id_pagamentos;
    private Integer id_pedidos;

}
