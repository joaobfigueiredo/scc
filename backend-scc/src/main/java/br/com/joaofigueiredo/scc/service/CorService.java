package br.com.joaofigueiredo.scc.service;


import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.joaofigueiredo.scc.model.Cor;
import br.com.joaofigueiredo.scc.repository.CorRepository;

@Service
public class CorService {

    @Autowired
    private CorRepository corRepository;

    public List<Cor> findAll() {
        return corRepository.findAll();
    }

    public Optional<Cor> findById(UUID id) {
        return corRepository.findById(id);
    }

    public Cor save(Cor cor) {
        return corRepository.save(cor);
    }

    public void delete(UUID id) {
        corRepository.deleteById(id);
    }

	public boolean existsById(UUID id) {
		return corRepository.existsById(id);
	}
}
