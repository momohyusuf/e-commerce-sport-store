import React from 'react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  BsFillArrowRightCircleFill,
  BsFillArrowLeftCircleFill,
} from 'react-icons/bs';
import { MdOutlineArrowBackIosNew } from 'react-icons/md';
function ProductDetails() {
  const [value, setValue] = useState(0);
  const { products } = useSelector((state) => state.cart);
  const { productId } = useParams();

  let productInformation = products.find((item) => item.sys.id === productId);
  console.log(products);
  const {
    fields: { details, images, price, title, qualities },
  } = productInformation;

  return (
    <>
      <Link to="/">
        <div className="back-arrow">
          <MdOutlineArrowBackIosNew className="back-arrow-icon" />
        </div>
      </Link>

      <section className="product-details">
        <div className="product-detail-image-container">
          <img src={images[value].fields.file.url} alt={title} />
          <BsFillArrowLeftCircleFill
            className="prev-icon"
            onClick={() =>
              setValue((prevalue) => {
                if (prevalue === 0) {
                  prevalue = images.length;
                }
                return prevalue - 1;
              })
            }
          />
          <BsFillArrowRightCircleFill
            className="next-icon"
            onClick={() =>
              setValue((prevalue) => {
                if (prevalue === images.length - 1) {
                  prevalue = 0;
                }
                return prevalue + 1;
              })
            }
          />
        </div>

        <div>
          <h3 className="product-details-title">{title}</h3>
          <h5 className="product-details-price">
            {' '}
            <span>&#8358;</span>
            {new Intl.NumberFormat('en-US').format(price)}
          </h5>
          <p>{details}</p>
          <div className="product-qualities">
            <h5>Product Qualities</h5>
            {qualities.map((item, index) => {
              return (
                <ul key={index}>
                  <li>{item}</li>
                </ul>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

export default ProductDetails;
