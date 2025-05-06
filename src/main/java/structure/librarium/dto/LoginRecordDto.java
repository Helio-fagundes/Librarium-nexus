package structure.librarium.dto;

import jakarta.validation.constraints.NotBlank;

public record LoginRecordDto(
        @NotBlank String email,
        @NotBlank String senha
) {
}
