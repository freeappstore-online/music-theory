interface SidebarItem {
  id: string;
  label: string;
  icon: string;
}

const NAV_ITEMS: SidebarItem[] = [
  { id: "piano", label: "Piano", icon: "🎹" },
  { id: "scales", label: "Scales", icon: "🎼" },
  { id: "chords", label: "Chords", icon: "🎵" },
  { id: "intervals", label: "Interval Trainer", icon: "👂" },
  { id: "circle", label: "Circle of Fifths", icon: "⭕" },
  { id: "progressions", label: "Progressions", icon: "🔄" },
  { id: "keys", label: "Key Signatures", icon: "🔑" },
  { id: "stats", label: "Ear Training Stats", icon: "📊" },
];

interface SidebarProps {
  activeSection: string;
  onSelectSection: (id: string) => void;
}

export default function Sidebar({ activeSection, onSelectSection }: SidebarProps) {
  return (
    <aside
      className="w-60 h-screen flex flex-col shrink-0"
      style={{
        background: "var(--dock)",
        borderRight: "1px solid var(--line)",
      }}
    >
      {/* Logo area */}
      <div className="px-4 py-4" style={{ borderBottom: "1px solid var(--line)" }}>
        <h1
          className="text-base font-bold display-font"
          style={{ color: "var(--ink)" }}
        >
          Music Theory
        </h1>
        <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>
          Interactive Explorer
        </p>
      </div>

      {/* Nav items */}
      <nav className="flex-1 overflow-y-auto py-2 px-2">
        {NAV_ITEMS.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectSection(item.id)}
              className="w-full flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-left cursor-pointer mb-0.5"
              style={{
                background: isActive ? "var(--accent)" : "transparent",
                color: isActive ? "white" : "var(--ink)",
                border: "none",
              }}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div
        className="px-4 py-3 text-xs"
        style={{ borderTop: "1px solid var(--line)", color: "var(--muted)" }}
      >
        Free on FreeAppStore
      </div>
    </aside>
  );
}

export { NAV_ITEMS };
