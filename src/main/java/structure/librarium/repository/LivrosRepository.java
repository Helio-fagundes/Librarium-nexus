package structure.librarium.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import structure.librarium.models.LivrosEntity;

@Repository
public interface LivrosRepository extends JpaRepository<LivrosEntity, Integer> {
}
