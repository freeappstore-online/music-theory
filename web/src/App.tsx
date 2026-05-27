import { useState } from "react";
import Sidebar from "./components/Sidebar";
import MobileNav from "./components/MobileNav";
import PianoPage from "./components/PianoPage";
import ScalesExplorer from "./components/ScalesExplorer";
import ChordExplorer from "./components/ChordExplorer";
import IntervalTrainer from "./components/IntervalTrainer";
import CircleOfFifths from "./components/CircleOfFifths";
import ChordProgressions from "./components/ChordProgressions";
import KeySignatures from "./components/KeySignatures";
import EarTrainingStats from "./components/EarTrainingStats";

type Section =
  | "piano"
  | "scales"
  | "chords"
  | "intervals"
  | "circle"
  | "progressions"
  | "keys"
  | "stats";

function SectionContent({ section }: { section: Section }) {
  switch (section) {
    case "piano":
      return <PianoPage />;
    case "scales":
      return <ScalesExplorer />;
    case "chords":
      return <ChordExplorer />;
    case "intervals":
      return <IntervalTrainer />;
    case "circle":
      return <CircleOfFifths />;
    case "progressions":
      return <ChordProgressions />;
    case "keys":
      return <KeySignatures />;
    case "stats":
      return <EarTrainingStats />;
  }
}

export default function App() {
  const [section, setSection] = useState<Section>("piano");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="flex h-screen" style={{ background: "var(--paper)" }}>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex">
        <Sidebar activeSection={section} onSelectSection={(id) => setSection(id as Section)} />
      </div>

      {/* Mobile Nav Drawer */}
      <MobileNav
        activeSection={section}
        onSelectSection={(id) => setSection(id as Section)}
        isOpen={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
      />

      {/* Main content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header
          className="shrink-0 flex items-center gap-3 px-4 py-3 lg:px-6"
          style={{ borderBottom: "1px solid var(--line)", background: "var(--glass)" }}
        >
          <button
            onClick={() => setMobileNavOpen(true)}
            className="lg:hidden w-8 h-8 flex items-center justify-center rounded-lg cursor-pointer"
            style={{ background: "var(--panel)", border: "none", color: "var(--ink)" }}
            aria-label="Open navigation"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1
            className="text-lg font-bold display-font"
            style={{ color: "var(--ink)" }}
          >
            Music Theory
          </h1>
          <span className="text-xs" style={{ color: "var(--muted)" }}>
            Interactive Explorer
          </span>
        </header>

        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto px-4 py-5 lg:px-6">
          <SectionContent section={section} />
        </div>

        {/* Footer */}
        <footer
          className="shrink-0 flex items-center justify-center px-4 py-2 text-xs"
          style={{ borderTop: "1px solid var(--line)", color: "var(--muted)" }}
        >
          Music Theory — Free on FreeAppStore
        </footer>
      </main>
    </div>
  );
}
