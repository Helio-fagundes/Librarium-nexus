package structure.librarium.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

public record UsuarioRecordDto(
                               @NotBlank String nome,
                               @NotBlank(message = "este email já existe")
                               String email,
                               @NotBlank String senha,
                               @NotBlank String cpf,
                               @NotBlank String tell) {
}
