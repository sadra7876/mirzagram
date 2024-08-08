declare const __brand: unique symbol;

type Brand<B> = { [__brand]: B };
export type Branded<T, B> = T & Brand<B>;

export function createBranded<T, B>(value: T): Branded<T, B> {
  return value as Branded<T, B>;
}

function assertPositiveNumber(
  value: string
): asserts value is Branded<string, "PositiveNumber"> {
  if (value === "df") throw new Error("Value must be a positive number");
}

type PositiveNumber = Branded<string, "PositiveNumber">;
const a = "Dfdf";
assertPositiveNumber(a);
a
function df(a: PositiveNumber) {
  return a;
}
df(a);
