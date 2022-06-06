import React from 'react';
import styled from 'styled-components';
import { HiLocationMarker } from 'react-icons/hi';
import { ImPhone } from 'react-icons/im';
import { BsEnvelopeFill } from 'react-icons/bs';
import { FaTwitter, FaInstagram } from 'react-icons/fa';
import { GrFacebook } from 'react-icons/gr';

const Contact = () => {
  return (
    <Wrapper>
      <h4>Subscribe for our promotions</h4>
      <form
        className='contact-form'
        action='https://formspree.io/f/xgedplkd'
        method='POST'
      >
        <input
          type='email'
          className='form-input'
          placeholder='  Enter your email'
          name='email'
          required
        />
        <button className='submit-btn' type='submit'>
          submit
        </button>
      </form>
      <div className='container'>
        <p className='contact-info'>
          <HiLocationMarker />
          <span> Address: 10 Main Rd, Cape Town</span>
        </p>
        <p className='contact-info'>
          <ImPhone />
          <span> Phone: +27103214567</span>
        </p>
        <p className='contact-info'>
          <BsEnvelopeFill />
          <span> Email: beautystore@gmail.com</span>
        </p>
      </div>

      <div className='social-icons'>
        <a href='https://www.facebook.com/' target='_blank' rel='noreferrer'>
          <GrFacebook />
        </a>
        <a href='https://www.instagram.com/' target='_blank' rel='noreferrer'>
          <FaInstagram />
        </a>
        <a href='https://twitter.com/' target='_blank' rel='noreferrer'>
          <FaTwitter />
        </a>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 2.5rem 0 1.5rem;
  min-height: 45vh;
  background: #252525;
  color: #d3dfb8;
  text-align: center;

  .container {
    padding: 1rem 1rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
  }

  .contact-info svg {
    font-size: 1.5rem;
    margin-right: 0.5rem;
    padding-top: 0.2rem;
  }

  .contact-info span {
    font-size: 1.2rem;
  }

  .contact-form {
    width: 70vw;
    margin: 2rem auto;
    display: flex;
  }

  .form-input {
    width: 70%;
    height: 40px;
    border: none;
    background: #f7f9f1;
    border-radius: 5px 0 0 5px;
  }

  .submit-btn {
    width: 30%;
    height: 40px;
    border: none;
    text-transform: uppercase;
    padding: 0.5rem 0;
    background: #d3dfb8;
    cursor: pointer;
    transition: all 0.3s linear;
    border-radius: 0 5px 5px 0;
  }

  .submit-btn: hover {
    color: #f7f9f1;
  }

  .social-icons a {
    font-size: 1.5rem;
  }

  .social-icons a {
    margin: 0 0.5rem;
    color: #d3dfb8;
  }
`;
export default Contact;
