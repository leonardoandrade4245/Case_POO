package br.com.fecaf.RestController;

import br.com.fecaf.Model.Livro;
import br.com.fecaf.Service.Livro_Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/livros")
@CrossOrigin(origins = "*")
public class LivroRestController {

    @Autowired
    private Livro_Service service;

    @GetMapping
    public List<Livro> listar() {
        return service.listarTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Livro> buscarPorId(@PathVariable Long id) {
        Livro livro = service.buscarPorId(id);
        if (livro == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(livro);
    }

    @GetMapping("/buscar")
    public List<Livro> buscar(@RequestParam String termo) {
        return service.buscarPorTermo(termo);
    }

    @PostMapping
    public ResponseEntity<Livro> salvar(@RequestBody Livro livro) {
        Livro salvo = service.salvar(livro);
        return ResponseEntity.ok(salvo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Livro> atualizar(@PathVariable Long id, @RequestBody Livro livro) {
        Livro existente = service.buscarPorId(id);
        if (existente == null) {
            return ResponseEntity.notFound().build();
        }
        existente.setTitulo(livro.getTitulo());
        existente.setAutor(livro.getAutor());
        existente.setEditora(livro.getEditora());
        existente.setAnoPublicacao(livro.getAnoPublicacao());
        existente.setCapa(livro.getCapa());
        existente.setDescricao(livro.getDescricao());
        Livro atualizado = service.salvar(existente);
        return ResponseEntity.ok(atualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        Livro existente = service.buscarPorId(id);
        if (existente == null) {
            return ResponseEntity.notFound().build();
        }
        service.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
