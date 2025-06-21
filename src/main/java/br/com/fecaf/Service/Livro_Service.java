package br.com.fecaf.Service;

import br.com.fecaf.Model.Livro;
import br.com.fecaf.Repository.LivroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class Livro_Service {

    @Autowired
    private LivroRepository repository;

    public List<Livro> listarTodos() {
        return repository.findAll();
    }

    public Livro salvar(Livro livro) {
        return repository.save(livro);
    }

    public Livro buscarPorId(Long id) {
        return repository.findById(id).orElse(null);
    }

    public void deletar(Long id) {
        repository.deleteById(id);
    }

    public List<Livro> buscarPorTermo(String termo) {
        return repository.findByTituloContainingIgnoreCaseOrAutorContainingIgnoreCaseOrEditoraContainingIgnoreCase(
                termo, termo, termo);
    }
}