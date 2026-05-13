import { Title } from "@/src/components/ui/title";
import { StatusLabel } from "./status-label";
import { VarDescription } from "../../../components/ui/var-description";
import { CardsSection } from "./cards/cards-section";
import { GirCard } from "./cards/extern-sector-finance/gir-card";
import { InflationCard } from "./cards/inflation/inflation-card";
import { REMAnnualInflation } from "./cards/inflation/rem-annual-inflation";
import { AnnualInflationCard } from "./cards/inflation/annual-inflation-card";
import { CCLGapCard } from "./cards/exchange/exchange-gap-ccl-card";
import { MEPGapCard } from "./cards/exchange/exchange-gap-mep-card";
import { BlueGapCard } from "./cards/exchange/exchange-gap-blue-card";
import { MayoristaGapCard } from "./cards/exchange/exchange-gap-mayorista-card";
import { DepositDolarizationCard } from "./cards/extern-sector-finance/deposit-dolarization-card";
import { UsdVariationCard } from "./cards/exchange/usd-variation";
import { RealRateARSCard } from "./cards/extern-sector-finance/real-rate-ARS-card";
import { InflationVarCard } from "./cards/inflation/var-inflation-card";

export const VAR_LABEL = [
  {
    title: "Inflación mensual",
    description:
      "Variación porcentual mensual del IPC elaborado por el INDEC, que mide la evolución del costo de una canasta representativa de bienes y servicios. Es el indicador central del ancla nominal: sobre él se indexan contratos de alquiler, se negocian paritarias y se calibra la tasa de política monetaria del BCRA.",
    high: "Señal de inercia inflacionaria activa. Los agentes anticipan nuevos aumentos y adelantan remarcaciones, generando una profecía autocumplida. Las paritarias exigen cláusulas de actualización más cortas y el BCRA enfrenta presión para subir tasas.",
    low: "Indica avance del proceso de desinflación. Recupera la demanda de dinero en pesos, reduce el pass-through cambiario y habilita la baja de tasas de interés reales sin perder credibilidad nominal.",
    relations: [
      "Una inflación mensual alta presiona el TCR (Tipo de Cambio Real) a la baja si el oficial no acompaña, erosionando competitividad exportadora.",
      "Expectativas desancladas (REM) suelen anticipar en 1-2 meses aceleraciones del IPC efectivo.",
      "La tasa real en pesos (BADLAR vs IPC) determina si el ahorro en pesos tiene sentido o si se incentiva la dolarización de portafolios.",
    ],
  },
  {
    title: "Inflación interanual",
    description:
      "Variación porcentual del IPC respecto del mismo mes del año anterior, elaborada por el INDEC. Captura el efecto acumulado de doce meses de variaciones de precios, suavizando shocks transitorios. Es la referencia estándar para comparaciones internacionales y para indexar contratos de largo plazo.",
    high: "Refleja un período prolongado de alta inflación. Aunque el dato mensual esté bajando, el interanual tarda en ceder por el efecto base (base effect): los meses de alta inflación del año anterior sostienen el porcentaje acumulado artificialmente elevado.",
    low: "Confirma que la desinflación es sostenida y no un fenómeno de uno o dos meses. Es la señal que el mercado necesita para reducir la prima de riesgo inflacionario en contratos y activos financieros.",
    relations: [
      "La caída del interanual es siempre más lenta que la del mensual en procesos de desinflación: el efecto base puede distorsionar la lectura del momentum real.",
      "Es el índice que usan los organismos internacionales (FMI, Banco Mundial) para evaluar la estabilidad de precios en Argentina.",
    ],
  },
  {
    title: "Expectativas de inflación a 12 meses (REM)",
    description:
      "Mediana de las proyecciones de inflación para los próximos doce meses relevadas mensualmente por el BCRA a través del REM (Relevamiento de Expectativas de Mercado), que consolida estimaciones de bancos, consultoras y centros de investigación.",
    high: "Expectativas desancladas: los agentes económicos ya incorporaron inflación futura en sus decisiones de precios y salarios hoy. El BCRA pierde efectividad de la política monetaria y cualquier shock externo se amplifica.",
    low: "Expectativas ancladas son condición necesaria —aunque no suficiente— para la convergencia nominal. Habilita tasas de interés más bajas sin acelerar la inflación y reduce el costo del crédito en pesos.",
    relations: [
      "Cuando el REM diverge sistemáticamente del dato efectivo del INDEC, es señal de falta de credibilidad institucional o de interferencia en la estadística oficial.",
      "Las paritarias sindicales toman el REM como piso de negociación: expectativas altas implican salarios nominales más altos, retroalimentando el ciclo.",
    ],
  },
  {
    title: "Variación mensual del tipo de cambio",
    description:
      "Depreciación mensual del ARS frente al USD en el mercado oficial (MULC). En Argentina, el alto pass-through implica que una devaluación brusca se traslada casi de inmediato a precios domésticos, retroalimentando la inflación. El TCR determina la competitividad exportadora.",
    high: "Devaluación acelerada del oficial. Impacto inflacionario inmediato vía costos de importación y expectativas. Los exportadores liquidan divisas más rápido anticipando nueva apreciación; los importadores adelantan compras.",
    low: "Tipo de cambio estable o con crawling peg lento. Ancla nominal efectiva a corto plazo, pero si la inflación supera la depreciación del oficial, el TCR se aprecia y erosiona la competitividad exportadora gradualmente.",
    relations: [
      "La brecha entre el oficial y el CCL/blue refleja el nivel de represión cambiaria y las expectativas de salto discreto del tipo de cambio.",
      "Una devaluación del oficial reduce la brecha cambiaria pero genera un pico inflacionario inmediato (pass-through).",
    ],
  },
  {
    title: "Brecha cambiaria (CCL / Oficial)",
    description:
      "Diferencia porcentual entre el CCL (Contado con Liquidación) y el tipo de cambio oficial mayorista. El CCL es el precio implícito del dólar que surge de comprar un activo en pesos en Argentina y venderlo en dólares en el exterior, sorteando el cepo cambiario.",
    high: "Represión cambiaria intensa. Los exportadores retienen stocks esperando una convergencia del oficial al CCL. El BCRA pierde reservas interviniendo para sostener el oficial y el mercado descuenta un salto cambiario.",
    low: "Brecha reducida indica menor presión sobre el cepo y mayor confianza en la política cambiaria. Facilita la unificación cambiaria y reduce el incentivo a la subfacturación de exportaciones.",
    relations: [
      "Brecha alta desincentiva el ingreso de divisas: el exportador liquida lo mínimo obligatorio y retiene el resto.",
      "Una reducción sostenida de la brecha es condición necesaria para levantar el cepo sin un salto inflacionario descontrolado.",
    ],
  },
  {
    title: "Brecha MEP (Bolsa / Oficial)",
    description:
      "Diferencia porcentual entre el dólar MEP (Mercado Electrónico de Pagos) y el tipo de cambio oficial. Surge de comprar un bono en pesos y venderlo en dólares dentro del sistema financiero argentino, sin salida de divisas al exterior.",
    high: "Alta demanda de cobertura cambiaria dentro del sistema financiero local. Señal de desconfianza en el peso entre agentes que operan formalmente pero buscan dolarizar liquidez sin violar el cepo.",
    low: "Demanda de cobertura moderada. El MEP por debajo del CCL y cerca del oficial indica menor presión del sector financiero formal sobre el tipo de cambio.",
    relations: [
      "El MEP suele cotizar entre el oficial y el CCL, actuando como indicador del piso de la brecha financiera.",
      "Para empresas con operaciones en Argentina, el MEP es el canal legal más accesible para dolarizar excedentes de caja.",
    ],
  },
  {
    title: "Brecha blue (Blue / Oficial)",
    description:
      "Diferencia porcentual entre el dólar informal (blue) y el tipo de cambio oficial minorista. Opera fuera del sistema financiero regulado y refleja la demanda de dolarización de sectores que no acceden o no quieren acceder a los canales formales.",
    high: "Fuerte presión dolarizadora informal. El blue influye en la indexación informal de contratos y precios en sectores de la economía real, especialmente alquileres, construcción y comercio minorista.",
    low: "Menor presión informal sobre el tipo de cambio. Históricamente asociado a períodos de estabilidad relativa o de represión efectiva del mercado informal por parte de las autoridades.",
    relations: [
      "Aunque su volumen es menor que el CCL, el blue es el indicador más visible para el público general e impacta directamente en las expectativas de la población.",
      "Una brecha blue elevada y persistente precede históricamente a crisis cambiarias en Argentina.",
    ],
  },
  {
    title: "Reservas internacionales",
    description:
      "Divisas extranjeras acumuladas por el BCRA —principalmente USD, DEG del FMI y oro— que constituyen el respaldo soberano de la base monetaria y determinan la capacidad de intervención cambiaria. Las RIN (Reservas Netas) descuentan los pasivos en moneda extranjera.",
    high: "El BCRA tiene capacidad de intervención sostenida. Reduce el riesgo país, comprime el spread soberano y da margen para sostener el tipo de cambio oficial sin salto discreto.",
    low: "RIN negativas o en caída implican vulnerabilidad cambiaria severa. El mercado descuenta mayor probabilidad de devaluación o default de deuda externa. Los importadores enfrentan restricciones de acceso al MULC.",
    relations: [
      "El nivel de reservas en meses de importaciones es el indicador de cobertura estándar: menos de 3 meses se considera zona de stress.",
      "Las metas de acumulación de reservas son el principal ancla cuantitativa de los acuerdos con el FMI.",
    ],
  },
  {
    title: "Tasa real mensual en pesos",
    description:
      "Rendimiento efectivo del ahorro en ARS descontada la inflación mensual. Se construye mensualizada la tasa BADLAR (depósitos a plazo fijo mayoristas +$1M a 30-35 días) aplicando la ecuación de Fisher: tasa real = (1 + TEM) / (1 + π) − 1.",
    high: "Tasa real positiva: el ahorro en pesos rinde por encima de la inflación. Incentiva la permanencia en pesos, reduce la presión sobre el tipo de cambio y fortalece las reservas del BCRA.",
    low: "Tasa real negativa: el rendimiento nominal no compensa la pérdida de poder adquisitivo. Genera incentivo estructural a la dolarización de portafolios y presiona sobre las RIN del BCRA.",
    relations: [
      "Una tasa real fuertemente negativa es insostenible: los depositantes migran a dólares o activos reales, retroalimentando la presión cambiaria.",
      "El BCRA usa la tasa de política monetaria para influir sobre la BADLAR, pero el pass-through es parcial y con rezago.",
    ],
  },
  {
    title: "Dolarización de depósitos del sector privado",
    description:
      "Proporción de depósitos bancarios del sector privado en moneda extranjera sobre el total del sistema financiero. Indicador estructural del bimonetarismo argentino: a mayor porcentaje, mayor preferencia por el dólar como reserva de valor y unidad de cuenta.",
    high: "Pérdida de confianza en el peso como reserva de valor. Los agentes migran a dólares anticipando devaluación o aceleración inflacionaria. Episodios de suba pronunciada han precedido históricamente las grandes crisis cambiarias argentinas.",
    low: "Mayor confianza relativa en el peso. En contextos de tasas reales positivas y brecha cambiaria baja, los agentes están dispuestos a mantener liquidez en moneda local.",
    relations: [
      "Una suba sostenida de este indicador es una señal temprana (leading indicator) de stress cambiario, más confiable que la brecha blue por su base de datos formal.",
      "Los depósitos en dólares están encajados en el BCRA: su retiro masivo presiona directamente sobre las reservas brutas.",
    ],
  },
];

