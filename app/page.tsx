import Link from "next/link";

const SECTIONS = [
  {
    label: "Salud macroeconómica",
    description:
      "Inflación, reservas, tipo de cambio y sector externo en un solo dashboard.",
    href: "/estadisticas-principales",
    badge: null,
    size: "large",
  },
  {
    label: "Inflación",
    description: "Evolución histórica del IPC y expectativas del mercado.",
    href: "/inflacion",
    badge: null,
    size: "small",
  },
  {
    label: "Deuda Privada",
    description: "Deuda privada, tipos y composición.",
    href: "/deuda-privada",
    badge: null,
    size: "small",
  },
  {
    label: "Tipo de cambio",
    description: "Dólar oficial, MEP, CCL y brecha histórica.",
    href: "#",
    badge: "Próximamente",
    size: "small",
  },
];

const CALCULADORAS = [
  {
    label: "Inflación acumulada",
    description: "Calculá cuánto se acumuló la inflación entre dos fechas.",
    href: "/calculadoras/inflacion",
    icon: "%",
  },
  {
    label: "Poder adquisitivo",
    description: "Medí cómo cambió el valor real de un salario o ingreso.",
    href: "/calculadoras/poder-adquisitivo",
    icon: "$",
  },
  {
    label: "Actualización de alquiler",
    description: "Calculá el nuevo valor de un contrato según el índice ICL.",
    href: "/calculadoras/alquiler",
    icon: "⌂",
  },
];

export default function Home() {
  return (
    <main className="relative min-h-[calc(100vh-56px)] flex flex-col items-center justify-center px-6 py-16">

      <div className="relative flex flex-col items-center gap-10 w-full max-w-xl">
        {/* Eyebrow */}
        <span className="text-xs tracking-[0.3em] uppercase text-amber">
          código abierto · argentina
        </span>

        {/* Hero */}
        <div className="flex flex-col items-center gap-3 text-center">
          <h1 className="text-4xl font-semibold text-text-primary tracking-tight">
            Ecometrics
          </h1>
          <p className="text-md text-text-secondary leading-relaxed max-w-sm">
            Análisis macroeconómico argentino en tiempo real — con herramientas
            para entender el impacto en tu economía personal.
          </p>
        </div>

        <div className="w-[60%] h-px bg-gradient-to-r from-transparent via-amber/40 to-transparent" />

        {/* Mosaico análisis */}
        <div className="w-full flex flex-col gap-2">
          <span className="text-xs tracking-[0.25em] uppercase text-text-secondary mb-1">
            Análisis macroeconómico
          </span>
          <div className="grid grid-cols-2 gap-2">
            {SECTIONS.map(({ label, description, href, badge, size }) => {
              const isDisabled = href === "#";
              const baseClass = `
                relative flex flex-col justify-between gap-6 p-4 rounded-md
                border border-border bg-surface-2/80
                transition-all duration-150 group
                ${size === "large" ? "col-span-2" : "col-span-1"}
                ${isDisabled ? "opacity-40 cursor-default" : "hover:border-border-2 hover:bg-surface-2 cursor-pointer"}
              `;

              const inner = (
                <>
                  <div className="flex flex-col gap-1">
                    <span
                      className={`text-lg font-medium transition-colors duration-150 ${isDisabled ? "text-text-muted" : "text-amber/90 group-hover:text-amber"}`}
                    >
                      {label}
                    </span>
                    <span className="text-md text-text-secondary leading-relaxed">
                      {description}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    {badge ? (
                      <span className="text-xs tracking-[0.15em] uppercase text-amber-dim border border-amber-subtle rounded px-1.5 py-0.5">
                        {badge}
                      </span>
                    ) : (
                      <span />
                    )}
                    {!isDisabled && (
                      <span className="text-text-muted group-hover:text-amber transition-colors duration-150 text-xs">
                        →
                      </span>
                    )}
                  </div>
                </>
              );

              return isDisabled ? (
                <div key={label} className={baseClass}>
                  {inner}
                </div>
              ) : (
                <Link key={label} href={href} className={baseClass}>
                  {inner}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Calculadoras */}
        <div className="w-full flex flex-col gap-2">
          <div className="flex flex-col gap-0.5 mb-1">
            <span className="text-xs tracking-[0.25em] uppercase text-text-secondary">
              Herramientas
            </span>
            <span className="text-sm text-text-secondary">
              Calculadoras para medir el impacto de la economía en tu bolsillo
            </span>
          </div>
          <div className="flex flex-col gap-2">
            {CALCULADORAS.map(({ label, description, href, icon }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-4 px-4 py-3 rounded-md border border-border bg-surface-2/80 hover:border-border-2 hover:bg-surface-2 transition-all duration-150 group"
              >
                <span className="text-lg w-7 text-center text-amber/60 group-hover:text-amber transition-colors duration-150 font-mono shrink-0">
                  {icon}
                </span>
                <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                  <span className="text-lg font-medium text-text-secondary group-hover:text-text-primary transition-colors duration-150">
                    {label}
                  </span>
                  <span className="text-md text-text-muted leading-relaxed">
                    {description}
                  </span>
                </div>
                <span className="text-text-muted group-hover:text-amber transition-colors duration-150 text-xs shrink-0">
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
