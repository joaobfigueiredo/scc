import { useEffect, useState } from "react";
import axios from "axios";
import { Cliente } from "../../types/Cliente";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa"; // Ícones do React Icons


const ListarClientes = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
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
                    <button className="btn btn-sm btn-info me-2">
                      <FaEye /> {/* Ícone de Visualizar */}
                    </button>
                    <button className="btn btn-sm btn-warning me-2">
                      <FaEdit /> {/* Ícone de Editar */}
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => excluirCliente(cliente.id)}
                    >
                      <FaTrash /> {/* Ícone de Excluir */}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ListarClientes;
