package structure.librarium.entity;

import jakarta.persistence.*;
import org.springframework.hateoas.RepresentationModel;

@Entity
@Table(name = "pedidos")
public class PedidosEntity extends RepresentationModel<PedidosEntity> {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id_pedidos;
    private Integer id_usuario;
    private Integer id_livros;

    public Integer getId_pedidos() {
        return id_pedidos;
    }

    public void setId_pedidos(Integer id_pedidos) {
        this.id_pedidos = id_pedidos;
    }

    public Integer getId_usuario() {
        return id_usuario;
    }

    public void setId_usuario(Integer id_usuario) {
        this.id_usuario = id_usuario;
    }

    public Integer getId_livros() {
        return id_livros;
    }

    public void setId_livros(Integer id_livros) {
        this.id_livros = id_livros;
    }
}
