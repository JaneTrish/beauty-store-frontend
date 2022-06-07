import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Navbar, Sidebar, OrderDetails, Footer } from '../components';
import { useCartContext } from '../context/cart_context';

const CheckoutPage = () => {
  const { cart } = useCartContext();
  if (cart.length < 1) {
    return (
      <>
        <Navbar />
        <Sidebar />
        <Wrapper className='page-100'>
          <div className='empty'>
            <h2>Your cart is empty</h2>
            <Link to='/products' className='btn shop-btn'>
              Shop now
            </Link>
          </div>
        </Wrapper>
        <Footer />
      </>
    );
  }
  return (
    <>
      <Navbar />
      <Sidebar />
      <Wrapper className='page-100'>
        <OrderDetails />
      </Wrapper>
      <Footer />
    </>
  );
};

const Wrapper = styled.main`
  margin: 2rem 0;
  padding: 2rem 0;

  .empty {
    text-align: center;
    h2 {
      margin-bottom: 3rem;
      text-transform: none;
    }
    .shop-btn {
      padding: 1rem 2rem;
      background-color: #252525;
      border: none;
      border-radius: 5px;
      font-weight: bold;
    }

    a {
      color: #d3dfb8;
    }
  }
`;

export default CheckoutPage;
