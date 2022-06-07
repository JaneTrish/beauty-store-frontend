import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Navbar, Sidebar, Footer } from '../components';

const ErrorPage = () => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <Wrapper className='page-100'>
        <div className='container'>
          <h1>404</h1>
          <p>Sorry, the page is not found</p>
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
    max-width: 20rem;
    margin: 0 auto;
    text-align: center;
    color: #252525;
  }

  h1 {
    margin-top: 0;
    padding-top: 6rem;
    font-size: 5rem;
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

export default ErrorPage;
