// Partial<T> 讓傳進去的 T 所有的 key 都變為 optional
type Info = {
  id: string;
  name: string;
  email?: string;
};

// type InfoOptions = {
//     id?: string;
//     name?: string
//     email?: string
// }
// 透過 Partial 就不用維護兩份 types

type InfoOptions = Partial<Info>;

function mergeInfo(info: Info, overrides: InfoOptions) {
  return {
    ...info,
    ...overrides,
  };
}

console.log(
  mergeInfo(
    { id: '003', name: 'Lee', email: 'lin.o@gmt.com' },
    { email: 'leeo@gmt.com' }
  )
);
// { id: '003', name: 'Lee', email: 'leeo@gmt.com' }

// Require<T> T 內部全部的 key 都為必要
type RequireInfo = Required<Info>;

// Pick<T, keyof T> 選取 T 其中的 key
type NameAndEmail = Pick<Info, 'name' | 'email'>;

// Omit<T, string> 移除 string 的 key
type InfoWithoutId = Omit<Info, 'id'>;

// Record<Key, T> 回傳一個以 groupBy key 的 object T
// 這邊例子限定回傳的 groupBy 的 key 一定要是 Info["id"] 的 type，也就是 string，但並沒有規定 key 只能是 "id"
// 即使 key 是 "name"，回傳的值是 {chad: { email: 'chad1@gma.com' }, todd: {}} 也會 pass
type MapByIdType = Record<Info['id'], InfoWithoutId>;

function mapById(infos: Info[]): MapByIdType {
  return infos.reduce((a, c) => {
    const { id, ...rest } = c;
    return {
      ...a,
      id: rest,
    };
  }, {});
}

const infos: Info[] = [
  { id: '1', name: 'chad', email: 'chad1@gma.com' },
  { id: '2', name: 'todd' },
];

console.log(mapById(infos));
