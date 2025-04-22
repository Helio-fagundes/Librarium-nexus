package structure.librarium.DTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record FeedbackRecordDto(@NotNull Integer id_avaliacao,
                                @NotBlank String nome_do_usuario,
                                @NotBlank String descricao) {
}
