package structure.librarium.dto;

import jakarta.validation.constraints.NotBlank;

public record UsuarioRecordDto(
                               @NotBlank String nome,
                               @NotBlank(message = "este email já existe")
                               String email,
                               @NotBlank String senha,
                               @NotBlank String cpf,
                               @NotBlank String adress,
                               @NotBlank String tell) {
}
