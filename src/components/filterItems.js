import React from 'react';
import { filterItems } from '../features/cart/cartSlice';
import { useDispatch } from 'react-redux';
import { BsFilterLeft } from 'react-icons/bs';

function FilterItems({ categories }) {
  console.log(categories);
  const dispatch = useDispatch();

  return (
    <section className="filterBtns">
      <p>filter</p>
      <div>
        {categories.map((item, index) => {
          return (
            <ul className="filter-list">
              <li key={index} onClick={() => dispatch(filterItems(item))}>
                {item}
              </li>
            </ul>
          );
        })}
      </div>

      <BsFilterLeft />
    </section>
  );
}

export default FilterItems;
