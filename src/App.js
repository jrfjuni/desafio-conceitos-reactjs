import React, { useState, useEffect } from "react";

import "./styles.css";
import api from './services/api';

function App() {
  const [repositories, setRepository] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepository(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: `New Repository ${Date.now()}`,
      url: "https://www.github/jrfjuni",
      techs: ['Java', 'Node', 'React', 'ReactJS']
    });

    setRepository([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    const { status } = await api.delete(`/repositories/${id}`);
    
    if(status === 204) {
      const newArray = repositories.filter(repository => repository.id !== id);
      setRepository(newArray);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => {
          return (
            <li key={repository.id}>
              {repository.title}

              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          )  
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
