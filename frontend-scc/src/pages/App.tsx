import React, { useEffect, useState } from "react";

import ListarClientes from "../components/ListarClientes";
import AdicionarClientes from "../components/AdicionarClientes";
import { Cliente } from "../types/Cliente";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const [clienteEditando, setClienteEditando] = useState<Cliente | null>(null);

  // 🔄 Função para atualizar a lista ao adicionar um cliente
  const atualizarListaClientes = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };  

  const handleEditarCliente = (cliente: Cliente) => {
    setClienteEditando(cliente);
};  


  return (
    <>
    <AdicionarClientes 
    onClienteAdicionado={() => { 
        setClienteEditando(null); // Limpa o estado após salvar
        atualizarListaClientes(); 
    }} 
    clienteParaEditar={clienteEditando} 
/>
      <ListarClientes key={refreshKey} onEditarCliente={handleEditarCliente} />

    </>
  );
};

export default App;
