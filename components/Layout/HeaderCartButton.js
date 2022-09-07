import { useContext, useEffect, useState } from 'react';
import CartIcon from '../Cart/CartIcon';
import CartContext from '../../store/cart-context';
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = (props) => {

  // usful for useEffect for animation when user add or remove items from cart (the animation will start)
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const cartCtx = useContext(CartContext);

  //pull the items from cartCtx
  const { items } = cartCtx;

  //reduce function is a build func that allow us to tranfrom array of data to single value\number.
  // reduce func have 2 arguments - 1.function u build, 2.initial value.
  const numberOfCartItems = items.reduce((currentNum, item) =>{
    return currentNum+item.amount;
    //the numberOfCartItems = currentNum+item.amount; will be display in 
    //<span className={classes.badge}>

  }, 0);


  //animation started every time we add\remove item from cart
  const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);

    //will triggerd an function for remove the class, for every time we add 
    //new item the animation will show up
    //not only the first item added
    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    return() => {
      clearTimeout(timer);
    };

  },[items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;