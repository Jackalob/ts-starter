/* eslint-disable react/no-unescaped-entities */
import './App.css';
import InOperatorComponent from './components/InOperator';
import EqualityComponent from './components/Equality';
import type { InOperatorItem, EqualityItem } from './types';

const items1: InOperatorItem[] = [
  {
    id: 1,
    title: 'A nice sunset',
    imageUrl:
      'https://images.unsplash.com/photo-1426604966848-d7adac402bff?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1740&q=80',
  },
  {
    id: 2,
    quote:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo, quam ea. Nisi nulla earum itaque, sapiente exercitationem, laudantium sunt fuga dolores repellendus, expedita dicta. Voluptates minima laboriosam odit reprehenderit magnam!',
  },
];

const items2: EqualityItem[] = [
  {
    id: 1,
    title: 'A nice sunset',
    type: 'IMAGE_ITEM',
    imageUrl:
      'https://images.unsplash.com/photo-1426604966848-d7adac402bff?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1740&q=80',
  },
  {
    id: 2,
    type: 'QUOTE_ITEM',
    quote:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo, quam ea. Nisi nulla earum itaque, sapiente exercitationem, laudantium sunt fuga dolores repellendus, expedita dicta. Voluptates minima laboriosam odit reprehenderit magnam!',
  },
];

function App() {
  return (
    <>
      <h2>Using "in operator" narrowing</h2>
      <InOperatorComponent items={items1} />
      <h2>Using "equality" narrowing</h2>
      <EqualityComponent items={items2} />
    </>
  );
}

export default App;
