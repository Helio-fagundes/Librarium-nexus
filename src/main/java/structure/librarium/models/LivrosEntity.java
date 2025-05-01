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
@Table(name = "livros")
public class LivrosEntity extends RepresentationModel<LivrosEntity>{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id_livros;
    private String nome;
    private String descricao;
    private Double preco;
    private Integer id_autor;
    private Integer id_categorias;

}
