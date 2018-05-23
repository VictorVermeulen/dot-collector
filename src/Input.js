import React from 'react';

const Input = ({ label, type, name, value, onChange }) => (
    <label for={name}>
      {label}
      <input type={type} name={name} value={value} onChange={onChange}/>
    </label>
);

Input.defaultProps = {
  type: 'select',
};

export default Input;
