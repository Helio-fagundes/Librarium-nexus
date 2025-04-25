package structure.librarium.models;

import jakarta.persistence.*;
import org.springframework.hateoas.RepresentationModel;

import java.util.List;


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

    @OneToMany(mappedBy = "id_livros")
    private List<FeedbackEntity> feedbacks;

    public Integer getId_livros() {
        return id_livros;
    }

    public void setId_livros(Integer id_livro) {
        this.id_livros = id_livro;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Double getPreco() {
        return preco;
    }

    public void setPreco(Double preco) {
        this.preco = preco;
    }

    public Integer getId_autor() {
        return id_autor;
    }

    public void setId_autor(Integer id_autor) {
        this.id_autor = id_autor;
    }

    public Integer getId_categorias() {
        return id_categorias;
    }

    public void setId_categorias(Integer id_categorias) {
        this.id_categorias = id_categorias;
    }


}
