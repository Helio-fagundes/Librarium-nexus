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
@Table(name = "categorias")
public class CategoriasEntity extends RepresentationModel<CategoriasEntity> {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id_categorias;
    private String nome;

}
