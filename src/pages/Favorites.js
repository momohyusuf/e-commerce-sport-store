import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdOutlineArrowBackIosNew } from 'react-icons/md';
export default function Favorites() {
  const { favouriteItems } = useSelector((state) => state.cart);
  console.log(favouriteItems);
  return (
    <>
      <Link to="/">
        <div className="back-arrow">
          <MdOutlineArrowBackIosNew className="back-arrow-icon" />
        </div>
      </Link>

      <section className="favourite-container">
        {favouriteItems.map((item) => {
          const {
            sys: { id },
            fields: { images, title, price, details },
          } = item;
          return (
            <div key={id}>
              <img src={images[0].fields.file.url} alt={title} />
              <h1>{title}</h1>
              <h5 className="product-details-price">
                {' '}
                <span>&#8358;</span>
                {new Intl.NumberFormat('en-US').format(price)}
              </h5>
              <p>{details}</p>
            </div>
          );
        })}
      </section>
    </>
  );
}
