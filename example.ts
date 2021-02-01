import { makeEvent } from "./src/eventMaker";

const onEvent1 = makeEvent();
// Register handler
onEvent1(() => {
  console.log(1);
});
onEvent1.once(() => {
  console.log(2);
});
// Invoke handler
onEvent1.emit(); // 1,2
onEvent1.emit(); // 1
// Unregister handler
onEvent1.clear();

const onEvent2 = makeEvent<{ key: string }>();
// Register handler
onEvent2((value) => {
  console.log(1, value);
});
onEvent2((value) => {
  console.log(2, value);
});
// Invoke handler
onEvent2.emit({
  key: "value"  //1 value, 2 value
});
// Unregister handler
onEvent2.clear();


const onEvent3 = makeEvent<[type:string,message:string]>();
// Register handler
onEvent3((type,message) => {
  console.log(1, `eventType:${type} message:${message}`);
});
// Invoke handler
onEvent3.emit("customEvent1","some message");
// Unregister handler
onEvent3.clear();
