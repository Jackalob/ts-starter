/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

type IProps = {
  children: React.ReactNode;
  style?: React.CSSProperties;
};

function Button({
  children,
  style,
  ...rest
}: IProps & React.HTMLAttributes<HTMLButtonElement>) {
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
      {children}
    </button>
  );
}

Button.defaultProps = {
  style: {},
};

export default Button;
