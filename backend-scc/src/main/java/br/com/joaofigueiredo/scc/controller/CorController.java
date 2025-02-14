package br.com.joaofigueiredo.scc.controller;


import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.joaofigueiredo.scc.model.Cor;
import br.com.joaofigueiredo.scc.service.CorService;

@RestController
@RequestMapping("/api/cores")
@CrossOrigin(origins = "*")
public class CorController {

    @Autowired
    private CorService corService;

    @GetMapping
    public ResponseEntity<List<Cor>> getAllCores() {
        return ResponseEntity.ok(corService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Cor> getCorById(@PathVariable UUID id) {
        return corService.findById(id)
            .map(cor -> ResponseEntity.ok(cor))
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Cor> createCor(@RequestBody Cor cor) {
        Cor savedCor = corService.save(cor);
        return ResponseEntity.ok(savedCor);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Cor> updateCor(@PathVariable UUID id, @RequestBody Cor cor) {
        return corService.findById(id)
                .map(existing -> {
                    existing.setNome(cor.getNome());
                    return ResponseEntity.ok(corService.save(existing));
                })
                .orElse(ResponseEntity.notFound().build());
    }

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteCor(@PathVariable UUID id) {
		if (corService.existsById(id)) {
			corService.delete(id);
			return ResponseEntity.noContent().build();
		}
		return ResponseEntity.notFound().build();
	}
}
