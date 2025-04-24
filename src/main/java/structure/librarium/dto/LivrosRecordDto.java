package structure.librarium.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record LivrosRecordDto(
                              @NotNull Integer id_categorias,
                              @NotNull Integer id_autor,
                              @NotBlank String nome,
                              @NotBlank String descricao,
                              @NotNull Double preco) {
}
