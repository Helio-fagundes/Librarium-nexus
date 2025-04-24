package structure.librarium.models;

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


    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }
}
