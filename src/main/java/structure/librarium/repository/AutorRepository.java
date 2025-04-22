package structure.librarium.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import structure.librarium.models.AutorEntity;

@Repository
public interface AutorRepository  extends JpaRepository<AutorEntity, Integer> {

}
