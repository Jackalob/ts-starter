function myForEach<T>(arr: T[], callback: (v: T) => void): void {
  arr.reduce((a, c) => {
    callback(c);
    return null;
  }, null);
}

myForEach([1, 2, 3, 4], (v) => console.log(v));
// 1
// 2
// 3
// 4

function myFilter<T>(arr: T[], callback: (v: T) => boolean): T[] {
  return arr.reduce((a, c) => (callback(c) ? [...a, c] : a), [] as T[]);
}

console.log(myFilter([1, 2, 3, 4], (v) => v >= 3)); // [3, 4]

function myMap<T, K>(arr: T[], callback: (v: T) => K): K[] {
  return arr.reduce((a, c) => [...a, callback(c)], [] as K[]);
}

console.log(myMap([1, 2, 3, 4], (v) => (v * 10).toString())); // ["10", "20", "30", "40"]
