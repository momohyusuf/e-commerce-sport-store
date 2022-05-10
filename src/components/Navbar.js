import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { MdFavorite } from 'react-icons/md';
import { useSelector } from 'react-redux';

function Navbar() {
  const { amount, favouriteItems } = useSelector((state) => state.cart);
  return (
    <nav className="navbar">
      <NavLink to="/">
        <div className="logo">
          <h1>F-T</h1>
          <p>Fit-In</p>
        </div>
      </NavLink>
      <div className="navbar-icons-container">
        <NavLink to="cart">
          {' '}
          <button className="cart-btn">
            {amount > 0 && (
              <span className="cart-items-count" style={{ color: 'white' }}>
                {amount}
              </span>
            )}
            <FaShoppingCart title="cart" className="cart-icon" />
          </button>
        </NavLink>

        <NavLink to="favourites">
          {' '}
          <button className="cart-btn">
            {favouriteItems.length > 0 && (
              <span className="cart-items-count" style={{ color: 'white' }}>
                {favouriteItems.length}
              </span>
            )}
            <MdFavorite className="fav-icon" title="favorites" />
          </button>
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
