function createSimpleDB<T>() {
  return class SimpleDB {
    private db: Record<string, T> = {};

    set(key: string, value: T): void {
      this.db[key] = value;
    }

    get(key: string): T {
      return this.db[key];
    }

    getDBContent(): object {
      return this.db;
    }
  };
}

const StringDB = createSimpleDB<string>();

const sdb1 = new StringDB();
sdb1.set('foo', 'a');

// 透過 mixin 建立一個新的 class
// 新的 class 會包含傳進去 class 原有的內容再加上 dump function

type Constructor<T> = new (...args: any[]) => T; // 定義一個會回傳含 T 的 instance 的 type

function createDumpable<T extends Constructor<{ getDBContent(): object }>>(
  Base: T
) {
  return class Dumpable extends Base {
    dump() {
      console.log(this.getDBContent());
    }
  };
}

const DumpableStringDB = createDumpable(StringDB);
const sdb2 = new DumpableStringDB();
sdb2.set('name', 'Jack');
sdb2.dump();
