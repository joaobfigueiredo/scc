package br.com.joaofigueiredo.scc.model;

import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "clientes", uniqueConstraints = @UniqueConstraint(columnNames = "cpf"))
public class Cliente {

    @Id
    @GeneratedValue(generator = "UUID")
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    private String nomeCompleto;
    private String cpf;
    private String email;

    @ManyToOne
    @JoinColumn(name = "cor_preferida_id")
    private Cor corPreferida;

    @Column(length = 500)
    private String observacoes;

}
