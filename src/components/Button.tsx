import React from 'react';

type IProps = {
  title?: string;
};

function Button({
  children,
  style,
  title,
  ...rest
}: IProps &
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >) {
  return (
    <button
      type="button"
      style={{
        backgroundColor: 'cadetblue',
        color: 'white',
        ...style,
      }}
      {...rest}
    >
      {title ?? children}
    </button>
  );
}

Button.defaultProps = {
  title: undefined,
};

export default Button;
