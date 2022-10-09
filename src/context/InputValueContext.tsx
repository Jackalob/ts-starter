import { createContext, useReducer } from 'react';

type IState = typeof initialState;
type IAction =
  | { type: 'SET_INPUT_VALUE'; payload: number }
  | { type: 'SET_INPUT_VALUE_TO_100' };

interface InputProviderProps {
  children: React.ReactNode;
}

const initialState = {
  inputValue: 0,
};

const reducer = (state: IState, action: IAction) => {
  switch (action.type) {
    case 'SET_INPUT_VALUE':
      return {
        ...state,
        inputValue: action.payload,
      };
    case 'SET_INPUT_VALUE_TO_100':
      return {
        ...state,
        inputValue: 100,
      };
    default:
      return state;
  }
};

// createContext的 type 要跟 Provider value 上設的值是一樣的type
const InputValueContext = createContext<{
  state: IState;
  dispatch: React.Dispatch<IAction>;
}>({
  state: initialState,
  dispatch: () => {},
});

function InputValueProvider({ children }: InputProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <InputValueContext.Provider value={{ state, dispatch }}>
      {children}
    </InputValueContext.Provider>
  );
}

export { InputValueContext, InputValueProvider };
