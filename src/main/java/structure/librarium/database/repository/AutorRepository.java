package structure.librarium.database.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import structure.librarium.database.entity.AutorEntity;

@Repository
public interface AutorRepository  extends JpaRepository<AutorEntity, Integer> {

}
