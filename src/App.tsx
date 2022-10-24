import { useCallback } from 'react';
import './App.css';
import Heading from './components/Heading';
import Box from './components/Box';
import List from './components/List';

const initialItems = ['one', 'two', 'three'];

function App() {
  const onListClick = useCallback((item: string) => alert(item), []);
  return (
    <div className="App">
      <Heading title="Introduction" />
      <Box>Hello there</Box>
      <List items={initialItems} onClick={onListClick} />
    </div>
  );
}

export default App;
