import React, { useRef, useState } from 'react';
import emailjs from 'emailjs-com';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../features/cart/cartSlice';
import { Link } from 'react-router-dom';

function CheckoutPage() {
  const { cartItems, total } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    userName: '',
    userAddress: '',
    userEmail: '',
    userNumber: '',
  });

  const form = useRef();

  const sendEmail = (e) => {
    if (
      !userData.userAddress ||
      !userData.userEmail ||
      !userData.userNumber ||
      userData.userNumber.length !== 11 ||
      !userData.userName ||
      total < 0
    ) {
      return;
    }
    e.preventDefault();

    emailjs
      .sendForm(
        'service_k2abjzm',
        'template_v39zj4p',
        form.current,
        '-goOoCl8lcxIIBoqI'
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    e.target.innerText = 'Thank you for your order';
    dispatch(clearCart());
  };

  console.log(form);
  // controls user input
  const handleInput = (e) => {
    e.preventDefault();

    setUserData((prevalue) => {
      const { value, name } = e.target;
      return {
        ...prevalue,
        [name]: value,
      };
    });
  };

  return (
    <section className="checkout-page">
      <div>
        <h3>Items purchased</h3>
        {cartItems.map((item) => {
          const {
            sys: { id },
            fields: { title, price, amount },
          } = item;

          return (
            <div className="checkout-items" key={id}>
              <div>
                <h5>{title}</h5>

                <p>
                  {' '}
                  <span>&#8358;</span>
                  {new Intl.NumberFormat('en-US').format(price)}
                </p>
              </div>
              <p>Qty: {amount}</p>
            </div>
          );
        })}
      </div>
      <h4>
        Total:
        <span>&#8358;</span>
        {new Intl.NumberFormat('en-US').format(total)}
      </h4>

      <form ref={form} onSubmit={sendEmail}>
        <h4>please enter your details below</h4>
        <label htmlFor="userName">Name:</label> <br />
        <input
          type="text"
          placeholder="Enter your name"
          value={userData.userName}
          name="userName"
          onChange={handleInput}
          id="userName"
          required
        />{' '}
        <br />
        <label htmlFor="userAddress">Your delivery address:</label>
        <input
          type="text"
          placeholder="Enter your address"
          value={userData.userAddress}
          name="userAddress"
          onChange={handleInput}
          id="userAddress"
          required
        />{' '}
        <br />
        <label htmlFor="userNunber">Phone number:</label>
        <input
          type="number"
          placeholder="Phone number"
          value={userData.userNumber}
          name="userNumber"
          onChange={handleInput}
          id="userNumber"
          required
        />{' '}
        <br />
        {userData.userNumber < 11 ||
          (userData.userNumber > 11 && (
            <p>number must not be less than 11 digit</p>
          ))}
        <label htmlFor="userMail">Email:</label> <br />
        <input
          type="email"
          placeholder="Enter your mail"
          value={userData.userEmail}
          name="userEmail"
          onChange={handleInput}
          id="userMail"
          required
        />
        {/* <input
          type="textarea"
          value={}
        /> */}
        <button className="confirm-order-btn" type="button" onClick={sendEmail}>
          Confirm order
        </button>
      </form>
      <p>Note: payment on delivery</p>
    </section>
  );
}

export default CheckoutPage;
