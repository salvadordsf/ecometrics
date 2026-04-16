import { Title } from "@/src/components/ui/title";
import { GirCard } from "@/src/features/main-stats/components/gir-card";
import { InflationCard } from "@/src/features/main-stats/components/inflation-card";
import { RealRateARSCard } from "@/src/features/main-stats/components/real-rate-ARS-card";
import { UsdVariationCard } from "@/src/features/main-stats/components/usd-variation";
import { StatusLabel } from "./status-label";
import { VarDescription } from "./var-description";

const VAR_LABEL = [
  {
    title: "Reservas internacionales",
    description:
      "El BCRA (Banco Central de la República Argentina) acumula divisas extranjeras —principalmente USD (dólares estadounidenses), DEG (Derechos Especiales de Giro del FMI) y oro— que constituyen el respaldo soberano de la base monetaria. Estas reservas brutas determinan la capacidad de intervención cambiaria del Central y el nivel de cobertura de importaciones, medido en meses de cobertura. Cuando las RIN (Reservas Internacionales Netas, descontados los pasivos en moneda extranjera) caen, el mercado descuenta mayor riesgo de un evento de stress cambiario o default de deuda externa. Un nivel sólido de reservas reduce el riesgo país, comprime el spread soberano y es condición necesaria para sostener cualquier régimen cambiario, ya sea de flotación administrada o convertibilidad.",
  },
  {
    title: "Inflación mensual",
    description:
      "Variación porcentual mensual del IPC (Índice de Precios al Consumidor) elaborado por el INDEC (Instituto Nacional de Estadística y Censos), que mide la evolución del costo de una canasta representativa de bienes y servicios. Es el indicador central del ancla nominal de la economía: sobre él se indexan los contratos de alquiler, se negocian las paritarias (acuerdos salariales por sector), se calibra la tasa de política monetaria y se proyecta el tipo de cambio real. Una inflación mensual descendente y sostenida —proceso conocido como desinflación— es condición necesaria para recuperar la demanda de dinero en pesos, reducir el pass-through (traslado de la devaluación a precios) y estabilizar las expectativas inflacionarias.",
  },
  {
    title: "Variación mensual del tipo de cambio",
    description:
      "Mide la depreciación mensual del ARS (peso argentino) frente al USD (dólar estadounidense) en el mercado oficial, operado a través del MULC (Mercado Único y Libre de Cambios). En economías con alto pass-through como Argentina, una depreciación brusca del tipo de cambio nominal se traslada casi de inmediato a precios domésticos, retroalimentando el proceso inflacionario. El TCR (Tipo de Cambio Real), que ajusta el nominal por el diferencial de inflación entre Argentina y sus socios comerciales, determina la competitividad exportadora. La brecha entre el tipo de cambio oficial y los tipos de cambio paralelos —CCL (Contado con Liquidación) y dólar blue— refleja el nivel de represión cambiaria y las expectativas de devaluación del mercado.",
  },
  {
    title: "Tasa real mensual en pesos",
    description:
      "Indicador que mide el rendimiento efectivo del ahorro en ARS (pesos argentinos) una vez descontado el efecto erosivo de la inflación. Se construye mensualizado la tasa BADLAR (Buenos Aires Deposits of Large Amount Rate), que es la tasa pasiva promedio que pagan los bancos privados por depósitos a plazo fijo mayoristas de más de $1M a 30-35 días, y aplicando la ecuación de Fisher: tasa real = (1 + TEM) / (1 + π) − 1, donde TEM es la Tasa Efectiva Mensual y π es la inflación mensual. Una tasa real negativa implica que el rendimiento nominal no compensa la pérdida de poder adquisitivo, generando un incentivo estructural a la dolarización de portafolios y presionando sobre las RIN (Reservas Internacionales Netas) del BCRA.",
  },
];

export default function MainEconomicsStats() {
  return (
    <div className="mt-10 flex flex-col items-center">
      <Title
        title="Salud Macroeconómica Argentina"
        label="Principales estadísticas"
      />
      <StatusLabel />
      <main className="flex flex-wrap justify-center gap-5">
        <GirCard />
        <InflationCard />
        <UsdVariationCard />
        <RealRateARSCard />
      </main>

      <section className="flex flex-col gap-5 divide-neutral-800 divide-y mt-10">
        {VAR_LABEL &&
          VAR_LABEL.map((economicVar) => (
            <VarDescription
              key={economicVar.title}
              title={economicVar.title}
              description={economicVar.description}
            />
          ))}
      </section>
    </div>
  );
}
