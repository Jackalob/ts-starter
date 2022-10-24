type IProps = {
  items: string[];
  onClick?: (item: string) => void;
};

function List({ items, onClick }: IProps) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item} onClick={() => onClick?.(item)} role="presentation">
          {item}
        </li>
      ))}
    </ul>
  );
}

List.defaultProps = {
  onClick: () => {},
};

export default List;
