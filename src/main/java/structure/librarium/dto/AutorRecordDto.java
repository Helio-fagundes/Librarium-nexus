package structure.librarium.dto;

import jakarta.validation.constraints.NotBlank;

public record AutorRecordDto(
                             @NotBlank String nome) {
}
