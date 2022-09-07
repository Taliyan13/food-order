import { useReducer } from 'react';

import CartContext from './cart-context';

//default state for cart provider, an empty array and total amount=0
const defaultCartState = {
  items: [],
  totalAmount: 0,
};


// in reducer function we have 2 argumnets- state (the last snapshote by the reducer)
// and action (we will create the action in our code)
const cartReducer = (state, action) => {
  if (action.type === 'ADD') {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    //check if the object is alredy part of the cart
    //state.items == existing items in the cart
    //findIndex() == built function to find the indx of the items in array
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    //add to array of items name
    const existingCartItem = state.items[existingCartItemIndex];

    // update the amount of spesific item, edg. sushi x4
    let updatedItems;

    //if we have new item that alredy part of items array
    if (existingCartItem) {
      //update the list of items
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      
      //update the array with the new amounts
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    // when item added for the first time to items array (no have sushi in cart)
    else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }


  if (action.type === 'REMOVE') {
    //find the item index
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );

    // find the current item in items array   
    const existingItem = state.items[existingCartItemIndex];
    // calculate the new amount for cart after remove one or more items
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    let updatedItems;
    // if we tried to remove the lase item from that type -> so remove the specific item from items array
    if (existingItem.amount === 1) {
      //gives us new array with no the specific item.
      updatedItems = state.items.filter(item => item.id !== action.id);
    } 
    // we want to save the item in items array, only to decreace his amount
    else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    };
  }

  return defaultCartState;
};


// updates on context
//manage the cart-context data and provide the context to all components that have accsess
// to that context
// we created - item:, totalAmount, addItem, removeItem
const CartProvider = (props) => {
   // 1. state, 2. initial state
  // return 1.state snapshot, 2.function which allow you to dispatch an action to the reducer.
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    //forwarding the last arguments(item) to reducer
    dispatchCartAction({ type: 'ADD', item: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: 'REMOVE', id: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  // we will send the cartContext as a value to cartcontext.provider
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;