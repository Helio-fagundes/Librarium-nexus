package structure.librarium.DTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CategoriasRecordDto(@NotNull Integer id_categorias,
                                  @NotBlank String nome) {
}
