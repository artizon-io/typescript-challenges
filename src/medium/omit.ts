/*
  3 - Omit
  -------
  by Anthony Fu (@antfu) #medium #union #built-in
  
  ### Question
  
  Implement the built-in `Omit<T, K>` generic without using it.
  
  Constructs a type by picking all properties from `T` and then removing `K`
  
  For example
  
  ```ts
  interface Todo {
    title: string
    description: string
    completed: boolean
  }
  
  type TodoPreview = MyOmit<Todo, 'description' | 'title'>
  
  const todo: TodoPreview = {
    completed: false,
  }
  ```
  
  > View on GitHub: https://tsch.js.org/3
*/


/* _____________ Your Code Here _____________ */

import { Any, Union, Object } from 'ts-toolbelt';

// Nice attempt but field turns out to be never/undefined
// type MyOmit<T extends {}, K extends keyof T> = {
//   [key in keyof T]: Any.Equals<key, K> extends 1 ? never : T[key];
// }

// type MyOmit<T extends {}, K extends keyof T> = T[K];

type MyOmit<T extends {}, K extends keyof T> = {
  // [key in (keyof T extends K ? never : keyof T)]: T[key];  // doesn't work
  // [key in (keyof T extends infer U  // using infer here to "capture" the value of keyof T
  //   ? U extends K
  //     ? never
  //     : U extends keyof T ? U : never  // keyof T is U, but U isn't necessarily T
  //   : never
  // )]: T[key];
  [key in Union.Exclude<keyof T, K>]: T[key];
};

// type MyOmit<T extends {}, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

type a = MyOmit<Todo, 'description'>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Expected1, MyOmit<Todo, 'description'>>>,
  Expect<Equal<Expected1, Object.Omit<Todo, 'description'>>>,
  Expect<Equal<Expected2, MyOmit<Todo, 'description' | 'completed'>>>,
  Expect<Equal<Expected2, Object.Omit<Todo, 'description' | 'completed'>>>,
]

// @ts-expect-error
type error = MyOmit<Todo, 'description' | 'invalid'>
// @ts-expect-error
type error = Object.Omit<Todo, 'description' | 'invalid'>

interface Todo {
  title: string
  description: string
  completed: boolean
}

interface Expected1 {
  title: string
  completed: boolean
}

interface Expected2 {
  title: string
}



/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/3/answer
  > View solutions: https://tsch.js.org/3/solutions
  > More Challenges: https://tsch.js.org
*/

