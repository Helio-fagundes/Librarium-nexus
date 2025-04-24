package structure.librarium.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CategoriasRecordDto(
                                  @NotBlank String nome) {
}
