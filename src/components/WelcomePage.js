import React from 'react';
import { AiOutlineArrowRight } from 'react-icons/ai';

function WelcomePage({ toggle }) {
  return (
    <div>
      {' '}
      <section className="welcome-page">
        <div>
          <h1>Welcome to Fit-in store</h1>
          <p>Nigeria's number one retail store for all your sports wears</p>
          <button className="show-products-btn" onClick={toggle}>
            Shop Now <AiOutlineArrowRight className="forward-icon" />
          </button>
        </div>
      </section>
      <div className="page-description">
        <h2>
          Nigeria's most Trusted store for <br /> all your sport wears
        </h2>
        <p>
          In partnership with major sports brands around the world to <br />{' '}
          ensure authenticity of our Products
        </p>
      </div>
      <div>
        <h3 className="patners">Major patners</h3>
        <div className="patners-logos">
          {' '}
          <img src={require('../images/nike_icon.png')} alt="" />
          <img src={require('../images/puma_icon.png')} alt="" />
          <img src={require('../images/adidas_icon.png')} alt="" />
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;
