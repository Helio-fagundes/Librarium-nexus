package structure.librarium.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import structure.librarium.models.CategoriasEntity;

@Repository
public interface CategoriasRepository extends JpaRepository<CategoriasEntity, Integer> {

}
