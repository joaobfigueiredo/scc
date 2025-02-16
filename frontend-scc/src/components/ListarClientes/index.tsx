import { useEffect, useState } from "react";
import axios from "axios";
import { Cliente } from "../../types/Cliente";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa"; // Ícones do React Icons


const ListarClientes: React.FC<{ onEditarCliente: (cliente: Cliente) => void }> = ({ onEditarCliente }) => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [clienteVisualizando, setClienteVisualizando] = useState<Cliente | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios.get("http://localhost:8080/api/clientes")
      .then((response) => {
        setClientes(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar clientes:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const excluirCliente = (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir este cliente?")) {
      axios.delete(`http://localhost:8080/api/clientes/${id}`)
        .then(() => {
          setClientes(clientes.filter(cliente => cliente.id !== id));
        })
        .catch(error => {
          console.error("Erro ao excluir cliente:", error);
        });
    }
  };

  // Função para exibir o modal visualizar cliente
  const handleVisualizarCliente = (cliente: Cliente) => {
    setClienteVisualizando(cliente);
  };

  const fecharModal = () => {
    setClienteVisualizando(null); // Fechar o modal
  };

  return (
    <div className="container mt-4">
      <h2 className="text-primary">Lista de Clientes</h2>

      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Carregando...</span>
          </div>
        </div>
      ) : clientes.length === 0 ? (
        <div className="alert alert-warning text-center">Nenhum cliente cadastrado.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-bordered mt-3">
            <thead className="table-dark">
              <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>CPF</th>
                <th>Cor Preferida</th>
                <th className="text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map((cliente) => (
                <tr key={cliente.id}>
                  <td>{cliente.nomeCompleto}</td>
                  <td>{cliente.email}</td>
                  <td>{cliente.cpf}</td>
                  <td>{cliente.corPreferida.nome}</td>
                  <td className="text-center">
                    <button className="btn btn-sm btn-info me-2" onClick={() => handleVisualizarCliente(cliente)}>
                      <FaEye /> 
                    </button>
                    <button className="btn btn-sm btn-warning me-2" onClick={() => onEditarCliente(cliente)}>
                      <FaEdit />
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => excluirCliente(cliente.id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}


      {/* Modal para exibir detalhes do cliente */}
      {clienteVisualizando && (
        <div className="modal" style={modalStyles}>
          <div className="modal-content" style={modalContentStyles}>
            <h2>Detalhes do Cliente</h2>
            <p><strong>Nome:</strong> {clienteVisualizando.nomeCompleto}</p>
            <p><strong>Email:</strong> {clienteVisualizando.email}</p>
            <p><strong>CPF:</strong> {clienteVisualizando.cpf}</p>
            <p><strong>Cor Preferida:</strong> {clienteVisualizando.corPreferida.nome}</p>
            <p><strong>Observações:</strong> {clienteVisualizando.observacoes}</p>
            <button onClick={fecharModal}>Fechar</button>
          </div>
        </div>
      )}

    </div>
  );
};

export default ListarClientes;

const modalStyles: React.CSSProperties = {
  position: "fixed",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)", // Fundo escuro
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalContentStyles: React.CSSProperties = {
  backgroundColor: "#fff",
  padding: "20px",
  borderRadius: "5px",
  width: "400px",
  maxWidth: "90%",
};