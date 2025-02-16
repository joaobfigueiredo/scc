import React, { useEffect, useState } from 'react';

function ListarRepositorios() {
    const [repositorio, setRepositorio] = useState<any[]>([]);

    useEffect(() => {
        async function carregaRepositorios() {
          const resposta = await fetch('https://api.github.com/users/joaobfigueiredo/repos');
          const repositorios = await resposta.json();

          console.log(repositorios);
          setRepositorio(repositorios);
        }
        carregaRepositorios();
      }, []);

    return (
     <ul>
        {repositorio.map(repositorio => (
            <li key={repositorio.id}>
                {repositorio.name}
            </li>
        ))}
     </ul>
    );
  }
  export default ListarRepositorios;