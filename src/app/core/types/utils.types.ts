/**
 * Make some properties of an interface optional.
 */
export type PartialBy<T, K extends keyof T> =
  | Partial<Pick<T, Extract<keyof T, K>>> & Omit<T, K> extends infer O
  ? { [P in keyof O]: O[P] }
  : never;

export interface Contoso {
    username: string;
    password: string;
    email: string;
}

type contosoExtract = Extract<keyof Contoso, 'password' | 'email'>

const contoso: contosoExtract = "password";