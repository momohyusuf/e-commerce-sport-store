import React from 'react';
import { Link } from 'react-router-dom';
import { BsFillCartDashFill, BsFillCartCheckFill } from 'react-icons/bs';
import { useSelector, useDispatch } from 'react-redux';
import { addItemToCart } from '../features/cart/cartSlice';
import FilterItems from '../components/filterItems';
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
  console.log(categories);

  return (
    <>
      <FilterItems categories={categories} />
      <main className="section">
        <section className="products-container">
          {products.map((item) => {
            const {
              sys: { id },
              fields: { title, price, details, images },
            } = item;

            function add(e) {
              let itemExist = cartItems.find((element) => {
                return element.sys.id === id;
              });
              if (!itemExist) {
                e.target.innerText = `Added to cart`;
                dispatch(addItemToCart(id));
              } else {
                e.target.innerText = `item already in cart`;
                return;
              }
            }

            return (
              <article className="product" key={id}>
                <div className="product--image--container">
                  <img src={images[0].fields.file.url} alt={title} />
                </div>
                <div className="product-information">
                  <h5>{title}</h5>
                  <p>
                    <span>&#8358;</span>
                    {new Intl.NumberFormat('en-IN', {
                      maximumSignificantDigits: 3,
                    }).format(price)}
                  </p>
                  <Link to={id}>Product details</Link>
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
    </>
  );
}

export default Home;
