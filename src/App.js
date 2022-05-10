import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Favorites from './pages/Favorites';
import ProductDetails from './pages/productDetails';
import ShareLayout from './components/ShareLayout';
import Error from './pages/Error';

import {
  cartTotalItems,
  saveToLocalStorage,
  getProducts,
} from './features/cart/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import WelcomePage from './components/WelcomePage';

function App() {
  const [welcomePage, setWelcomePage] = useState(true);
  const dispatch = useDispatch();
  const { cartItems, favouriteItems } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(cartTotalItems());
    dispatch(saveToLocalStorage());
  }, [cartItems]);

  useEffect(() => {
    dispatch(saveToLocalStorage());
  }, [favouriteItems]);

  useEffect(() => {
    dispatch(getProducts());
  }, []);
  function toggleWelcomePage() {
    setWelcomePage((prevalue) => false);
  }
  if (welcomePage) {
    return <WelcomePage toggle={toggleWelcomePage} />;
  }

  return (
    <Routes>
      <Route path="/" element={<ShareLayout />}>
        <Route index element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="/:productId" element={<ProductDetails />} />
        <Route path="favourites" element={<Favorites />} />
        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  );
}

export default App;
