import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GrAdd } from 'react-icons/gr';
import { AiOutlineMinus, AiFillDelete } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { MdOutlineArrowBackIosNew } from 'react-icons/md';
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
      <div className="empty-cart">
        <h2>Your Cart is empty 😥</h2>
      </div>
    );
  }
  return (
    <main className="cart-main">
      <Link to="/">
        <div className="back-arrow">
          <MdOutlineArrowBackIosNew className="back-arrow-icon" />
        </div>
      </Link>
      <h4>Your cart</h4>
      <section className="cart-container">
        <div className="cart-section">
          {cartItems.map((item) => {
            const {
              sys: { id },
              fields: { title, price, amount, images },
            } = item;
            return (
              <article className="cart-item" key={id}>
                <div className="cart-header">
                  <div className="cart-item--image--container">
                    <img src={images[0].fields.file.url} alt={title} />
                  </div>
                  <div>
                    <h5>{title}</h5>
                    <p>
                      <span>&#8358;</span>{' '}
                      {new Intl.NumberFormat('en-US').format(price)}
                    </p>
                    <button className="delete-btn">
                      {' '}
                      <AiFillDelete
                        onClick={() => dispatch(removeItem(id))}
                        className="delete-icon"
                      />{' '}
                    </button>
                  </div>
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
            <p>
              <span>&#8358;</span>
              {new Intl.NumberFormat('en-US').format(total)}
            </p>
          </div>
          <div>
            <button
              className="clear-cart"
              onClick={() => dispatch(clearCart())}
            >
              Clear cart
            </button>
            <button className="checkout-btn">Proceed to checkout</button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Cart;
