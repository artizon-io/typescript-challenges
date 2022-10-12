type GetEvent<TTarget extends string> =
  TTarget extends 'document'
    ? keyof DocumentEventMap
    : TTarget extends 'window'
      ? keyof WindowEventMap
      : never;

// Workaround
// type GetCallback<TTarget extends string, TEvent extends GetEvent<TTarget>> =
//   TTarget extends 'document'
//     ? TEvent extends keyof DocumentEventMap ? (e: DocumentEventMap[TEvent]) => void : never
//     : TTarget extends 'window'
//       ? TEvent extends keyof WindowEventMap ? (e: WindowEventMap[TEvent]) => void : never
//       : never;

// Desired solution
// TEvent is keyof DocumentEventMap if TTarget extends 'document', TS fails to acknowledge
type GetCallback<TTarget extends string, TEvent extends GetEvent<TTarget>> =
  TTarget extends 'document'
    ? (e: DocumentEventMap[TEvent]) => void
    : TTarget extends 'window'
      ? (e: WindowEventMap[TEvent]) => void
      : never;

function register<TTarget extends 'document' | 'window', TEvent extends GetEvent<TTarget>, TCallback extends GetCallback<TTarget, TEvent>>(target: TTarget, event: TEvent, callback: TCallback) {
  // ...
}