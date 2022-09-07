import React, {Fragment, useState} from "react";
import Header from './components/Layout/Header';
import Meals from "./components/Meals/Meals";
import Cart from './components/Cart/Cart';
import CartProvider from './store/CartProvider';

//useState for 2 states : 1.the cart is visibale, 2.the cart is unvisibale


function App() { 
  //useState for Cart
  const [cartIsShown, setCartIsShown] = useState(false);

  //when user click on cart button
  const showCartHandler = () =>
  {
    setCartIsShown(true);
  };

  //function for closing the cart with "close" button, OR click on background (backDrop is clicked)
  const hideCartHandler = () =>
  {
    setCartIsShown(false);
  };

  // {cartIsShown (== true) && (=>>>>> so shown the cart modal) <Cart />}
  return (
    <CartProvider>
      {cartIsShown && <Cart onClose={hideCartHandler}/>}
      <Header onShowCart={showCartHandler}/> 
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;