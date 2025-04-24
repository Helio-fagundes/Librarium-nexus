package structure.librarium.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record FeedbackRecordDto(
                                @NotBlank String nome_do_usuario,
                                @NotBlank String descricao,
                                @NotNull Integer id_livros) {
}
