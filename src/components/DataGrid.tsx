interface Item {
  id: number;
}

interface DataGridProps<T> {
  items: T[];
}

// assume DataGrid can display multiple types of items

// if you want to use this component, then you must pass id
export default function DataGrid<T extends Item>({ items }: DataGridProps<T>) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{JSON.stringify(item)}</li>
      ))}
    </ul>
  );
}
