/*
  12 - Chainable Options
  -------
  by Anthony Fu (@antfu) #medium #application
  
  ### Question
  
  Chainable options are commonly used in Javascript. But when we switch to TypeScript, can you properly type it?
  
  In this challenge, you need to type an object or a class - whatever you like - to provide two function `option(key, value)` and `get()`. In `option`, you can extend the current config type by the given key and value. We should about to access the final result via `get`.
  
  For example
  
  ```ts
  declare const config: Chainable
  
  const result = config
    .option('foo', 123)
    .option('name', 'type-challenges')
    .option('bar', { value: 'Hello World' })
    .get()
  
  // expect the type of result to be:
  interface Result {
    foo: number
    name: string
    bar: {
      value: string
    }
  }
  ```
  
  You don't need to write any js/ts logic to handle the problem - just in type level. 
  
  You can assume that `key` only accepts `string` and the `value` can be anything - just leave it as-is. Same `key` won't be passed twice.
  
  > View on GitHub: https://tsch.js.org/12
*/


/* _____________ Your Code Here _____________ */

// type Chainable = {
//   option(key: string, value: any): unknown
//   get(): any
// }

type Chainable<T extends {} = {}> = {
  // either string | number | symbol
  // [k in K] computed property with generics
  // needs error so must do it in param/generics
  // option<K extends keyof any, V>(key: K, value: V): Union.Has<keyof T, K> extends 1
  //   ? never
  //   : Chainable<T & { [k in K]: V }>

  // Work for case 1 & 2
  // Need to get K and V to work tgt
  // option<K extends Union.Exclude<keyof any, keyof T>, V>(key: K, value: V): Chainable<T & { [k in K]: V }>

  // Weirdly cannot exclude existing keys
  // And Omit is in the wrong place
  // option<K extends Union.Exclude<keyof any, keyof T>, V>(key: K, value: V): Chainable<Omit<T, K> & Record<K, V>>

  option<K extends keyof any, V>(key: IsChainable<K, V, T>, value: V): Chainable<Omit<T, K> & Record<K, V>>
  get(): T
}

type IsChainable<K extends keyof any, V, T extends {}> =
  K extends keyof T
    ? V extends T[K]  // T has the key K and T[K] is V
      ? never
      : K
    : K

// type ChainableKey<K, V, T> = K extends keyof T
// ? V extends T[K]
//   ? never
//   : K
// : K

// type Chainable<T={}> = {
//   option<K extends string, V>(
//     key: ChainableKey<K, V, T>,
//     value: V
//     ): Chainable<Omit<T, K> & Record<K, V>>
//   get(): T
// }

/* _____________ Test Cases _____________ */
import type { Alike, Expect } from '@type-challenges/utils'
import { Union } from 'ts-toolbelt'

declare const a: Chainable

const result1 = a
  .option('foo', 123)
  .option('bar', { value: 'Hello World' })
  .option('name', 'type-challenges')
  .get()

const result2 = a
  .option('name', 'another name')
  // @ts-expect-error
  .option('name', 'last name')
  .get()

const result3 = a
  .option('name', 'another name')
  .option('name', 123)
  .get()

type cases = [
  Expect<Alike<typeof result1, Expected1>>,
  Expect<Alike<typeof result2, Expected2>>,
  Expect<Alike<typeof result3, Expected3>>,
]

type Expected1 = {
  foo: number
  bar: {
    value: string
  }
  name: string
}

type Expected2 = {
  name: string
}

type Expected3 = {
  name: number
}



/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/12/answer
  > View solutions: https://tsch.js.org/12/solutions
  > More Challenges: https://tsch.js.org
*/

