import { VarDescription } from "../../main-stats/components/var-description";

const DEBT_TYPES_DESC = [
  {
    title: "Tarjeta de crédito",
    description:
      "Financiamiento de corto plazo para consumo personal. Refleja la demanda de crédito minorista y es sensible a la tasa de interés y al nivel de actividad económica. Un peso elevado en la cartera indica alta dependencia del consumo financiado y mayor exposición a mora en contextos de suba de tasas. Si supera el 20% del total, señala una economía con fuerte componente de consumo a crédito.",
  },
  {
    title: "Documentos",
    description:
      "Descuento de cheques y pagarés. Es el principal instrumento de financiamiento de capital de trabajo para empresas, especialmente pymes. En la cartera en USD representa financiamiento de comercio exterior. Un peso alto indica que las empresas dependen del crédito bancario para operar, lo que es normal en economías con mercados de capitales poco desarrollados. Una caída sostenida señala contracción de la actividad productiva.",
  },
  {
    title: "Personales",
    description:
      "Préstamos sin destino específico otorgados a personas físicas. Su evolución refleja el acceso al crédito de los hogares y la capacidad de consumo de las familias. Un porcentaje alto respecto al total sugiere que los hogares cubren necesidades básicas con deuda, lo que puede ser señal de deterioro del salario real. Un nivel bajo indica que el crédito personal es inaccesible o que la demanda está deprimida.",
  },
  {
    title: "Adelantos en cuenta",
    description:
      "Giros en descubierto sobre cuentas corrientes. Instrumento de liquidez inmediata para empresas, de muy corto plazo y típicamente la línea de crédito más cara del sistema. Un peso elevado respecto a documentos o personales indica tensión de liquidez en el sector corporativo: las empresas recurren a la línea más costosa porque no acceden a financiamiento más barato. Es una señal de estrés financiero empresarial.",
  },
  {
    title: "Hipotecarios",
    description:
      "Créditos para la adquisición o construcción de vivienda, mayormente indexados por UVA. Su nivel refleja el acceso a la vivienda y la confianza de largo plazo en la estabilidad económica. Un peso bajo —como el histórico argentino— indica que el mercado hipotecario está subdesarrollado respecto a la región. Un crecimiento sostenido es una señal positiva de estabilización macroeconómica y recuperación de la confianza.",
  },
  {
    title: "Prendarios",
    description:
      "Financiamiento para la compra de bienes con garantía real, principalmente vehículos. Es un indicador del consumo de bienes durables y de la confianza del consumidor. Un nivel alto respecto al total sugiere dinamismo en la venta de autos y bienes durables. Una caída pronunciada anticipa contracción del consumo durable, típicamente uno de los primeros sectores en resentirse ante subas de tasas o caída del ingreso real.",
  },
  {
    title: "Otros",
    description:
      "Líneas residuales que incluyen préstamos con garantía real, financiamiento a entidades financieras y operaciones que no clasifican en las categorías anteriores. Un peso elevado de esta categoría puede indicar falta de granularidad en los datos o crecimiento de instrumentos no convencionales.",
  },
];

export const DebtTypesDescription = () => {
  return DEBT_TYPES_DESC.map((types) => (
    <VarDescription
      title={types.title}
      description={types.description}
      key={types.title}
    />
  ));
};
