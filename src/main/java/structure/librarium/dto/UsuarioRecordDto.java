package structure.librarium.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record UsuarioRecordDto(
                               @NotBlank String nome,
                               @NotBlank String cpf,
                               @NotBlank String adress,
                               @NotBlank String tell) {
}
