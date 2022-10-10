/*
  898 - Includes
  -------
  by null (@kynefuk) #easy #array
  
  ### Question
  
  Implement the JavaScript `Array.includes` function in the type system. A type takes the two arguments. The output should be a boolean `true` or `false`.
  
  For example:
  
  ```ts
  type isPillarMen = Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Dio'> // expected to be `false`
  ```
  
  > View on GitHub: https://tsch.js.org/898
*/


/* _____________ Your Code Here _____________ */

// Nice attempt but unfortunately cannot deal with "false extends boolean"/"boolean extends false"
// type Includes<T extends readonly any[], U> = T extends [infer V, ...any]
//   ? (V extends U ? true : Includes<List.Tail<T>, U>)
//   : false;
import { List, Any } from 'ts-toolbelt';

type Includes<T extends readonly any[], U> = T extends [infer V, ... infer Rest]
  ? (Any.Equals<U, V> extends 1 ? true : Includes<Rest, U>)
  : false;

let a : List.Includes<[1, 2, 3], 2, "default">

// Nice attempt but face with the same problem
// type Includes<T extends readonly any[], U> = U extends T[number] ? true : false;
// type Includes<T extends readonly any[], U> = (T[number] & U) extends never ? false : true;

// Nice attempt but doesn't work with "false"
// type Includes<T extends readonly any[], U> = {
//   [P in T[number]]: true
// }[U] extends true ? true : false;

// Implementation of Equal (TS core provided 1 already)
// type IsEqual<T, U> =
// 	(<G>() => G extends T ? 1 : 2) extends
// 	(<G>() => G extends U ? 1 : 2)
// 		? true
// 		: false;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Kars'>, true>>,
  Expect<Equal<Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Dio'>, false>>,
  Expect<Equal<Includes<[1, 2, 3, 5, 6, 7], 7>, true>>,
  Expect<Equal<Includes<[1, 2, 3, 5, 6, 7], 4>, false>>,
  Expect<Equal<Includes<[1, 2, 3], 2>, true>>,
  Expect<Equal<List.Includes<[1, 2, 3], 2>, 1>>,
  Expect<Equal<Includes<[1, 2, 3], 1>, true>>,
  Expect<Equal<Includes<[{}], { a: 'A' }>, false>>,
  Expect<Equal<Includes<[boolean, 2, 3, 5, 6, 7], false>, false>>,
  Expect<Equal<Includes<[true, 2, 3, 5, 6, 7], boolean>, false>>,
  Expect<Equal<List.Includes<[true, 2, 3, 5, 6, 7], boolean, "equals">, 0>>,
  Expect<Equal<Includes<[false, 2, 3, 5, 6, 7], false>, true>>,
  Expect<Equal<Includes<[{ a: 'A' }], { readonly a: 'A' }>, false>>,
  Expect<Equal<Includes<[{ readonly a: 'A' }], { a: 'A' }>, false>>,
  Expect<Equal<Includes<[1], 1 | 2>, false>>,
  Expect<Equal<Includes<[1 | 2], 1>, false>>,
  Expect<Equal<List.Includes<[1 | 2], 1, "equals">, 0>>,
  Expect<Equal<Includes<[null], undefined>, false>>,
  Expect<Equal<Includes<[undefined], null>, false>>,
]



/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/898/answer
  > View solutions: https://tsch.js.org/898/solutions
  > More Challenges: https://tsch.js.org
*/

