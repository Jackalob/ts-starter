import type { UseNumberValue, UseNumberSetValue } from '../hooks/useNumber';
import Button from './Button';

type IProps = {
  value: UseNumberValue;
  onAddValue: UseNumberSetValue;
};

function Incrementer({ value, onAddValue }: IProps) {
  return <Button onClick={() => onAddValue((v) => v + 1)}>Add {value}</Button>;
}

export default Incrementer;
