const TYPES = [
  ["", "Tous les types"],
  ["normal", "Normal"],
  ["fire", "Feu"],
  ["water", "Eau"],
  ["electric", "Électrik"],
  ["grass", "Plante"],
  ["ice", "Glace"],
  ["fighting", "Combat"],
  ["poison", "Poison"],
  ["ground", "Sol"],
  ["flying", "Vol"],
  ["psychic", "Psy"],
  ["bug", "Insecte"],
  ["rock", "Roche"],
  ["ghost", "Spectre"],
  ["dragon", "Dragon"],
  ["dark", "Ténèbres"],
  ["steel", "Acier"],
  ["fairy", "Fée"],
];

export function TypeFilter({ value, onChange }) {
  return (
    <select className="type-filter" value={value} onChange={(e) => onChange(e.target.value)}>
      {TYPES.map(([slug, label]) => (
        <option key={slug} value={slug}>
          {label}
        </option>
      ))}
    </select>
  );
}
