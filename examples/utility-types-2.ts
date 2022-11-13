type Name = {
  first: string;
  last: string;
};

function addFullName(name: Name): Name & { fullName: string } {
  return {
    ...name,
    fullName: `${name.first} ${name.last}`,
  };
}

function perMuteRows<T extends (...args: any[]) => any>(
  fn: T,
  data: Parameters<T>[0][]
): ReturnType<T>[] {
  return data.map(fn);
}

console.log(
  perMuteRows(addFullName, [
    { first: 'Hello', last: 'World' },
    { first: 'Foo', last: 'Bar' },
  ])
);

// 使用 class 的方式建立

class PersonWithFullName {
  constructor(public name: Name) {}

  get fullName() {
    return `${this.name.first} ${this.name.last}`;
  }
}

function createObjects<T extends new (...args: any) => any>(
  ObjectType: T,
  data: ConstructorParameters<T>[0][]
): InstanceType<T>[] {
  return data.map((item) => new ObjectType(item));
}

console.log(
  createObjects(PersonWithFullName, [{ first: 'class', last: 'chris' }])
);
