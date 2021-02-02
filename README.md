# event-maker

Very simple event emitter.

## Feature

- A single event object per an event
- Tiny code base - less 1kb
- Written by TypeScript

## Install

Install with [npm](https://www.npmjs.com/):

    npm i @ncukondo/event-maker

Requirement: ECMAScript 2015 because this library use [`Map`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Map).

## Usage

Create an event object and register handler and invoke handlers.

```ts
import { makeEvent } from "@ncukondo/event-maker";

const onEvent1 = makeEvent();
// Register a handler
onEvent1(() => {
  console.log(1);
});
// Register an once only handler
onEvent1.once(() => {
  console.log(2);
});
// Invoke handler
onEvent1.emit(); // 1,2
onEvent1.emit(); // 1
// Unregister handler
onEvent1.clear();
```

You can pass payload to the event.

```ts
const onEvent2 = makeEvent<{ payload: string }>();
// Register handler
onEvent2((value) => {
  console.log(1, value.payload);
});
onEvent2((value) => {
  console.log(2, value.payload);
});
// Invoke handler
onEvent2.emit({
  payload: "value"  //1 value, 2 value
});
// Unregister handler
onEvent2.clear();
```

You also can pass multiple paramaters to the event.

```ts
const onEvent3 = makeEvent<[type:string,message:string]>();
// Register handler
onEvent3((type,message) => {
  console.log(1, `eventType:${type} message:${message}`);
});
// Invoke handler
onEvent3.emit("customEvent1","some message"); // eventType:customEvent1 message:some message
// Unregister handler
onEvent3.clear();
```

## API

```ts
declare type ToArgsType<T> = T extends Array<unknown> ? T : readonly [T];
declare type EventHandler<T> = (...args: ToArgsType<T>) => unknown;
declare type Eventemitter<T> = {
    /**
     * Register an event handler
     */
    (handler: EventHandler<T>): void;
    /**
     * Register an once only event handler
     */
    once: (handler: EventHandler<T>) => void;
    /**
     * Remove an event handler
     */
    remove: (handler: EventHandler<T>) => void;
    /**
     * Remove all event handlers
     */
    clear: () => void;
    /**
     * Invoke all handlers
     */
    emit: (...value: ToArgsType<T>) => void;
};
declare const makeEvent: <T extends unknown = []>() => Eventemitter<T>;
export { makeEvent };
export type { EventHandler, Eventemitter };
```

## Changelog

See [Releases page](https://github.com/ncukondo/event-maker/releases).

## Running tests

Install devDependencies and Run `npm test`:

    npm test


## Author

- [github/ncukondo](https://github.com/ncukondo)

## License

MIT

## Related

- [eventmit: A single event object per the event.](https://github.com/azu/eventmit)
- [developit/mitt: 🥊 Tiny 200 byte functional event emitter / pubsub.](https://github.com/developit/mitt)
    - Support multiple event type
