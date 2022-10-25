import { useState } from 'react';

export default function useNumber(initialValue: number) {
  return useState(initialValue);
}

type UseNumberValue = ReturnType<typeof useNumber>[0];
type UseNumberSetValue = ReturnType<typeof useNumber>[1];

export type { UseNumberValue, UseNumberSetValue };
export { useNumber };
