import React from 'react';
import {
  addItemToCart,
  addToFavourites,
  removeFromFavourites,
} from '../features/cart/cartSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { BsFillCartDashFill, BsFillCartCheckFill } from 'react-icons/bs';
import { MdOutlineFavoriteBorder, MdFavorite } from 'react-icons/md';

function MarketPlace() {
  const { products, cartItems, favouriteItems } = useSelector(
    (state) => state.cart
  );

  const dispatch = useDispatch();

  return (
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

        function addTofav(e) {
          let itemExist = favouriteItems.find((element) => {
            return element.sys.id === id;
          });

          if (itemExist) {
            return;
          }
          dispatch(addToFavourites(id));
        }

        return (
          <article className="product" key={id}>
            {/* ********* */}
            <div className="product--image--container">
              <img src={images[0].fields.file.url} alt={title} />
            </div>
            {/* ********** */}
            <div className="product-information">
              <h5>{title}</h5>
              <p>
                <span>&#8358;</span>
                {new Intl.NumberFormat('en-IN', {
                  maximumSignificantDigits: 3,
                }).format(price)}
              </p>
              <Link className="product-info-toggle" to={id}>
                Product info
              </Link>

              {/* ******* */}
              <div className="products-btns-container">
                <button onClick={add} className="add-to-cart-btn">
                  Add to cart
                  <span>
                    <BsFillCartDashFill className="add-to-cart-icon" />
                  </span>
                </button>

                <div className="favourite-btn">
                  <MdFavorite
                    className="add-to-favouriteIcon"
                    title="Add to Favourites"
                    onClick={addTofav}
                  />
                  <MdFavorite
                    className="remove-from-favouriteIcon"
                    title="Remove from Favourites"
                    onClick={() => dispatch(removeFromFavourites(id))}
                  />
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
}

export default MarketPlace;
