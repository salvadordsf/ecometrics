import { VarDescription } from "../../main-stats/components/var-description";

export const DEBT_TYPES_DESC = [
  {
    title: "Tarjeta de crédito",
    key: "tarjeta",
    description:
      "Financiamiento rotativo de corto plazo para consumo personal. En moneda local cubre desde compras cotidianas hasta bienes semidurables. En moneda extranjera es marginal y suele corresponder a gastos en el exterior.",
    high: "Los hogares están usando la tarjeta para sostener el nivel de vida. Si crece por encima de la inflación, eleva la exposición a mora cuando suben las tasas.",
    low: "Consumo deprimido o tasas tan altas que desincentivan el financiamiento rotativo.",
    relations: [
      "Comparar con Personales: si ambos crecen juntos, los hogares están muy endeudados para consumo.",
      "Comparar su variación mensual con el IPC: si crece por debajo de inflación, el crédito al consumo se contrae en términos reales.",
    ],
    extraElement: undefined,
  },
  {
    title: "Documentos",
    key: "documentos",
    description:
      "Descuento de cheques, pagarés y facturas de crédito. Principal instrumento de capital de trabajo para empresas. En moneda local financia el ciclo operativo. En moneda extranjera financia comercio exterior: prefinanciación y posfinanciación de exportaciones e importaciones.",
    high: "Las empresas tienen actividad y acceden al crédito para operar. Señal de dinamismo productivo.",
    low: "Contracción de la actividad empresarial o fuga hacia financiamiento no bancario (mercado de capitales, cheques bursátiles).",
    relations: [
      "Comparar con Adelantos: si Adelantos sube y Documentos cae, las empresas recurren a la línea más cara, señal de estrés de liquidez corporativa.",
    ],
    extraElement: undefined,
  },
  {
    title: "Personales",
    key: "personal",
    description:
      "Préstamos sin destino específico a personas físicas, de mediano plazo. En moneda local son la principal fuente de crédito para hogares sin tarjeta o para montos mayores. En moneda extranjera son prácticamente inexistentes por restricciones del BCRA.",
    high: "Si crece junto con el salario real es señal sana. Si crece mientras el salario real cae, los hogares cubren necesidades básicas con deuda — insostenible a mediano plazo.",
    low: "Sistema financiero poco profundo, tasas prohibitivas o demanda deprimida por caída del ingreso esperado.",
    relations: [
      "Cruzar con Tarjeta: si Tarjeta crece y Personales cae, el consumidor prefiere el crédito revolving, señal negativa.",
      "Comparar con salario real para distinguir endeudamiento sano de endeudamiento por necesidad.",
    ],
    extraElement: undefined,
  },
  {
    title: "Adelantos en cuenta",
    key: "adelantos",
    description:
      "Giros en descubierto sobre cuentas corrientes. Instrumento de liquidez inmediata de muy corto plazo y la línea de crédito más cara del sistema. En moneda local es termómetro directo de tensión de liquidez corporativa. En moneda extranjera es muy poco usado.",
    high: "Las empresas no acceden a líneas más baratas y recurren al descubierto. Señal directa de estrés financiero, especialmente si crece más rápido que Documentos.",
    low: "Las empresas tienen liquidez o acceden a instrumentos de financiamiento más baratos.",
    relations: [
      "El ratio Adelantos/Documentos es uno de los mejores indicadores de salud corporativa. Si sube, el crédito productivo se encarece y aumenta el riesgo de corte en la cadena de pagos.",
    ],
    extraElement: undefined,
  },
  {
    title: "Hipotecarios",
    key: "hipotecario",
    description:
      "Créditos para adquisición, construcción o refacción de vivienda, mayormente indexados por UVA. En moneda local reflejan la confianza en la estabilidad macroeconómica futura. En moneda extranjera están prácticamente prohibidos para personas físicas desde 2001.",
    high: "Mercado hipotecario en desarrollo, estabilidad percibida de largo plazo y acceso a la vivienda en expansión.",
    low: "Desconfianza en la estabilidad del peso, tasas reales altas o trauma histórico. Argentina históricamente tiene menos del 1% hipotecarios/PBI vs 10-20% en países vecinos.",
    relations: [
      "Comparar con tipo de cambio real y tasa UVA: si el crédito UVA crece pero el salario real no acompaña, se acumula riesgo de incobrabilidad.",
      "El ratio Hipotecarios/PBI es el benchmark regional para medir profundidad del sistema financiero.",
    ],
    extraElement: undefined,
  },
  {
    title: "Prendarios",
    key: "prendario",
    description:
      "Financiamiento para compra de bienes con garantía real, principalmente vehículos y maquinaria. En moneda local financia consumo de durables del mercado interno. En moneda extranjera financia maquinaria importada para el agro e industria, siendo indicador de inversión productiva.",
    high: "Dinamismo en ventas de bienes durables y confianza del consumidor en el mediano plazo. En USD, señala inversión real en capacidad productiva.",
    low: "Uno de los primeros segmentos en caer ante suba de tasas o caída del ingreso real. Una caída pronunciada anticipa contracción del consumo durable.",
    relations: [
      "Comparar con patentamientos de vehículos (dato público mensual del ACARA) para validar la lectura.",
      "En USD, cruzar con importaciones de bienes de capital del INDEC.",
    ],
    extraElement: undefined,
  },
  {
    title: "Otros",
    key: "otros",
    description:
      "Categoría residual: préstamos con garantía no hipotecaria ni prendaria, líneas subsidiadas del Estado (BICE, FONDEP) y operaciones no clasificables. En moneda extranjera incluye financiamiento de infraestructura y líneas de organismos multilaterales canalizadas por bancos locales.",
    high: "Puede indicar crecimiento de instrumentos no convencionales o financiamiento público canalizado por el sistema. Requiere análisis cualitativo adicional.",
    low: "Normal — esta categoría debería ser residual en un sistema financiero bien segmentado.",
    relations: [
      "Si crece desproporcionadamente sin explicación en otras categorías, puede señalar reclasificaciones contables o surgimiento de nuevos instrumentos aún no segregados por el BCRA.",
    ],
    extraElement: undefined,
  },
];

export const DebtTypesDescription = () => {
  return DEBT_TYPES_DESC.map((type) => (
    <VarDescription
      key={type.key}
      title={type.title}
      description={type.description}
      high={type.high}
      low={type.low}
      relations={type.relations}
      extraElement={type.extraElement}
    />
  ));
};
