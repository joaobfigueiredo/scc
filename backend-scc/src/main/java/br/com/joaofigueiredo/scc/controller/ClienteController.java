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

import br.com.joaofigueiredo.scc.model.Cliente;
import br.com.joaofigueiredo.scc.model.Cliente;
import br.com.joaofigueiredo.scc.service.ClienteService;

@RestController
@RequestMapping("/api/clientes")
@CrossOrigin(origins = "*") // Permite acesso do front-end (ajuste conforme necessário)
public class ClienteController {

    @Autowired
    private ClienteService clienteService;

    @PostMapping
    public ResponseEntity<?> cadastrarCliente(@RequestBody Cliente cliente) {
        try {
            Cliente clienteSalvo = clienteService.salvarCliente(cliente);
            return ResponseEntity.ok(clienteSalvo);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
    @GetMapping
    public ResponseEntity<List<Cliente>> getAllClientees() {
        return ResponseEntity.ok(clienteService.findAll());
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Cliente> updateCliente(@PathVariable UUID id, @RequestBody Cliente cliente) {
        return clienteService.findById(id)
                .map(existing -> {
                    existing.setNomeCompleto(cliente.getNomeCompleto());
                    existing.setCorPreferida(cliente.getCorPreferida());
                    existing.setEmail(cliente.getEmail());
                    return ResponseEntity.ok(clienteService.save(existing));
                })
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Cliente> getClienteById(@PathVariable UUID id) {
        return clienteService.findById(id)
            .map(cor -> ResponseEntity.ok(cor))
            .orElse(ResponseEntity.notFound().build());
    }
    
    
    
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteCliente(@PathVariable UUID id) {
		if (clienteService.existsById(id)) {
			clienteService.delete(id);
			return ResponseEntity.noContent().build();
		}
		return ResponseEntity.notFound().build();
	}
    
}
