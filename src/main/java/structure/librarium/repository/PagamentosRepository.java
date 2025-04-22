package structure.librarium.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import structure.librarium.models.PagamentosEntity;

@Repository
public interface PagamentosRepository extends JpaRepository<PagamentosEntity, Integer> {
}
