import { useEffect, useState } from "react";

const STORAGE_KEY = "pokedex-favorites";

export function useFavorites() {
  const [favorites, setFavorites] = useState(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  function addFavorite(pokemon) {
    if (favorites.some((f) => f.id === pokemon.id)) return;
    setFavorites([...favorites, pokemon]);
  }

  function removeFavorite(index) {
    setFavorites(favorites.filter((i) => i !== index));
  }

  function isFavorite(id) {
    return favorites.some((f) => f.id === id);
  }

  return { favorites, addFavorite, removeFavorite, isFavorite };
}
