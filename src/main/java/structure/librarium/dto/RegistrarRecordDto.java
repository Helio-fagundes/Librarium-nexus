package structure.librarium.dto;

import jakarta.validation.constraints.NotBlank;


public record RegistrarRecordDto(
                               @NotBlank String nome,
                               @NotBlank(message = "este email já existe")
                               String email,
                               @NotBlank String senha,
                               @NotBlank String cpf,
                               @NotBlank String tel) {
}
