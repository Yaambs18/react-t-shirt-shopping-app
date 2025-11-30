import { useState } from 'react';
import './App.css';
import Header from './components/Layouts/Header';
import CartProvider from './components/store/CartProvider';
import Tshirts from './components/Tshirts/Tshirts';
import Cart from './components/Cart/Cart';

function App() {
  const [isCartOpen, setCartOpen] = useState(false);

  const cartClickHandler = () => {
    setCartOpen(!isCartOpen);
  }

  return (
    <CartProvider>
      <Header className="header" onCartClick={cartClickHandler} />
      <main className="App">
        {isCartOpen && <Cart onClose={cartClickHandler} />}
        <Tshirts />
      </main>
    </CartProvider>
  );
}

export default App;
