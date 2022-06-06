import React from 'react';
import { useProductsContext } from '../context/products_context';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Error, Loading, Product } from './index';

const Featured = () => {
  const {
    products_loading: loading,
    products_error: error,
    featured_products,
  } = useProductsContext();

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }

  return (
    <Wrapper className='section'>
      <h2>Try Our Featured Products</h2>
      <div className='section-center featured-container'>
        {featured_products.map((product) => {
          return <Product key={product.id} {...product} />;
        })}
      </div>
      <Link to='/products'>
        <button type='button' className='shop-btn btn'>
          ALL PRODUCTS
        </button>
      </Link>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  h2 {
    text-align: center;
    color: #252525;
    margin-bottom: 2.5rem;
  }

  .featured-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }

  button {
    max-width: 182px;
    margin: 2.5rem auto;
    margin-bottom: 0;
    display: block;
  }
`;

export default Featured;
