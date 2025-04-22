package structure.librarium.DTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record AutorRecordDto(@NotNull Integer id_autor,
                             @NotBlank String nome) {
}
