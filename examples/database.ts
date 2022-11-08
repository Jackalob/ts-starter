/* eslint-disable max-classes-per-file */

interface Database {
  get(id: string): string;
  set(id: string, value: string): void;
}

interface Persistable {
  saveToString(): string;
  restoreFromString(storedState: string): void;
}

class InMemoryDatabase implements Database {
  protected db: Record<string, string> = {};

  get(id: string) {
    return this.db[id];
  }

  set(id: string, value: string) {
    this.db[id] = value;
  }
}

class PersistentMemoryDB extends InMemoryDatabase implements Persistable {
  saveToString(): string {
    return JSON.stringify(this.db);
  }

  restoreFromString(storedState: string) {
    this.db = JSON.parse(storedState);
  }
}

const myDB = new PersistentMemoryDB();
myDB.set('foo', 'bar');
const saved = myDB.saveToString();
console.log(myDB.get('foo'));

myDB.set('foo', 'new bar');
console.log(myDB.get('foo'));

const myDB2 = new PersistentMemoryDB();
myDB2.restoreFromString(saved);
console.log(myDB2.get('foo'));
