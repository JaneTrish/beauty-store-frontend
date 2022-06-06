import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
  Navbar,
  Sidebar,
  Contact,
  Featured,
  Services,
  Footer,
} from '../components';
import banner from '../assets/banner.jpg';

const HomePage = () => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <Wrapper>
        <section className='home'>
          <div className='banner'>
            <div className='left'></div>
            <article className='right'>
              <h3>Find your perfect skincare product</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Delectus maxime quasi impedit velit consequuntur odio nemo
                beatae sed asperiores ipsam?
              </p>
              <Link to='/products'>
                <button className='shop-btn btn' type='button'>
                  SHOP NOW
                </button>
              </Link>
            </article>
          </div>
        </section>
        <Featured />
        <Services />
        <Contact />
      </Wrapper>
      <Footer />
    </>
  );
};

const Wrapper = styled.main`
  .banner {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    background-image: url(${banner});
    background-size: cover;
    background-repeat: no-repeat;
    width: 100%;
    height: 100vh;
  }

  .left {
    flex: 1;
  }

  .right {
    flex: 1;
    text-align: center;
    padding-right: 1rem;
    padding-left: 1rem;
  }

  h3 {
    margin-bottom: 1.5rem;
  }

  p {
    font-size: 1.2rem;
    margin-bottom: 2.5rem;
  }

  .shop-btn {
    padding: 1.5rem 2.5rem;
    background-color: #252525;
    border: none;
    border-radius: 5px;
    font-weight: bold;
  }

  a {
    color: #d3dfb8;
  }

  @media (max-width: 859px) {
    .banner {
      height: 90vh;
      background-image: none;
      background: #fdfffa;
    }

    .left {
      display: none;
    }

    .shop-btn {
      top: 120px;
      right: 70px;
      padding: 1.2rem;
    }

    h3 {
      font-size: 1.75rem;
    }

    p {
      font-size: 1.2rem;
      margin-bottom: 2.5rem;
    }

    a {
      font-size: 0.85rem;
    }
  }
`;

export default HomePage;
