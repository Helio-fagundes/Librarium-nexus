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
@Table(name = "usuario")
public class UsuarioEntity extends RepresentationModel<UsuarioEntity> {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id_usuario;
    private String nome;
    private String cpf;
    private String adress;
    private String tell;

}
