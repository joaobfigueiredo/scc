-- Habilita a extensão para geração de UUID (se ainda não estiver habilitada)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


CREATE TABLE cores (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nome VARCHAR(255) UNIQUE NOT NULL
);


CREATE TABLE clientes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nome_completo VARCHAR(255),
    cpf VARCHAR(14) UNIQUE NOT NULL,
    email VARCHAR(255),
    cor_preferida_id UUID,
    observacoes TEXT,
    CONSTRAINT fk_cor_preferida FOREIGN KEY (cor_preferida_id) REFERENCES cores(id)
);

INSERT INTO cores (nome) VALUES 
('Vermelho'),
('Laranja'),
('Amarelo'),
('Verde'),
('Azul'),
('Anil'),
('Violeta');