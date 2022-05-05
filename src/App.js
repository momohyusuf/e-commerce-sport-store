import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import productDetails from './pages/productDetails';
import ShareLayout from './components/ShareLayout';
import Error from './pages/Error';
import { cartTotalItems, saveToLocalStorage } from './features/cart/cartSlice';
import { useDispatch, useSelector } from 'react-redux';

function App() {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(cartTotalItems());
    dispatch(saveToLocalStorage());
  }, [cartItems]);

  return (
    <Routes>
      <Route path="/" element={<ShareLayout />}>
        <Route index element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="/:productId" element={<productDetails />} />
        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  );
}

export default App;
