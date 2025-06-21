package br.com.fecaf.Repository;

import br.com.fecaf.Model.Livro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LivroRepository extends JpaRepository<Livro, Long> {
    List<Livro> findByTituloContainingIgnoreCaseOrAutorContainingIgnoreCaseOrEditoraContainingIgnoreCase(
            String titulo, String autor, String editora);
}
