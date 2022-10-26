function simpleState<T>(initial: T): [() => T, (value: T) => void] {
  let state: T = initial;
  return [
    () => state,
    (value: T) => {
      state = value;
    },
  ];
}

const [getState, setState] = simpleState<string | null>(null);
// simpleState<string | null>(null); 原本 simpleState 的 T 是 null，透過 <string | null> 把 type 覆蓋成 string or null

console.log(getState()); // null

setState('劉董');

console.log(getState()); // 劉董

interface Rank<RankItem> {
  item: RankItem;
  rank: number;
}

function ranker<T>(items: T[], rankFn: (value: T) => number) {
  const ranks: Rank<T>[] = items.map((item) => ({ item, rank: rankFn(item) }));
  ranks.sort((a, b) => a.rank - b.rank);
  return ranks.map((rank) => rank.item);
}

interface Pokemon {
  name: string;
  hp: number;
}

const pokemons: Pokemon[] = [
  { name: 'A', hp: 10 },
  { name: 'B', hp: 20 },
  { name: 'C', hp: 5 },
];

const ans = ranker(pokemons, ({ hp }) => hp);
console.log(ans); // [{ name: 'C', hp: 5 }, { name: 'A', hp: 10 }, { name: 'B', hp: 20 }]

export {};
