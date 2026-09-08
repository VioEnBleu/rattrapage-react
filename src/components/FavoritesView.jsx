export function FavoritesView({ favorites, onRemove }) {
  if (favorites.length === 0) {
    return <p className="empty">Aucun favori pour l'instant.</p>;
  }

  const sorted = [...favorites].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <ul className="favorites-list">
      {sorted.map((pokemon, index) => (
        <li key={pokemon.id} className="favorite-row">
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          <span className="name">{pokemon.name}</span>
          <button onClick={() => onRemove(pokemon.id)}>Retirer</button>
        </li>
      ))}
    </ul>
  );
}
