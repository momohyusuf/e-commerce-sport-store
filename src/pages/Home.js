import React from 'react';
import { useEffect, useState } from 'react';
import { BsFillCartDashFill, BsFillCartCheckFill } from 'react-icons/bs';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts, addItemToCart } from '../features/cart/cartSlice';

function Home() {
  const { products, isLoading, cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // gets data from api
  useEffect(() => {
    dispatch(getProducts());
  }, []);
  // stops here

  if (isLoading) {
    return (
      <div className="laoding">
        <h1>getting your products...</h1>
      </div>
    );
  }

  const { items } = products;

  return (
    <main className="section">
      <section className="products-container">
        {items.map((item) => {
          function add(e) {
            let itemExist = cartItems.find((element) => {
              return element.sys.id === id;
            });

            if (!itemExist) {
              dispatch(addItemToCart(id));
              // e.target.disabled = true;
              e.target.innerText = `Added to cart`;
            } else {
              e.target.innerText = `item already in cart`;
              return;
            }
          }
          const {
            sys: { id },
            fields: {
              title,
              price,
              image: {
                fields: {
                  file: { url },
                },
              },
            },
          } = item;
          return (
            <article className="product" key={id}>
              <div className="product--image--container">
                <img src={url} alt={title} />
              </div>
              <div className="product-information">
                <h5>{title}</h5>
                <p>${price}</p>
                <button onClick={add} className="add-to-cart-btn">
                  Add to cart
                  <span>
                    <BsFillCartDashFill className="add-to-cart-icon" />
                  </span>
                </button>
              </div>
            </article>
          );
        })}
      </section>
    </main>
  );
}

export default Home;
