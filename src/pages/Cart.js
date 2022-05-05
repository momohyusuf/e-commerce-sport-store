import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GrAdd } from 'react-icons/gr';
import { AiOutlineMinus, AiFillDelete } from 'react-icons/ai';
import {
  clearCart,
  removeItem,
  increaseQty,
  decreaseQty,
} from '../features/cart/cartSlice';

function Cart() {
  const { cartItems, total } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  console.log(cartItems);
  if (cartItems.length <= 0) {
    return (
      <div>
        <h1>Your Cart is empty</h1>
      </div>
    );
  }
  return (
    <main className="section">
      hello world
      <section className="cart-container">
        <div className="cart-section">
          {cartItems.map((item) => {
            const {
              sys: { id },
              fields: {
                amount,
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
              <article className="cart-item" key={id}>
                <div>
                  <div className="cart-item--image--container">
                    <img src={url} alt={title} />
                  </div>
                  <h5>{title}</h5>
                  <p>${price}</p>
                  <button className="delete-btn">
                    {' '}
                    <AiFillDelete
                      onClick={() => dispatch(removeItem(id))}
                      className="delete-icon"
                    />{' '}
                  </button>
                </div>

                <div className="quantity-container">
                  <p>Qty</p>
                  <button
                    onClick={() => {
                      amount === 1
                        ? dispatch(removeItem(id))
                        : dispatch(decreaseQty(id));
                    }}
                    className="decrease-qty-btn"
                  >
                    <AiOutlineMinus />
                  </button>
                  <span className="quantity-amount">{amount}</span>
                  <button
                    onClick={() => dispatch(increaseQty(id))}
                    className="increase-qty-btn"
                  >
                    {' '}
                    <GrAdd />
                  </button>
                </div>
              </article>
            );
          })}

          <div className="cart-total">
            <h5>Total</h5>
            <p>${total.toFixed(2)}</p>
          </div>
          <div className="clear-cart">
            <button onClick={() => dispatch(clearCart())}>Clear cart</button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Cart;