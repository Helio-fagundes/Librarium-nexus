package structure.librarium.dto;

import jakarta.validation.constraints.NotBlank;

public record CategoriasRecordDto(
                                  @NotBlank String nome) {
}
