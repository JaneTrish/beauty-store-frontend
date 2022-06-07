import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { formatPrice } from '../utils/helpers';
import { ImSearch } from 'react-icons/im';

const Product = ({ product_name, image, id, price }) => {
  return (
    <Wrapper>
      <div className='container'>
        <img src={image} alt={product_name} />
        <Link to={`/products/${id}`} className='link'>
          <ImSearch />
        </Link>
      </div>
      <footer className='product-footer'>
        <h5>{product_name}</h5>
        <h5 className='price'>{formatPrice(price)}</h5>
      </footer>
    </Wrapper>
  );
};

const Wrapper = styled.article`
  margin: 1rem;
  padding: 1rem;
  background: #f7f9f1;
  border-radius: 3px;

  h5 {
    margin: 0;
  }

  .container {
    position: relative;
  }

  .link {
    font-size: 1.75rem;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 3.5rem;
    height: 3.5rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    transform: translate(-50%, -50%);
    background: #d3dfb8;
    color: #252525;
    border-radius: 50%;
    opacity: 0;
    transition: all 0.3s linear;
  }

  img {
    transition: all 0.3s linear;
    max-width: 350px;
    display: block;
    object-fit: cover;
    border-radius: 3px;
  }

  .container:hover .link {
    opacity: 1;
  }
  .container:hover img {
    opacity: 0.5;
  }

  .product-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .product-footer h5 {
    margin: 0;
    margin-top: 0.5rem;
  }

  .price {
    font-weight: 400;
  }
`;

export default Product;
