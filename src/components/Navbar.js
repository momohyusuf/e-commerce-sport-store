import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { useSelector } from 'react-redux';

function Navbar() {
  const { amount } = useSelector((state) => state.cart);
  return (
    <nav className="navbar">
      <NavLink to="/">
        <img className="logo" src={require('../images/logo.png')} alt="" />
      </NavLink>
      <NavLink to="cart">
        {' '}
        <button className="cart-btn">
          <span className="cart-items" style={{ color: 'white' }}>
            {amount}
          </span>
          <FaShoppingCart className="cart-icon" />
        </button>
      </NavLink>
    </nav>
  );
}

export default Navbar;
