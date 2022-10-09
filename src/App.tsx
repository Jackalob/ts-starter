import DataGrid from './components/DataGrid';
import './App.css';

const users = [
  { id: 1, name: 'Hailey', age: 25 },
  { id: 2, name: 'Brock', age: 30 },
  { id: 3, name: 'Neal', age: 24 },
];
const orders = [
  { id: 1, orderId: 562, quantity: 5, amount: 75 },
  { id: 2, orderId: 567, quantity: 3, amount: 45 },
  { id: 3, orderId: 572, quantity: 1, amount: 15 },
  { id: 4, orderId: 583, quantity: 2, amount: 30 },
];

function App() {
  return (
    <>
      <h2>Users:</h2>
      <DataGrid items={users} />
      <h2>Orders:</h2>
      <DataGrid items={orders} />
    </>
  );
}

export default App;
