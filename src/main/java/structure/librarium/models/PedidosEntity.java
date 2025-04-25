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
@Table(name = "pedidos")
public class PedidosEntity extends RepresentationModel<PedidosEntity> {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id_pedidos;
    private Integer id_usuario;
    private Integer id_livros;

}
