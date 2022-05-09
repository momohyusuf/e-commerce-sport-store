import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import MarketPlace from '../components/MarketPlace';
import FilterItems from '../components/filterItems';
import { filterItems } from '../features/cart/cartSlice';
function Home() {
  const { products, filterButtons, isLoading, cartItems } = useSelector(
    (state) => state.cart
  );
  const dispatch = useDispatch();

  if (isLoading) {
    return (
      <div className="loading">
        <img src={require('../images/Spinner-2.gif')} alt="spinner" />
      </div>
    );
  }

  const categories = [
    ...new Set(filterButtons.map((item) => item.fields.category)),
    'all',
  ];

  return (
    <>
      <FilterItems categories={categories} />
      <main className="main-body-section">
        <div className="filter-products-desktop">
          <h5>Filter Products</h5>
          {categories.map((filterBtns, index) => {
            return (
              <p key={index} onClick={() => dispatch(filterItems(filterBtns))}>
                {filterBtns}
              </p>
            );
          })}
        </div>
        <MarketPlace />
      </main>
    </>
  );
}

export default Home;
