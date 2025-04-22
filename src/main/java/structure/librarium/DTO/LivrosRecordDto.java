package structure.librarium.DTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record LivrosRecordDto(@NotNull Integer id_livros,
                              @NotNull Integer id_categorias,
                              @NotNull Integer id_autor,
                              @NotNull String id_avaliacao,
                              @NotBlank String nome,
                              @NotBlank String descricao,
                              @NotNull Double preco) {
}
