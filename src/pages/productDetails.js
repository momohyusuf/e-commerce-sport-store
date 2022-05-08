import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ProductDetails() {
  const { products } = useSelector((state) => state.cart);
  const { productId } = useParams();

  let productInformation = products.find((item) => item.sys.id === productId);

  console.log(productInformation);
  return (
    <div>
      <h1>hello world</h1>
    </div>
  );
}

export default ProductDetails;
