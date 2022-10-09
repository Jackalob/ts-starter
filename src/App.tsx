import { useContext } from 'react';
import { InputValueContext } from './context/InputValueContext';

export default function App() {
  const { state, dispatch } = useContext(InputValueContext);
  const handleClick = () => {
    dispatch({ type: 'SET_INPUT_VALUE_TO_100' });
  };
  return (
    <>
      <p>Value: {state.inputValue}</p>
      <button type="button" onClick={handleClick}>
        SET VALUE TO 100
      </button>
    </>
  );
}
