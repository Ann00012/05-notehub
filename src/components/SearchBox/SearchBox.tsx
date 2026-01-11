import css from "./SearchBox.module.css";
import { useId } from "react";

interface SearchBarProps {
  value: string;
  onChange: (query: string) => void;
}

export default function SearchBox({ value, onChange }: SearchBarProps) {
  const inputId = useId();

  return (
    <div className={css.searchWrapper}>
      <input
        id={inputId}
        className={css.input}
        type="text"
        placeholder="Search notes..."
        aria-label="Note search query"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
