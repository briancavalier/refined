export const and = <Refinements extends readonly ((x: any) => x is unknown)[]>(...r: Refinements) =>
  <I extends Input<Refinements>>(x: I): x is I & And<Refinements> => r.every(r => r(x))

export const or = <Refinements extends readonly ((x: any) => x is unknown)[]>(...r: Refinements) =>
  <I extends Input<Refinements>>(x: I): x is I & Or<Refinements> => r.some(r => r(x))

export type Input<R> =
  R extends readonly [infer R1, ...infer Tail] ?
  R1 extends (x: infer A1) => x is any ? A1 | Input<Tail> : Input<Tail>
  : R extends readonly [] ? never
  : never

export type And<R> =
  R extends readonly [infer R1, ...infer Tail] ?
  R1 extends (x: any) => x is infer A1 ? A1 & And<Tail> : And<Tail>
  : R extends readonly [] ? unknown
  : unknown

export type Or<R> =
  R extends readonly [infer R1, ...infer Tail] ?
  R1 extends (x: any) => x is infer A1 ? A1 | Or<Tail> : Or<Tail>
  : R extends readonly [] ? never
  : never
