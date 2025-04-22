package structure.librarium.entity;

import jakarta.persistence.*;
import org.springframework.hateoas.RepresentationModel;

@Entity
@Table(name = "categorias")
public class CategoriasEntity extends RepresentationModel<CategoriasEntity> {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id_categorias;
    private String nome;

    public Integer getId_categorias() {
        return id_categorias;
    }

    public void setId_categorias(Integer id_categoria) {
        this.id_categorias = id_categoria;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }
}
