package structure.librarium.DTO;

import jakarta.validation.constraints.NotNull;

public record PedidosRecordDto(@NotNull Integer id_pedidos,
                               @NotNull Integer id_usuario,
                               @NotNull Integer id_livros) {
}
