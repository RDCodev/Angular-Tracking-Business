export type Nullable<T> = { [P in keyof T]?: T[P] | null };

export type PartialBy<T, K extends keyof T> =
  | Partial<Pick<T, Extract<keyof T, K>>> & Omit<T, K> extends infer O
  ? { [P in keyof O]: O[P] }
  : never;

export type NullableBy<T, K extends keyof T> =
  | Nullable<Pick<T, Extract<keyof T, K>>> & Omit<T, K> extends infer O
  ? { [P in keyof O]: O[P] }
  : never;