package structure.librarium.dto;

import jakarta.validation.constraints.NotNull;

public record PagamentosRecordDto(
                                  @NotNull Integer id_pedidos) {
}
