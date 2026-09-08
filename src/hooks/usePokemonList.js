import { useCallback, useEffect, useState } from "react";
import { fetchPokemonPage } from "../api/pokeapi";

const PAGE_SIZE = 20;

export function usePokemonList() {
  const [pokemons, setPokemons] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);

  const loadMore = useCallback(() => {
    setLoading(true);
    fetchPokemonPage(offset, PAGE_SIZE).then((newOnes) => {
      const updated = pokemons.concat(newOnes);
      setPokemons(updated);
      setOffset(offset + PAGE_SIZE);
      setLoading(false);
    });
  }, [ offset, pokemons]);

  useEffect(() => {
    loadMore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { pokemons, loading, loadMore };
}
