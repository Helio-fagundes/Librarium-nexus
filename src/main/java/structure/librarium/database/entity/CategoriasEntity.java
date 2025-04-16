package structure.librarium.database.entity;

import jakarta.persistence.*;
import org.springframework.hateoas.RepresentationModel;

import java.util.UUID;

@Entity
@Table(name = "categorias")
public class CategoriasEntity extends RepresentationModel<CategoriasEntity> {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id_categoria;
    private String nome;

    public UUID getId_categoria() {
        return id_categoria;
    }

    public void setId_categoria(UUID id_categoria) {
        this.id_categoria = id_categoria;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }
}
