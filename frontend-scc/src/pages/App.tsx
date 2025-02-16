import React, { useEffect, useState } from "react";

import ListarClientes from "../components/ListarClientes";
import AdicionarClientes from "../components/AdicionarClientes";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  // 🔄 Função para atualizar a lista ao adicionar um cliente
  const atualizarListaClientes = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };  


  return (
    <>
    <AdicionarClientes onClienteAdicionado={atualizarListaClientes}/>
    <ListarClientes key={refreshKey} />
    </>
  );
};

export default App;
