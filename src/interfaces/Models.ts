export interface IProduct {
  s: string, // symbol
  st: string,
  b: string, // base asset
  q: string, // quote asset
  ba: string,
  qa: string,
  i: number,
  ts: number,
  an: number,
  qn: number,
  o: number, // open price
  h: number, // high price
  l: number, // low price
  c: number, // latest price
  v: number,
  qv: number, // volume
  y: number,
  as: number,
  pm: string, // parent market
  pn: string, // category of the parent market
  cs: number,
}

export interface IAction {
  type: string
  payload?: any
}
