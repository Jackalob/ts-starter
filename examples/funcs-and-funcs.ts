function printToFile(text: string, callback: () => void) {
  console.log(text);
  callback();
}

type MutateFn = (v: number) => number;

function arrayMutate(numbers: number[], mutate: MutateFn) {
  return numbers.map(mutate);
}

console.log(arrayMutate([1, 2, 3], (v) => v * 10)); // [10, 20, 30]

const myMutateFn: MutateFn = (v) => v + 1001;

function createAdder(num: number) {
  return (value: number) => num + value;
}

const addTwo = createAdder(2);
console.log(addTwo(5)); // 7
