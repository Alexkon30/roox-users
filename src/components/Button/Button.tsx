import React from 'react';
import './Button.css';

interface Props {
  text?: string;
  disabled?: boolean;
  color?: string;
  onClick: () => void;
}

const Button = ({ text, disabled, color, onClick }: Props): JSX.Element => {
  return (
    <div
      className={`btn ${disabled ? ' btn-disabled' : ''}`}
      onClick={disabled ? () => {} : onClick}
      style={{ background: `${color}` }}
    >
      <span className='main-text'>{text}</span>
    </div>
  );
};

export default Button;
