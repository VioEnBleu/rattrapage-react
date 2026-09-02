export function SearchBar({ value, onChange }) {
  return (
    <input
      className="search-bar"
      type="search"
      placeholder="Filtrer par nom..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
