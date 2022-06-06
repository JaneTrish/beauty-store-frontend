import React from 'react';
import styled from 'styled-components';
import { useCartContext } from '../context/cart_context';
import { Link } from 'react-router-dom';
import { Navbar, Sidebar, CartContent, Footer, Loading } from '../components';

const CartPage = () => {
  const { cart, cart_loading } = useCartContext();

  if (cart.length < 1) {
    return (
      <>
        <Navbar />
        <Sidebar />
        <Wrapper className='page-100'>
          {cart_loading ? (
            <Loading />
          ) : (
            <div className='empty'>
              <h2>Your cart is empty</h2>
              <Link to='/products' className='btn shop-btn'>
                Shop now
              </Link>
            </div>
          )}
        </Wrapper>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <Sidebar />

      <main>
        <Wrapper className='page-100'>
          <CartContent />
        </Wrapper>
      </main>
      <Footer />
    </>
  );
};

const Wrapper = styled.main`
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

export default CartPage;
