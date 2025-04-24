package structure.librarium.models;

import jakarta.persistence.*;
import org.springframework.hateoas.RepresentationModel;

@Entity
@Table(name = "autor")
public class AutorEntity extends RepresentationModel<AutorEntity> {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id_autor;
    private String nome;


    public Integer getId_autor() {
        return id_autor;
    }

    public void setId_autor(Integer id_autor) {
        this.id_autor = id_autor;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }
}

