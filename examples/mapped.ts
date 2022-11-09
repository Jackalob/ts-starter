// type MyFlexibleDogInfo = {
//     name: string
// } & Record<string, string | number>

type MyFlexibleDogInfo = {
  name: string;
  [key: string]: string | number;
};

// 兩個 MyFlexibleDogInfo 是等價的，這個 type 規定物件內一定要有 name 這個屬性，剩下的沒有強制規定

const dog: MyFlexibleDogInfo = {
  name: 'LG',
  breed: 'Mutt',
  age: 5,
};

// ---

type DogInfo = {
  name: string;
  age: number;
};

type OptionsFlags<Type> = {
  [Property in keyof Type]: boolean;
};

type DogInfoOptions = OptionsFlags<DogInfo>;

// ---

type Listeners<Type> = {
  [Property in keyof Type as `on${Capitalize<Property & string>}Change`]?: (
    newValue: Type[Property]
  ) => void;
} & {
  [Property in keyof Type as `on${Capitalize<
    Property & string
  >}Delete`]?: () => void;
};

function listenToObject<T>(obj: T, listeners: Listeners<T>): void {
  // need to be implemented;
}

const dog1: DogInfo = {
  name: 'Yat',
  age: 5,
};

// 查看 Listeners<DogInfo> 的 type
type X = Listeners<DogInfo>;

listenToObject(dog1, {
  onNameChange: (v: string) => {},
  onAgeChange: (v: number) => {},
});
