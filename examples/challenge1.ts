const data = [
  { name: 'Atreides', planets: 'Calladan' },
  { name: 'Corrino', planets: ['Kaitan', 'Salusa Secundus'] },
  { name: 'Harkonnen', planets: ['Giedi Prime', 'Arrakis'] },
];

interface House {
  name: string;
  planets: string | string[];
}

interface HouseWithID extends House {
  id: number;
}

function findHouses(
  houses: string | House[],
  filter?: (house: House) => boolean
): HouseWithID[] {
  const houseList: House[] =
    typeof houses === 'string' ? JSON.parse(houses) : houses;
  return (filter ? houseList.filter(filter) : houseList).map((house) => ({
    id: houseList.indexOf(house),
    ...house,
  }));
}

console.log(
  findHouses(JSON.stringify(data), ({ name }) => name === 'Atreides')
);

console.log(findHouses(data, ({ name }) => name === 'Harkonnen'));
