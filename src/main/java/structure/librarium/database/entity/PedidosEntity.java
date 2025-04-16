package structure.librarium.database.entity;

import jakarta.persistence.*;
import org.springframework.hateoas.RepresentationModel;

import java.util.UUID;

@Entity
@Table(name = "pedidos")
public class PedidosEntity extends RepresentationModel<PedidosEntity> {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id_pedidos;
    private Integer id_usuario;
    private Integer id_livro;

    public UUID getId_pedidos() {
        return id_pedidos;
    }

    public void setId_pedidos(UUID id_pedidos) {
        this.id_pedidos = id_pedidos;
    }

    public Integer getId_usuario() {
        return id_usuario;
    }

    public void setId_usuario(Integer id_usuario) {
        this.id_usuario = id_usuario;
    }

    public Integer getId_livro() {
        return id_livro;
    }

    public void setId_livro(Integer id_livro) {
        this.id_livro = id_livro;
    }
}
