type IProps = {
  title: string;
};

function Heading({ title }: IProps) {
  return <h2>{title}</h2>;
}

export default Heading;
