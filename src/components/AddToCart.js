import React, { useState } from 'react';
import styled from 'styled-components';
import { useCartContext } from '../context/cart_context';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const AddToCart = ({ product }) => {
  const { id, stock } = product;
  const { addToCart } = useCartContext();
  const [amount, setAmount] = useState(1);

  const increase = () => {
    setAmount((prev) => {
      let newAmount = prev + 1;
      if (newAmount > stock) {
        newAmount = stock;
      }
      return newAmount;
    });
  };
  const decrease = () => {
    setAmount((prev) => {
      let newAmount = prev - 1;
      if (newAmount < 1) {
        newAmount = 1;
      }
      return newAmount;
    });
  };

  return (
    <Wrapper>
      <div className='container'>
        <button type='button' onClick={decrease} className='cart-btn'>
          <FaMinus />
        </button>
        <h2 className='cart-amount'>{amount}</h2>
        <button type='button' onClick={increase} className='cart-btn'>
          <FaPlus />
        </button>
      </div>
      <Link to='/cart'>
        <button
          type='button'
          className='btn add-btn'
          onClick={() => addToCart(id, amount, product)}
        >
          Add to Cart
        </button>
      </Link>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 4rem;

  .container {
    display: flex;
    width: 160px;
    justify-content: space-evenly;
  }

  .cart-amount {
    padding: 0 1rem;
  }

  .cart-btn {
    border: none;
    background: none;
    cursor: pointer;
  }

  .cart-btn svg {
    color: #252525;
  }

  .add-btn {
    width: 160px;
    margin: 1rem auto;
    padding: 1rem 2rem;
    background-color: #252525;
    color: #d3dfb8;
    border: none;
    border-radius: 5px;
    font-weight: bold;
  }
`;

export default AddToCart;
