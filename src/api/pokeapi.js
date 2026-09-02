const BASE_URL = "https://pokeapi.co/api/v2";

export async function fetchPokemonPage(offset, limit) {
  const res = await fetch(`${BASE_URL}/pokemon?offset=${offset}&limit=${limit}`);
  const data = await res.json();
  return Promise.all(data.results.map((entry) => fetch(entry.url).then((r) => r.json())));
}

export async function fetchPokemonByType(type) {
  const res = await fetch(`${BASE_URL}/type/${type}`);
  const data = await res.json();
  return Promise.all(data.pokemon.map((entry) => fetch(entry.pokemon.url).then((r) => r.json())));
}

export async function fetchPokemonById(id) {
  const res = await fetch(`${BASE_URL}/pokemon/${id}`);
  return res.json();
}
