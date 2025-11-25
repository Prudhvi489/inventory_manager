import { useEffect, useState } from "react";
import "../styles/SearchBar.css";

export default function SearchBar({ value, onChange, delay = 500 }) {
  const [text, setText] = useState(value ?? "");

  useEffect(() => setText(value ?? ""), [value]);

  useEffect(() => {
    const t = setTimeout(() => onChange(text), delay);
    return () => clearTimeout(t);
  }, [text, delay, onChange]);

  return (
    <input
      type="search"
      className="search-input"
      placeholder="Search by product name…"
      value={text}
      onChange={(e) => setText(e.target.value)}
    />
  );
}
