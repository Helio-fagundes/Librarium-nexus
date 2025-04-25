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
@Table(name = "avaliacoes")
public class FeedbackEntity extends RepresentationModel<FeedbackEntity> {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id_avaliacao;
    private String nome_do_usuario;
    private String descricao;
    private Integer id_livros;

}
