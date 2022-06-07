import React from 'react';
import styled from 'styled-components';
import { useCartContext } from '../context/cart_context';
import { Link } from 'react-router-dom';
import CartColumns from './CartColumns';
import CartItem from './CartItem';
import CartTotal from './CartTotal';

const CartContent = () => {
  const { cart, clearCart } = useCartContext();

  return (
    <Wrapper className='section section-center'>
      <CartColumns />
      {cart.map((item) => {
        return <CartItem key={item.id} {...item} />;
      })}
      <hr />
      <div className='link-container'>
        <Link to='/products' className='link-btn'>
          continue shopping
        </Link>
        <button
          type='button'
          className='link-btn clear-btn'
          onClick={clearCart}
        >
          Clear Shopping Cart
        </button>
      </div>
      <CartTotal />
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .link-container {
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
  }

  .link-btn {
    border-color: transparent;
    text-transform: capitalize;
    padding: 0.25rem 0.5rem;
    background: #252525;
    color: #e5ecd5;
    border-radius: 5px;
    font-weight: 400;
    cursor: pointer;
  }
  .clear-btn {
    background: #9e2a2b;
  }
`;

export default CartContent;
