import React, { useEffect, useState } from 'react';
import api from '../services/request';

function Home() {
  const [pokemons, setPokemons] = useState([]);

  async function getMoreInfo(url) {
    const response = await api.get(url);
    const { id, types, sprites, stats } = response.data;
    return { id, types, sprites, stats };
  }

  useEffect(() => {
    async function getAllPokemons() {
      const response = await api.get('/pokemon?limit=151&offset=0');
      const { results } = response.data;

      const payloadPokemons = await Promise.all(
        results.map(async (pokemon) => {
          const { id, types, sprites, stats } = await getMoreInfo(pokemon.url);
          return {
            name: pokemon.name,
            id,
            types,
            sprites,
            stats,
          };
        }),
      );
      setPokemons(payloadPokemons);
    }
    getAllPokemons();
  }, []);

  return (
    <div className="Home">
      {
        pokemons.map((elem) => (
          <div key={ elem.id }>
            <p>{elem.name}</p>
            <p>{elem.id}</p>
            <div key={ elem.types.slot }>{elem.types.map((info) => info.type.name)}</div>
          </div>))
      }
    </div>
  );
}

export default Home;