export default function MainEconomicsStats() {
  return (
    <section className="mt-10 flex flex-col items-center">
      <header className="flex flex-col items-center mb-10">
        <Title
          title="Salud Macroeconómica Argentina"
          label="Principales estadísticas"
        />
        <StatusLabel />
      </header>

      <main className="flex flex-col items-center gap-20">
        <CardsSection
          title="Precios"
          cards={[
            <InflationCard />,
            <InflationVarCard />,
            <AnnualInflationCard />,
            <REMAnnualInflation />,
          ]}
        />

        <CardsSection
          title="Tipo de cambio"
          cards={[
            <UsdVariationCard />,
            <CCLGapCard />,
            <MEPGapCard />,
            <MayoristaGapCard />,
            <BlueGapCard />,
          ]}
        />

        <CardsSection
          title="Sector externo y financiero"
          cards={[
            <GirCard />,
            <RealRateARSCard />,
            <DepositDolarizationCard />,
          ]}
        />
      </main>

      <section className="flex flex-col gap-5 divide-surface-2 divide-y mt-10">
        {VAR_LABEL &&
          VAR_LABEL.map((economicVar) => (
            <VarDescription
              key={economicVar.title}
              title={economicVar.title}
              description={economicVar.description}
              high={economicVar.high}
              low={economicVar.low}
              relations={economicVar.relations}
            />
          ))}
      </section>
    </section>
  );
}
