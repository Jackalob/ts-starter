// 第二個參數的 generic 會是第一個參數的 keys

function pluck<DataType, KeyType extends keyof DataType>(
  items: DataType[],
  key: KeyType
) {
  return items.map((item) => item[key]);
}

const dogs = [
  { name: 'Co', age: 5 },
  { name: 'Bowa', age: 4 },
];

console.log(pluck(dogs, 'name')); // ["Co", "Bowa"]

interface BaseEvent {
  time: number;
  user: string;
}

interface EventMap {
  addToCart: BaseEvent & { quantity: number; productID: string };
  checkout: BaseEvent;
}

function sendEvent<Name extends keyof EventMap>(
  name: Name,
  data: EventMap[Name]
) {
  console.log([name, data]);
}

// sendEvent 等價於 sendEvent2
// function sendEvent2(name: keyof EventMap, data: EventMap[keyof EventMap]) {
//   console.log([name, data]);
// }

sendEvent('checkout', { time: 1023, user: 'Bob' }); // ["checkout", { "time": 1023, "user": "Bob" }]
