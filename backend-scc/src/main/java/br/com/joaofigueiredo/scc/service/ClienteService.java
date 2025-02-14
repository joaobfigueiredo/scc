package br.com.joaofigueiredo.scc.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.joaofigueiredo.scc.model.Cliente;
import br.com.joaofigueiredo.scc.repository.ClienteRepository;

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;

    public Cliente salvarCliente(Cliente cliente) throws Exception {
        if (clienteRepository.findByCpf(cliente.getCpf()).isPresent()) {
            throw new Exception("Cliente já cadastrado com esse CPF.");
        }
        return clienteRepository.save(cliente);
    }
    
    public List<Cliente> findAll() {
        return clienteRepository.findAll();
    }

	public Cliente save(Cliente cliente) {
		return clienteRepository.save(cliente);
	}
    
    public Optional<Cliente> findById(UUID id) {
        return clienteRepository.findById(id);
    }
    
    public void delete(UUID id) {
    	clienteRepository.deleteById(id);
    }

	public boolean existsById(UUID id) {
		return clienteRepository.existsById(id);
	}    

}
