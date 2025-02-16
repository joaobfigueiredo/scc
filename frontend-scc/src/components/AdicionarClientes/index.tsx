import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Cor } from "../../types/Cor";
import { Cliente } from "../../types/Cliente";


type AdicionarClientesProps = {
    onClienteAdicionado: () => void;
    clienteParaEditar?:Cliente | null;  
};

const AdicionarClientes: React.FC<AdicionarClientesProps> = ({ onClienteAdicionado, clienteParaEditar }) => {
    const [cores, setCores] = useState<Cor[]>([]);
    const [corSelecionada, setCorSelecionada] = useState("");
    const [message, setMessage] = useState('');
    const [formData, setFormData] = useState({
        nomeCompleto: clienteParaEditar?.nomeCompleto || '',
        cpf: clienteParaEditar?.cpf || '',
        email: clienteParaEditar?.email || '',
        corPreferida: { id: clienteParaEditar?.corPreferida.id || "" },
        observacoes: clienteParaEditar?.observacoes || ''
    });

    useEffect(() => {
        if (clienteParaEditar) {
            setFormData({
                nomeCompleto: clienteParaEditar.nomeCompleto,
                cpf: clienteParaEditar.cpf,
                email: clienteParaEditar.email,
                corPreferida: { id: clienteParaEditar.corPreferida.id },
                observacoes: clienteParaEditar.observacoes
            });
            setCorSelecionada(clienteParaEditar.corPreferida.id);
        }
    }, [clienteParaEditar]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const handleCorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCorSelecionada(e.target.value);
        setFormData({ ...formData, corPreferida: { id: e.target.value } });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (clienteParaEditar) {
                // Atualiza um cliente existente (PUT)
                await axios.put(`http://localhost:8080/api/clientes/${clienteParaEditar.id}`, formData);
                setMessage("Cliente atualizado com sucesso!");
            } else {
                // Cria um novo cliente (POST)
                await axios.post("http://localhost:8080/api/clientes", formData);
                setMessage("Cliente cadastrado com sucesso!");
            }
    

            // 🟢 Limpa o formulário
            setFormData({
                nomeCompleto: "",
                cpf: "",
                email: "",
                corPreferida: { id: "" },
                observacoes: "",
            });
            setCorSelecionada("");

            // 🔄 Atualiza a lista de clientes no componente pai
            onClienteAdicionado();
        } catch (error: any) {
            setMessage(error.response?.data || "Erro no cadastro");
        }
    };

    useEffect(() => {
        fetch("http://localhost:8080/api/cores") // Ajuste a URL conforme necessário
            .then((response) => response.json())
            .then((data) => setCores(data))
            .catch((error) => console.error("Erro ao buscar cores:", error));
    }, []);

    return (
        <>
            <div className="container mt-4">
                <h1 className="text-primary">Cadastro de Cliente</h1>
                <form onSubmit={handleSubmit} className="card p-4 shadow">
                    <div className="mb-3">
                        <label className="form-label">Nome Completo:</label>
                        <input
                            className="form-control"
                            type="text"
                            name="nomeCompleto"
                            value={formData.nomeCompleto}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">CPF:</label>
                        <input
                            className="form-control"
                            type="text"
                            name="cpf"
                            value={formData.cpf}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Email:</label>
                        <input
                            className="form-control"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Cor Preferida:</label>
                        <select value={corSelecionada} onChange={handleCorChange}
                            className="form-select">
                            <option value="">Selecione uma cor</option>
                            {cores.map((cor) => (
                                <option key={cor.id} value={cor.id}>
                                    {cor.nome}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Observações:</label>
                        <textarea
                            name="observacoes"
                            value={formData.observacoes}
                            onChange={handleChange}
                            className="form-control"
                        ></textarea>
                    </div>

                    <button type="submit" className="btn btn-success">
                        {clienteParaEditar ? "Salvar Alterações" : "Cadastrar"}
                    </button>
                </form>
            </div>
        </>
    )
}


export default AdicionarClientes
