# Typescript Challenges

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

Having fun with [ts-toolbelt](https://github.com/millsp/ts-toolbelt) and [type-challenges](https://github.com/type-challenges/type-challenges)

## Notes

General hacks:
- `T1 extends T2 ? T3 : T4`
<!-- - Paired `extends` with logical operators `||` and `&&` -->
- `never` (for a "soft" throw); `extends` in generics or `(arg: T)` in params (for "hard" throw)
- generics: `<T1 extends T2>` or `<T1>`. Either make arg typed as the generic param e.g. `arg : T1` in order to setup for a "hard" throw, or let user pass in whatever type they want as the generic arg
- `unknown` (type-safe, assume the worst in any type situation, pessimistic) vs `any` (non type-safe, assume the best in any type situation, optimistic)

Approaches to problem:
- Recursion: a **MUST** if indefinitely something
- Create another type function: a **MUST** if want to include logics inside params (and potential throw "hard" error)

You might not have to write it yourself! Common utility functions are provided by TS-core and also libraries like `ts-toolbelt`

### Object/Interface

Hacks:
- `&`, `|` (the union and intersection for types)
- `keyof TObj` (return Union of `TObj`'s keys, good to paired with `in`)
- `keyof any` (the union of all possible key types i.e. `string | symbol | number`)
- `{ [key in keyof TObj]: T[key] }` (like list comprehension)
- `T1 extends T2` means `T1` has all of `T2` properties
<!-- - `...` for spreading -->
<!-- - `keyof T extends never` (checking if `T` is an object) -->

### List

Hacks:
- `TList[number]` or `TList['length']`, `TList[0]`, `TList[1]`, etc
- `...` for spreading
- Paired `extends` with `infer T` and `...` to capture the type of head or tail or the list (like pattern matching)

#### Tuple

Tuple is equiv to an immutable `List` (`readonly List`). Its size and elements can be deduced by TS (just like using `as const`).

### Union

Can only be 1 of the type at anypoint in time.

Hacks:
- `extends` means **IS** with Union types
- `|` and `&`
- `in TUnion`

### Functions

Hacks:
- `extends` with `infer` to pattern match, just like with List