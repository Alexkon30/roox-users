import React from 'react';
import './Input.css';

interface Props {
  title: string;
  placeholder?: string;
  inputType?: string;
  changeHandler: (value: string) => void;
  value: string;
  readonly: boolean;
  isValid?: boolean;
}

const Input = ({
  title,
  placeholder,
  changeHandler,
  value,
  readonly,
  isValid,
  inputType = 'input',
}: Props): JSX.Element => {
  return (
    <div className='input'>
      <div className='input__title'>{title}</div>
      {inputType === 'input' ? (
        <input
          type='text'
          value={value}
          onChange={(e) => changeHandler(e.target.value)}
          placeholder={placeholder}
          readOnly={readonly}
          className={`${isValid ? '' : 'input-wrong'}`}
        />
      ) : (
        <textarea
          value={value}
          onChange={(e) => changeHandler(e.target.value)}
          rows={3}
          readOnly={readonly}
        />
      )}
    </div>
  );
};

export default Input;
