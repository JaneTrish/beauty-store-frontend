import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  Navbar,
  Sidebar,
  Loading,
  Error,
  AddToCart,
  Footer,
} from '../components';
import { useProductsContext } from '../context/products_context';
import { products_url as url } from '../utils/links';
import { formatPrice } from '../utils/helpers';
import { FaStar } from 'react-icons/fa';

const SingleProductPage = () => {
  const {
    fetchSingleProduct,
    single_product,
    single_product_loading,
    single_product_error,
  } = useProductsContext();

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchSingleProduct(`${url}/${id}`);
  }, []);

  useEffect(() => {
    if (single_product_error) {
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }
  }, [single_product_error, navigate]);

  if (single_product_loading) {
    return (
      <>
        <Navbar />
        <Sidebar />

        <Wrapper className='page-100'>
          <Loading />;
        </Wrapper>
        <Footer />
      </>
    );
  }
  if (single_product_error) {
    return (
      <>
        <Navbar />
        <Sidebar />
        <Wrapper className='page-100'>
          <Error />;
        </Wrapper>
        <Footer />
      </>
    );
  }

  const { product_name, price, description, image, category, rating, stock } =
    single_product;

  return (
    <>
      <Navbar />
      <Sidebar />

      <Wrapper className='section  page'>
        <div className='product-container'>
          <div className='info'>
            <h2>{product_name}</h2>

            <p>
              <FaStar className='rating' /> {rating}
            </p>
            <p className='price'>{formatPrice(price)}</p>
            <p>{description}</p>
            <p className='category'>
              <span>Category: </span> {category}
            </p>
            <p>
              <span>Stock:</span> {stock > 0 ? `${stock}` : 'Out of Stock'}
            </p>
            {stock > 0 && <AddToCart product={single_product} />}
          </div>
          <div className='image-container'>
            <img src={image} alt={product_name} />
          </div>
        </div>
      </Wrapper>
      <Footer />
    </>
  );
};

const Wrapper = styled.section`
  .product-container {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .image-container {
    margin: 1rem auto;
    padding: 0 1rem;
  }

  img {
    width: 100%;
    object-fit: cover;
  }

  .info {
    max-width: 500px;
    padding: 0 1rem;
    margin: 2rem auto;
  }

  .info p {
    font-size: 1.25rem;
  }
  .category {
    text-transform: capitalize;
  }
  .price {
    font-weight: bold;
  }

  .info span {
    font-weight: bold;
    margin-right: 1rem;
  }

  .rating {
    color: #ffc15e;
  }

  .back-btn {
    padding: 1rem;
    background-color: #252525;
    border: none;
    border-radius: 5px;
    font-weight: bold;
    margin-bottom: 2rem;
  }

  a {
    color: #d3dfb8;
  }

  @media screen and (min-width: 667px) {
    .image-container {
      max-width: 500px;
    }
  }
`;

export default SingleProductPage;
