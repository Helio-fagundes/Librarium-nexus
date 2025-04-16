package structure.librarium.database.entity;

import jakarta.persistence.*;
import org.springframework.hateoas.RepresentationModel;

import java.util.UUID;

@Entity
@Table(name = "feedback")
public class FeedbackEntity extends RepresentationModel<FeedbackEntity> {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id_feedback;
    private String nome_do_usuario;
    private String descricao;

    public UUID getId_feedback() {
        return id_feedback;
    }

    public void setId_feedback(UUID id_feedback) {
        this.id_feedback = id_feedback;
    }

    public String getNome_do_usuario() {
        return nome_do_usuario;
    }

    public void setNome_do_usuario(String nome_do_usuario) {
        this.nome_do_usuario = nome_do_usuario;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }
}
