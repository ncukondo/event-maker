import { makeEvent, EventHandler } from "../src/eventMaker";
import assert from "assert";

describe("eventmit", function () {
  it("emit payload and handler receive the payload", () => {
    const caller: [number, string][] = [];
    const onEvent = makeEvent<string>();
    onEvent((value) => caller.push([1, value]));
    onEvent((value) => caller.push([2, value]));
    const payload = "payload value";
    onEvent.emit(payload);
    assert.deepStrictEqual(caller, [
      [1, payload],
      [2, payload],
    ]);
  });
  it("unregister handler", () => {
    const caller: [number, string][] = [];
    const onEvent = makeEvent<string>();
    const handler: EventHandler<string> = (value) => caller.push([1, value]);
    onEvent(handler);
    onEvent.emit("payload 1");
    assert.deepStrictEqual(caller, [[1, "payload 1"]]);
    onEvent.remove(handler);
    onEvent.emit("payload 2");
    assert.deepStrictEqual(caller, [[1, "payload 1"]]);
  });
  it("unregister all handler", () => {
    const caller: [number, string][] = [];
    const onEvent = makeEvent<string>();
    const handler1: EventHandler<string> = (value) => caller.push([1, value]);
    const handler2: EventHandler<string> = (value) => caller.push([2, value]);
    onEvent(handler1);
    onEvent(handler2);
    onEvent.emit("payload");
    assert.deepStrictEqual(caller, [
      [1, "payload"],
      [2, "payload"],
    ]);
    onEvent.clear();
    onEvent.emit("payload 2");
    assert.deepStrictEqual(caller, [
      [1, "payload"],
      [2, "payload"],
    ]);
  });
});
