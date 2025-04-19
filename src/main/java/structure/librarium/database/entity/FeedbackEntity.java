package structure.librarium.database.entity;

import jakarta.persistence.*;
import org.springframework.hateoas.RepresentationModel;

import java.util.UUID;

@Entity
@Table(name = "avaliacoes")
public class FeedbackEntity extends RepresentationModel<FeedbackEntity> {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id_avaliacao;
    private String nome_do_usuario;
    private String descricao;

    public Integer getId_avaliacao() {
        return id_avaliacao;
    }

    public void setId_avaliacao(Integer id_avaliacao) {
        this.id_avaliacao = id_avaliacao;
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
