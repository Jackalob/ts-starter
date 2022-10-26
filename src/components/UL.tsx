/* eslint-disable react/no-array-index-key */
import React from 'react';

type IProps<T> = {
  items: T[];
  itemClick: (item: T) => void;
  render: (item: T) => React.ReactNode;
};

function UL<T>({
  items,
  itemClick,
  render,
}: IProps<T> &
  React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLUListElement>,
    HTMLUListElement
  >) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index} onClick={() => itemClick(item)} role="presentation">
          {render(item)}
        </li>
      ))}
    </ul>
  );
}

export default UL;
