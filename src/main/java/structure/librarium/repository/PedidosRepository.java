package structure.librarium.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import structure.librarium.entity.PedidosEntity;

@Repository
public interface PedidosRepository extends JpaRepository<PedidosEntity, Integer> {
}
