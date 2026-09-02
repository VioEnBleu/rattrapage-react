import { useEffect, useState } from "react";
import { fetchPokemonByType } from "./api/pokeapi";
import { usePokemonList } from "./hooks/usePokemonList";
import { useFavorites } from "./hooks/useFavorites";
import { SearchBar } from "./components/SearchBar";
import { TypeFilter } from "./components/TypeFilter";
import { PokemonGrid } from "./components/PokemonGrid";
import { PokemonDetail } from "./components/PokemonDetail";
import { FavoritesView } from "./components/FavoritesView";

export default function App() {
  const { pokemons, loading, loadMore } = usePokemonList();
  const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites();

  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [typeResults, setTypeResults] = useState(null);
  const [typeLoading, setTypeLoading] = useState(false);
  const [selectedId, setSelectedId] = useState(1);
  const [tab, setTab] = useState("all");

  useEffect(() => {
    if (!type) {
      setTypeResults(null);
      return;
    }
    let cancelled = false;
    setTypeLoading(true);
    fetchPokemonByType(type).then((results) => {
      if (cancelled) return;
      setTypeResults(results);
      setTypeLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [type]);

  const source = typeResults ?? pokemons;
  const visible = source.filter((p) => p.name.includes(search.toLowerCase()));

  return (
    <div className="app">
      <header className="app-header">
        <h1>Pokédex</h1>
        <nav className="tabs">
          <button
            className={tab === "all" ? "active" : ""}
            onClick={() => setTab("all")}
          >
            Pokémon
          </button>
          <button
            className={tab === "favorites" ? "active" : ""}
            onClick={() => setTab("favorites")}
          >
            Favoris ({favorites.length})
          </button>
        </nav>
      </header>

      <div className="app-body">
        <main className="main-column">
          {tab === "all" ? (
            <>
              <div className="toolbar">
                <SearchBar value={search} onChange={setSearch} />
                <TypeFilter value={type} onChange={setType} />
              </div>
              {typeLoading ? (
                <p className="empty">Chargement du type...</p>
              ) : (
                <PokemonGrid
                  pokemons={visible}
                  loading={loading}
                  onLoadMore={loadMore}
                  onSelect={setSelectedId}
                  isFavorite={isFavorite}
                  onToggleFavorite={addFavorite}
                />
              )}
            </>
          ) : (
            <FavoritesView favorites={favorites} onRemove={removeFavorite} />
          )}
        </main>

        <PokemonDetail id={selectedId} />
      </div>
    </div>
  );
}
