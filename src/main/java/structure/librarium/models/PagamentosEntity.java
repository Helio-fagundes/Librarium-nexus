package structure.librarium.models;

import jakarta.persistence.*;

@Entity
@Table(name = "pagamentos")
public class PagamentosEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id_pagamentos;
    private Integer id_pedidos;

    public Integer getId_pagamento() {
        return id_pagamentos;
    }

    public void setId_pagamento(Integer id_pagamento) {
        this.id_pagamentos = id_pagamento;
    }

    public Integer getId_pedidos() {
        return id_pedidos;
    }

    public void setId_pedidos(Integer id_pedidos) {
        this.id_pedidos = id_pedidos;
    }
}
