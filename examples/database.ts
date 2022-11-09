/* eslint-disable max-classes-per-file */

interface Database<K, T> {
  get(id: K): T;
  set(id: K, value: T): void;
}

interface Persistable {
  saveToString(): string;
  restoreFromString(storedState: string): void;
}

type DBKeyType = string | number | symbol;

class InMemoryDatabase<K extends DBKeyType, T> implements Database<K, T> {
  protected db: Record<K, T> = {} as Record<K, T>;

  get(id: K): T {
    return this.db[id];
  }

  set(id: K, value: T): void {
    this.db[id] = value;
  }
}

class PersistentMemoryDB<K extends DBKeyType, T>
  extends InMemoryDatabase<K, T>
  implements Persistable
{
  saveToString(): string {
    return JSON.stringify(this.db);
  }

  restoreFromString(storedState: string) {
    this.db = JSON.parse(storedState);
  }
}

const myDB = new PersistentMemoryDB<string, number>();
myDB.set('foo', 100);
const saved = myDB.saveToString();
console.log(myDB.get('foo'));

myDB.set('foo', 200);
console.log(myDB.get('foo'));

const myDB2 = new PersistentMemoryDB<string, number>();
myDB2.restoreFromString(saved);
console.log(myDB2.get('foo'));
