import { NAV_ITEMS } from "./Sidebar";

interface MobileNavProps {
  activeSection: string;
  onSelectSection: (id: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileNav({ activeSection, onSelectSection, isOpen, onClose }: MobileNavProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40"
        style={{ background: "rgba(0, 0, 0, 0.5)" }}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className="fixed inset-y-0 left-0 z-50 w-64 flex flex-col"
        style={{ background: "var(--dock)" }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-4 py-4"
          style={{ borderBottom: "1px solid var(--line)" }}
        >
          <h1 className="text-base font-bold display-font" style={{ color: "var(--ink)" }}>
            Music Theory
          </h1>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg cursor-pointer"
            style={{ background: "var(--panel)", border: "none", color: "var(--ink)" }}
            aria-label="Close navigation"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex-1 overflow-y-auto py-2 px-2">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectSection(item.id);
                  onClose();
                }}
                className="w-full flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-left cursor-pointer mb-0.5"
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
      </div>
    </>
  );
}
