import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Navbar, Sidebar, Footer } from '../components';
import { useCartContext } from '../context/cart_context';

const OrderConfirmPage = () => {
  const { order_id } = useCartContext();
  return (
    <>
      <Navbar />
      <Sidebar />
      <Wrapper className='page-100'>
        <div className='container'>
          <h2>{`Your order #${order_id}!`}</h2>
          <p>We'll get in touch with you soon.</p>
          <Link to='/'>
            <button type='button' className='home-btn'>
              BACK HOME
            </button>
          </Link>
        </div>
      </Wrapper>
      <Footer />
    </>
  );
};

const Wrapper = styled.main`
  background: #f7f9f1;
  margin: 0;

  .container {
    margin: 0 auto;
    text-align: center;
    color: #252525;
  }

  h2 {
    margin-bottom: 3rem;
    text-align: center;
    padding-top: 3rem;
    font-size: 2rem;
  }
  p {
    font-size: 1.5rem;
    font-weight: 600;
  }

  .home-btn {
    font-size: 1rem;
    color: #eef2e3;
    background: #252525;
    padding: 0.5rem 0.75rem;
    cursor: pointer;
    border-radius: 3px;
    border: none;
  }
`;

export default OrderConfirmPage;
