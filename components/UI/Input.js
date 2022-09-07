import React from 'react';
import classes from './Input.module.css';

//the components that we want to receive Ref to MeatInputForm component
const Input = React.forwardRef((props, ref) => {
  return (
    <div className={classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input ref={ref} {...props.input} />
    </div>
  );
});

export default Input;