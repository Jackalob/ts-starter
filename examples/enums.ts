// enums

enum LoadingState {
  beforeLoad = 'beforeLoad',
  loading = 'loading',
  loaded = 'loaded',
}

const engLoadingState = {
  [LoadingState.beforeLoad]: 'Before Load',
  [LoadingState.loading]: 'Loading',
  [LoadingState.loaded]: 'Loaded',
};

const isLoading = (state: string) => state === LoadingState.loading;

console.log(isLoading(LoadingState.beforeLoad)); // false

// literal types

function rollDice(dice: 1 | 2 | 3): number {
  let pip = 0;
  for (let i = 0; i < dice; i += 1) {
    pip += Math.floor(Math.random() * 5) + 1;
  }
  return pip;
}

// console.log(rollDice(5)) // error 參數只能是 1 or 2 or 3

// literal types with function overloading

function sendEvent(
  name: 'addToCart',
  data: { productId: string; count: number }
): void;
function sendEvent(name: 'checkout', data: { totalPrice: number }): void;
function sendEvent(name: string, data: unknown): void {
  console.log(`${name} ${JSON.stringify(data)}`);
}

sendEvent('addToCart', { productId: '10032', count: 5 });
