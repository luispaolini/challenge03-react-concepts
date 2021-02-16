import React, { useState, useEffect } from "react";
import api from "./services/api";


import "./styles.css";

function App() {
  async function handleAddRepository() {
    
    const response = await api.post('repositories', {
        title: `Repository`,
        url: 'https://github.com/luispaolini/challenge03',
        techs : ['tech01', 'tech02', 'tech03']
    });

    setRepositories([...repositories, response.data]);

  }

  async function handleRemoveRepository(id) {
    
    await api.delete(`repositories/${id}`);

    setRepositories(repositories.filter(
      repository => repository.id !== id
    ))

  }

   // Defining state management for repositories
  const [repositories, setRepositories] = useState([]);

  // Getting repositories from back-end
  useEffect(() => {
    api.get("repositories").then(response => {
      setRepositories(response.data);
    });
  }, []);


  return (
    <div>
      <ul data-testid="repository-list">
          {repositories.map(repository => 
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
