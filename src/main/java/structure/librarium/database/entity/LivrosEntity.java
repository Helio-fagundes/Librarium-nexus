package structure.librarium.database.entity;

import jakarta.persistence.*;

import java.util.UUID;

@Entity
@Table(name = "livros")
public class LivrosEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id_livros;
    private String nome;
    private String descricao;
    private Double preco;
    private Integer id_autor;
    private Integer id_categoria;
    private Integer id_feedback;

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

    public Integer getId_categoria() {
        return id_categoria;
    }

    public void setId_categoria(Integer id_categoria) {
        this.id_categoria = id_categoria;
    }

    public Integer getId_feedback() {
        return id_feedback;
    }

    public void setId_feedback(Integer id_feedback) {
        this.id_feedback = id_feedback;
    }
}
