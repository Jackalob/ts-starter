type Prdouct = {
  name: string;
  brand: string;
};

// Readonly<T> 讓 T 內部的屬性都變成是 readonly
// 等於 type ReadonlyProduct = {
//     readonly name: string;
//     readonly brand: string
// }
type ReadonlyProduct = Readonly<Prdouct>;

function createProduct(name: string, brand: string): Readonly<Prdouct> {
  return {
    name,
    brand,
  };
}

const product = createProduct('dryer', 'panasoic');
// product.brand = "toshiba" // error: cannot be modified

function makeCoordinate(
  x: number,
  y: number,
  z: number
): readonly [number, number, number] {
  return [x, y, z];
}

const coords = makeCoordinate(1, 2, 3);
// coords[0] = 5 // error: cannot be modified

// immutability
const reallyConst = [10, 20, 30] as const; // readonly tuple
// reallyConst[0] = 100 // error: cannot be modified
