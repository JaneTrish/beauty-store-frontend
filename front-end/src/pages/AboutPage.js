import React from 'react';
import styled from 'styled-components';
import { Navbar, Sidebar, Contact, Footer } from '../components';
import aboutImg from '../assets/about.jpg';

const AboutPage = () => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <Wrapper>
        <section className='about-section'>
          <div className='image-container'>
            <img src={aboutImg} alt='cream texture' className='about-img' />
          </div>
          <article className='about-text'>
            <h3>About us</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab est
              eos, nobis corrupti dignissimos doloremque error, itaque soluta
              dolor provident cum. Voluptatibus quod inventore ut quam voluptate
              veniam, unde deserunt est, eveniet rem aliquam odio iure libero
              sequi aperiam velit repudiandae in quas harum a voluptates
              laborum. Ea totam provident nisi ullam voluptates voluptatem sunt
              aperiam, qui quisquam quae error ratione nostrum, placeat
              mollitia. Ratione soluta odio qui explicabo corporis obcaecati ab
              architecto velit, iusto pariatur quasi praesentium nesciunt quam
              necessitatibus molestiae dolore, accusamus delectus dolor quisquam
              illo, voluptatibus reiciendis!
            </p>
          </article>
        </section>
        <Contact />
        <Footer />
      </Wrapper>
    </>
  );
};

const Wrapper = styled.main`
  .about-section {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    margin: 4rem 1rem;
  }

  .image-container {
    max-width: 550px;
    max-height: 429px;
    padding: 1.5rem;
    background: #f7f9f1;
    margin: 2rem 1rem;
  }

  .about-img {
    width: 100%;
    height: auto;
    object-fit: fill;
  }

  .about-text {
    width: 100%;
    margin: 2rem 1rem;
    padding: 1rem;
  }

  .about-text h3 {
    text-align: center;
  }

  .about-text p {
    text-align: justify;
    margin-top: 2rem;
    line-height: 1.75;
    font-size: 1.1rem;
  }

  @media (min-width: 992px) {
    .about-text {
      width: 50%;
      padding: 1rem 1.5rem;
    }
  }
`;

export default AboutPage;
