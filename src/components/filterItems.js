import React from 'react';
import { filterItems } from '../features/cart/cartSlice';
import { useDispatch } from 'react-redux';
import { BsFilterLeft } from 'react-icons/bs';
import { useState } from 'react';

function FilterItems({ categories }) {
  const [isShown, setIsShown] = useState(true);
  const dispatch = useDispatch();

  return (
    <>
      <section className="filterBtns filter-desktop-btns">
        <div>
          <p className="filter-text">Filter</p>
          {categories.map((item, index) => {
            return (
              <p
                className={`${isShown && 'filter-list'} list-items`}
                key={index}
                onClick={() => dispatch(filterItems(item))}
              >
                {item}
              </p>
            );
          })}
        </div>
        <BsFilterLeft
          className="filter-icon"
          onClick={() => setIsShown(!isShown)}
        />
      </section>
    </>
  );
}

export default FilterItems;
