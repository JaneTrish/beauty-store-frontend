import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { formatPrice } from '../utils/helpers';

export const ListView = ({ products }) => {
  return (
    <Wrapper>
      {products.map((product) => {
        const { id, image, product_name, price, description } = product;
        return (
          <article key={id}>
            <img src={image} alt={product_name} />
            <div>
              <h4>{product_name}</h4>
              <h5 className='price'>{formatPrice(price)}</h5>
              <p>{description}</p>
              <Link to={`/products/${id}`} className='details-btn'>
                Details
              </Link>
            </div>
          </article>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: grid;
  row-gap: 3rem;

  img {
    width: 100%;
    display: block;
    width: 200px;
    height: 250px;
    object-fit: cover;
    border-radius: 5px;
    margin-bottom: 1rem;
  }

  h4 {
    margin-bottom: 0.5rem;
  }

  .price {
    margin-bottom: 0.75rem;
  }
  p {
    max-width: 45rem;
    margin-bottom: 1.5rem;
  }

  .details-btn {
    padding: 0.25rem 0.5rem;
    background-color: #252525;
    border: none;
    border-radius: 5px;
    font-weight: bold;
  }

  a {
    color: #d3dfb8;
  }

  @media (min-width: 992px) {
    article {
      display: grid;
      grid-template-columns: auto 1fr;
      column-gap: 2rem;
      align-items: center;
    }
  }
`;

export default ListView;
