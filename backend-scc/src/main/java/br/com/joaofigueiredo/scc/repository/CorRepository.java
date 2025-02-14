package br.com.joaofigueiredo.scc.repository;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.joaofigueiredo.scc.model.Cor;

public interface CorRepository extends JpaRepository<Cor, UUID> {
    Optional<Cor> findByNome(String nome);
}