export interface IINDECResponse {
  data: any[][]
  count: number
  meta: Meum[]
  params: Params
}

export interface Meum {
  frequency?: string
  start_date?: string
  end_date?: string
  catalog?: Catalog
  dataset?: Dataset
  distribution?: Distribution
  field?: Field
}

export interface Catalog {
  title: string
}

export interface Dataset {
  title: string
  description: string
  issued: string
  source: string
}

export interface Distribution {
  title: string
  downloadURL: string
}

export interface Field {
  description: string
  id: string
  units: string
  representation_mode: string
  representation_mode_units: string
}

export interface Params {
  ids: string
  start_date: string
  sort: string
  representation_mode: string
  identifiers: Identifier[]
}

export interface Identifier {
  id: string
  distribution: string
  dataset: string
}
