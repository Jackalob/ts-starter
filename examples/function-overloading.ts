interface Coordinate {
  x: number;
  y: number;
}

function parseCoordinate(str: string): Coordinate;
function parseCoordinate(obj: Coordinate): Coordinate;
function parseCoordinate(x: number, y: number): Coordinate;
function parseCoordinate(arg1: unknown, arg2?: unknown): Coordinate {
  let coord: Coordinate = { x: 0, y: 0 };
  if (typeof arg1 === 'string') {
    arg1.split(',').forEach((str) => {
      const [key, value] = str.split(':');
      coord[key as 'x' | 'y'] = +value;
    });
  } else if (typeof arg1 === 'object') {
    coord = { ...(arg1 as Coordinate) };
  } else {
    coord = {
      x: arg1 as number,
      y: arg2 as number,
    };
  }
  return coord;
}

console.log(parseCoordinate(121, 25)); // { "x": 121, "y": 25 }
console.log(parseCoordinate({ x: 121, y: 25 })); // { "x": 121, "y": 25 }
console.log(parseCoordinate('x:121,y:25')); // { "x": 121, "y": 25 }
