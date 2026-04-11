import { IclRecord } from "../services/ICL/types/icl-types";
import { InflationRecord } from "../services/INFLATION/types/inflation-types";

export type AnyRecord = InflationRecord | IclRecord | [string, number];
