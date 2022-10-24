type IProps = {
  children: React.ReactNode;
};

function Box({ children }: IProps) {
  return (
    <div
      style={{
        padding: '1rem',
        fontWeight: 'bold',
      }}
    >
      {children}
    </div>
  );
}

export default Box;
