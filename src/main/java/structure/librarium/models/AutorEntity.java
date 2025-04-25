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
@Table(name = "autor")
public class AutorEntity extends RepresentationModel<AutorEntity> {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id_autor;
    private String nome;

}

