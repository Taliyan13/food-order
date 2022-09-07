import { useRef, useState } from 'react';
import classes from './MealItemForm.module.css';
import Input from '../../UI/Input';

// the form is for the 'amount' and 'Add to cart' buttons
const MealItemForm = (props) => {
    const amountInputRef = useRef();
    const [amountIsValid, setAmountIsValid] =useState(true);

    const submitHandler = (event) => {
        event.preventDefault();
    
        const enteredAmount = amountInputRef.current.value;
        const enteredAmountNumber = +enteredAmount; //convert from string number to number.
    
        if (
          enteredAmount.trim().length === 0 ||
          enteredAmountNumber < 1 ||
          enteredAmountNumber > 5
        ) {
          setAmountIsValid(false);
          return;
        }
    
        props.onAddToCart(enteredAmountNumber); //onAddToCard func will be defined on MealItem component.
      };
    

    return <form className={classes.form} onSubmit={submitHandler}>
        <Input 
            ref = {amountInputRef}
            lable="Amount"
            input = {{
            id: 'amount_' + props.id, // seperate id for each meal id 
            type: 'number',
            min: '1',
            max: '5',
            step: '1',
            defaultValue : '1'
        }}
        />
        <button>+ Add</button>
        { !amountIsValid && <p>Please add valid amount 1-5</p>}
    </form>
};

export default MealItemForm;