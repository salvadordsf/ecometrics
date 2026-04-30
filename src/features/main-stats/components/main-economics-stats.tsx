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

const VAR_LABEL = [
  {
    title: "Inflación mensual",
    description:
      "Variación porcentual mensual del IPC (Índice de Precios al Consumidor) elaborado por el INDEC (Instituto Nacional de Estadística y Censos), que mide la evolución del costo de una canasta representativa de bienes y servicios. Es el indicador central del ancla nominal de la economía: sobre él se indexan los contratos de alquiler, se negocian las paritarias (acuerdos salariales por sector), se calibra la tasa de política monetaria y se proyecta el tipo de cambio real. Una inflación mensual descendente y sostenida —proceso conocido como desinflación— es condición necesaria para recuperar la demanda de dinero en pesos, reducir el pass-through (traslado de la devaluación a precios) y estabilizar las expectativas inflacionarias.",
  },
  {
    title: "Inflación interanual",
    description:
      "Variación porcentual del IPC (Índice de Precios al Consumidor) respecto del mismo mes del año anterior, elaborada por el INDEC. A diferencia de la inflación mensual, la medición interanual captura el efecto acumulado de doce meses de variaciones de precios, suavizando los shocks transitorios. Es la referencia estándar para comparaciones internacionales, para indexar contratos de largo plazo y para evaluar el desempeño del ancla nominal a lo largo del tiempo. En un proceso de desinflación, la caída del dato interanual es más lenta que la del dato mensual, lo que puede generar un efecto base (base effect) que distorsiona la lectura del momentum inflacionario real.",
  },
  {
    title: "Expectativas de inflación a 12 meses (REM)",
    description:
      "Mediana de las proyecciones de inflación para los próximos doce meses relevadas mensualmente por el BCRA a través del REM (Relevamiento de Expectativas de Mercado), que consolida las estimaciones de bancos, consultoras y centros de investigación. Las expectativas de inflación son un insumo crítico para la política monetaria: cuando están desancladas —es decir, cuando el mercado anticipa una inflación persistentemente alta—, los agentes adelantan aumentos de precios y salarios, generando una profecía autocumplida. La convergencia entre las expectativas del REM y la meta de inflación del BCRA es una señal de credibilidad de la política monetaria.",
  },
  {
    title: "Variación mensual del tipo de cambio",
    description:
      "Mide la depreciación mensual del ARS (peso argentino) frente al USD (dólar estadounidense) en el mercado oficial, operado a través del MULC (Mercado Único y Libre de Cambios). En economías con alto pass-through como Argentina, una depreciación brusca del tipo de cambio nominal se traslada casi de inmediato a precios domésticos, retroalimentando el proceso inflacionario. El TCR (Tipo de Cambio Real), que ajusta el nominal por el diferencial de inflación entre Argentina y sus socios comerciales, determina la competitividad exportadora. La brecha entre el tipo de cambio oficial y los tipos de cambio paralelos —CCL (Contado con Liquidación) y dólar blue— refleja el nivel de represión cambiaria y las expectativas de devaluación del mercado.",
  },
  {
    title: "Brecha cambiaria (CCL / Oficial)",
    description:
      "Diferencia porcentual entre el tipo de cambio CCL (Contado con Liquidación) y el tipo de cambio oficial mayorista. El CCL es el tipo de cambio implícito que surge de comprar un activo financiero en pesos en Argentina —típicamente un bono soberano o una acción de empresa local con ADR— y venderlo en dólares en el exterior. Refleja el precio de mercado del dólar para quienes buscan dolarizar portafolios sorteando el cepo cambiario. Una brecha elevada indica represión cambiaria intensa, señaliza expectativas de devaluación del oficial y desincentiva el ingreso de divisas por exportaciones, ya que los exportadores prefieren liquidar lo mínimo obligatorio y retener el stock esperando una convergencia al alza del oficial.",
  },
  {
    title: "Brecha MEP (Bolsa / Oficial)",
    description:
      "Diferencia porcentual entre el tipo de cambio MEP (Mercado Electrónico de Pagos), también llamado dólar bolsa, y el tipo de cambio oficial. El MEP surge de comprar un bono en pesos en el mercado local y venderlo en dólares dentro del mismo sistema financiero argentino, sin transferir divisas al exterior. A diferencia del CCL, la operación no implica salida de capitales del país, lo que la hace legalmente menos restrictiva. El MEP suele cotizar por debajo del CCL pero por encima del oficial, y su brecha es un indicador de la demanda de cobertura cambiaria de agentes que operan dentro del sistema financiero local.",
  },
  {
    title: "Brecha Mayorista (Mayorista / Oficial)",
    description:
      "Diferencia porcentual entre el tipo de cambio mayorista —el que rige las operaciones interbancarias y de comercio exterior en el MULC— y el tipo de cambio minorista de referencia publicado por el BCRA. Esta brecha captura la segmentación interna del mercado cambiario oficial: los grandes operadores (exportadores, importadores, bancos) acceden al mayorista, mientras que el minorista aplica a personas físicas y pequeñas transacciones. Una brecha mayorista-minorista negativa indica que el mayorista cotiza por debajo del oficial minorista, lo que puede reflejar ajustes estacionales o técnicos en la banda de flotación.",
  },
  {
    title: "Brecha blue (Blue / Oficial)",
    description:
      "Diferencia porcentual entre el tipo de cambio informal —popularmente conocido como dólar blue— y el tipo de cambio oficial minorista. El dólar blue opera en el mercado informal fuera del sistema financiero regulado, sin ningún respaldo institucional, y su precio refleja la demanda de dolarización de sectores que no pueden o no quieren acceder a los canales formales. Históricamente ha sido el indicador más visible de la presión sobre el peso para el público general. Aunque su volumen de transacciones es menor que el CCL, su nivel influye en las expectativas de la población y en la indexación informal de contratos y precios en sectores de la economía real.",
  },
  {
    title: "Reservas internacionales",
    description:
      "El BCRA (Banco Central de la República Argentina) acumula divisas extranjeras —principalmente USD (dólares estadounidenses), DEG (Derechos Especiales de Giro del FMI) y oro— que constituyen el respaldo soberano de la base monetaria. Estas reservas brutas determinan la capacidad de intervención cambiaria del Central y el nivel de cobertura de importaciones, medido en meses de cobertura. Cuando las RIN (Reservas Internacionales Netas, descontados los pasivos en moneda extranjera) caen, el mercado descuenta mayor riesgo de un evento de stress cambiario o default de deuda externa. Un nivel sólido de reservas reduce el riesgo país, comprime el spread soberano y es condición necesaria para sostener cualquier régimen cambiario, ya sea de flotación administrada o convertibilidad.",
  },
  {
    title: "Tasa real mensual en pesos",
    description:
      "Indicador que mide el rendimiento efectivo del ahorro en ARS (pesos argentinos) una vez descontado el efecto erosivo de la inflación. Se construye mensualizado la tasa BADLAR (Buenos Aires Deposits of Large Amount Rate), que es la tasa pasiva promedio que pagan los bancos privados por depósitos a plazo fijo mayoristas de más de $1M a 30-35 días, y aplicando la ecuación de Fisher: tasa real = (1 + TEM) / (1 + π) − 1, donde TEM es la Tasa Efectiva Mensual y π es la inflación mensual. Una tasa real negativa implica que el rendimiento nominal no compensa la pérdida de poder adquisitivo, generando un incentivo estructural a la dolarización de portafolios y presionando sobre las RIN (Reservas Internacionales Netas) del BCRA.",
  },
  {
    title: "Dolarización de depósitos del sector privado",
    description:
      "Proporción de los depósitos bancarios del sector privado denominados en moneda extranjera (principalmente USD) sobre el total de depósitos del sistema financiero. Es un indicador estructural del grado de bimonetarismo de la economía argentina: a mayor porcentaje, mayor es la preferencia por el dólar como reserva de valor y unidad de cuenta en el sector privado. Un incremento sostenido señala pérdida de confianza en el peso como reserva de valor, típicamente asociada a expectativas de devaluación o aceleración inflacionaria. Históricamente, episodios de crisis cambiaria en Argentina han ido precedidos de aumentos pronunciados en este indicador.",
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
            />
          ))}
      </section>
    </section>
  );
}
