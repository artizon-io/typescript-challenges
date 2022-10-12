// https://stackoverflow.com/questions/74040584/how-to-exhaustive-check-the-elements-in-an-array-in-typescript/74043329#74043329

type Country = "uk" | "france" | "india";

// export const data: Record<Country, boolean> = {
//   uk: true,
//   france: true,
//   // complains that india is not present, excellent!
// };

import { List, Union } from "ts-toolbelt";

type GetData<TCountries extends string[]> = List.Length<TCountries> extends 0
  ? []
  : List.Append<GetData<List.Pop<TCountries>>, {
    value: List.Last<TCountries>
  }>;

type a = GetData<['a', 'b']>
type b = Union.Pop<'a'>
type c = Union.Pop<'a'>

// Converting to List because I cannot reliably check if anything extends never
// @ts-expect-error
export const data : GetData<Union.ListOf<Country>> = [
  {value: "uk"},
  {value: "france"},
  // how to make typescript complain here that I forgot to add {value: "india"}?
];
