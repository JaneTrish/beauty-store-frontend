import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useCartContext } from '../context/cart_context';
import { Loading } from './';

const OrderDetails = () => {
  const {
    shipping_info: { shipping_name, shipping_address, email, phone, pay_later },
    cart_loading,
    updateShippingInfo,
    placeOrder,
  } = useCartContext();

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const orderId = await placeOrder();
    if (orderId) {
      navigate('/OrderConfirm');
    } else {
      alert('Something went wrong.');
      navigate(-1);
    }
  };

  return (
    <Wrapper>
      <h2>Order details</h2>
      {cart_loading ? (
        <Loading />
      ) : (
        <div className='section-container'>
          <form method='post' onSubmit={handleSubmit}>
            <div className='row'>
              <label htmlFor='shipping_name'>Name</label>
              <input
                type='text'
                id='shipping_name'
                name='shipping_name'
                className='form-input'
                required
                value={shipping_name}
                onChange={updateShippingInfo}
              />
            </div>
            <div className='row'>
              <label htmlFor='shipping_address'>Address</label>
              <input
                type='text'
                id='shipping_address'
                name='shipping_address'
                className='form-input'
                required
                value={shipping_address}
                onChange={updateShippingInfo}
              />
            </div>
            <div className='row'>
              <label htmlFor='phone'>Phone</label>
              <input
                type='tel'
                id='phone'
                name='phone'
                className='form-input'
                required
                value={phone}
                onChange={updateShippingInfo}
              />
            </div>
            <div className='row'>
              <label htmlFor='phone'>Email</label>
              <input
                type='email'
                id='email'
                name='email'
                className='form-input'
                required
                value={email}
                onChange={updateShippingInfo}
              />
            </div>
            <hr />
            <div className='row check-row'>
              <label htmlFor='pay_later'>Pay on delivery</label>
              <div className='check-container'>
                <input
                  type='checkbox'
                  name='pay_later'
                  id='pay_later'
                  checked
                  disabled
                  className='form-input check'
                  onChange={updateShippingInfo}
                />
              </div>
            </div>

            <button type='submit' className='form-btn'>
              Place Order
            </button>
          </form>
        </div>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  position: relative;
  margin: 0;

  .section-container {
    max-width: 776px;
    margin: 0 auto;
    padding: 2rem 4rem;
  }
  h2 {
    text-align: center;
  }
  button {
    cursor: pointer;
  }
  .row {
    display: flex;
    justify-content: space-between;
    margin: 1rem 0;
  }

  label,
  button {
    font-weight: 700;
  }

  .form-input {
    width: 250px;
    padding: 0.5rem;
    background: #f7f9fa;
    border-radius: 5px;
    border-color: transparent;
  }

  .check-container {
    width: 250px;
  }

  .check-row {
    margin-top: 2rem;
  }

  .check {
    display: block;
    width: 16px;
    height: 16px;
    margin: 0 auto;
  }

  .form-btn {
    border-color: transparent;
    text-transform: capitalize;
    padding: 0.25rem 0.5rem;
    background: #252525;
    color: #e5ecd5;
    border-radius: 5px;
    font-weight: 400;
    cursor: pointer;
    display: block;
    margin: 4rem auto;
  }
  .form-btn:disabled {
    cursor: not-allowed;
  }

  .loading {
    margin: 0 auto;
  }
`;

export default OrderDetails;
