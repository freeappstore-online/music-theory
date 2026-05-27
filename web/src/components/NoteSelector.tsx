import { ROOT_NOTES, enharmonicName } from "../data/notes";

interface NoteSelectorProps {
  value: string;
  onChange: (note: string) => void;
  label?: string;
}

export default function NoteSelector({ value, onChange, label = "Root Note" }: NoteSelectorProps) {
  return (
    <label className="flex items-center gap-2">
      <span className="text-sm font-medium" style={{ color: "var(--muted)" }}>
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-lg px-3 py-1.5 text-sm font-medium cursor-pointer"
        style={{
          background: "var(--panel)",
          color: "var(--ink)",
          border: "1px solid var(--line)",
        }}
      >
        {ROOT_NOTES.map((note) => (
          <option key={note} value={note}>
            {enharmonicName(note)}
          </option>
        ))}
      </select>
    </label>
  );
}
