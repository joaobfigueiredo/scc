import { useEffect, useState } from "react";
import axios from "axios";
import { Cliente } from "../../types/Cliente";

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

  return (
    <div>
      <h2>Lista de Clientes</h2>

      {loading ? (
        <p>Carregando...</p>
      ) : clientes.length === 0 ? (
        <p>Nenhum cliente cadastrado.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>CPF</th>
              <th>Cor Preferida</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente) => (
              <tr key={cliente.id}>
                <td>{cliente.nomeCompleto}</td>
                <td>{cliente.email}</td>
                <td>{cliente.cpf}</td>
                <td>{cliente.corPreferida.nome}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ListarClientes;
