import { KEY_SIGNATURES } from "../data/keys";

export default function KeySignatures() {
  return (
    <section>
      <h2 className="text-xl font-bold display-font mb-4" style={{ color: "var(--ink)" }}>
        Key Signatures Reference
      </h2>

      <div
        className="rounded-xl overflow-hidden"
        style={{ border: "1px solid var(--line)" }}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm" style={{ borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "var(--panel)" }}>
                <th
                  className="text-left px-4 py-3 font-semibold"
                  style={{ color: "var(--ink)", borderBottom: "1px solid var(--line)" }}
                >
                  Major Key
                </th>
                <th
                  className="text-left px-4 py-3 font-semibold"
                  style={{ color: "var(--ink)", borderBottom: "1px solid var(--line)" }}
                >
                  Relative Minor
                </th>
                <th
                  className="text-center px-4 py-3 font-semibold"
                  style={{ color: "var(--ink)", borderBottom: "1px solid var(--line)" }}
                >
                  Sharps
                </th>
                <th
                  className="text-center px-4 py-3 font-semibold"
                  style={{ color: "var(--ink)", borderBottom: "1px solid var(--line)" }}
                >
                  Flats
                </th>
                <th
                  className="text-left px-4 py-3 font-semibold"
                  style={{ color: "var(--ink)", borderBottom: "1px solid var(--line)" }}
                >
                  Accidentals
                </th>
              </tr>
            </thead>
            <tbody>
              {KEY_SIGNATURES.map((ks, i) => (
                <tr
                  key={ks.major}
                  style={{
                    background: i % 2 === 0 ? "var(--paper)" : "var(--panel)",
                    borderBottom: "1px solid var(--line)",
                  }}
                >
                  <td className="px-4 py-2.5 font-semibold" style={{ color: "var(--ink)" }}>
                    {ks.major}
                  </td>
                  <td className="px-4 py-2.5" style={{ color: "var(--muted)" }}>
                    {ks.minor}
                  </td>
                  <td className="px-4 py-2.5 text-center">
                    {ks.sharps > 0 ? (
                      <span
                        className="inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold"
                        style={{ background: "var(--accent)", color: "white" }}
                      >
                        {ks.sharps}
                      </span>
                    ) : (
                      <span style={{ color: "var(--line-strong)" }}>-</span>
                    )}
                  </td>
                  <td className="px-4 py-2.5 text-center">
                    {ks.flats > 0 ? (
                      <span
                        className="inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold"
                        style={{ background: "var(--warning)", color: "white" }}
                      >
                        {ks.flats}
                      </span>
                    ) : (
                      <span style={{ color: "var(--line-strong)" }}>-</span>
                    )}
                  </td>
                  <td className="px-4 py-2.5">
                    <span className="font-mono text-xs" style={{ color: "var(--muted)" }}>
                      {ks.accidentals || "None"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
