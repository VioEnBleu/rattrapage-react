import { PokemonCard } from "./PokemonCard";

export function PokemonGrid({ pokemons, loading, onLoadMore, onSelect, isFavorite, onToggleFavorite }) {
  return (
    <>
      <ul className="pokemon-grid">
        {pokemons.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            isFavorite={isFavorite(pokemon.id)}
            onSelect={onSelect}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </ul>
      <button className="load-more" onClick={onLoadMore} disabled={loading}>
        {loading ? "Chargement..." : "Charger plus"}
      </button>
    </>
  );
}
