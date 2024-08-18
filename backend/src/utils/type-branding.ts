declare const _brand: unique symbol;

type Brand<B> = { [_brand]: B };
export type Branded<T, B> = T & Brand<B>;

export function createBranded<T, B>(value: T): Branded<T, B> {
  return value as Branded<T, B>;
}
