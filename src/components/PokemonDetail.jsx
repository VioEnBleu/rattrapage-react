import { useEffect, useState } from "react";
import { fetchPokemonById } from "../api/pokeapi";

export function PokemonDetail({ id }) {
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    fetchPokemonById(id).then(setPokemon);
  }, []);

  if (!pokemon) {
    return <aside className="detail-panel">Chargement...</aside>;
  }

  return (
    <aside className="detail-panel">
      <img src={pokemon.sprites.other["official-artwork"].front_default} alt={pokemon.name} />
      <h2>{pokemon.name}</h2>
      <p className="types">{pokemon.types.map((t) => t.type.name).join(" / ")}</p>
      <ul className="stats">
        {pokemon.stats.map((s) => (
          <li key={s.stat.name}>
            <span className="stat-name">{s.stat.name}</span>
            <div className="bar">
              <span style={{ width: `${Math.min(100, s.base_stat)}%` }} />
            </div>
            <span className="stat-value">{s.base_stat}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
