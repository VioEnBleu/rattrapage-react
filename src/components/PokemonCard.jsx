export function PokemonCard({ pokemon, isFavorite, onSelect, onToggleFavorite }) {
  return (
    <li className="pokemon-card" onClick={() => onSelect(pokemon.id)}>
      <button
        className={`favorite-toggle ${isFavorite ? "active" : ""}`}
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite(pokemon);
        }}
        aria-label="Ajouter aux favoris"
      >
        ★
      </button>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <span className="name">{pokemon.name}</span>
      <span className="number">#{String(pokemon.id).padStart(3, "0")}</span>
    </li>
  );
}
