import React from 'react';
import styled from 'styled-components';
import { useCartContext } from '../context/cart_context';
import { useUserContext } from '../context/user_context';
import { formatPrice } from '../utils/helpers';
import { Link } from 'react-router-dom';

const CartTotal = () => {
  const { total_amount, uploadItemToCart, cart, cart_id, createCart } =
    useCartContext();
  const { user } = useUserContext();

  const handleClick = async () => {
    if (!cart_id) {
      await createCart();
    }
    cart.forEach(async (item) => {
      await uploadItemToCart(cart_id, item.id, item.amount, item);
    });
  };

  return (
    <Wrapper>
      <div>
        <article>
          <h4>
            Order total : <span>{formatPrice(total_amount)}</span>
          </h4>
        </article>
        {user ? (
          <Link to='/checkout'>
            <button className='btn link-btn' onClick={handleClick}>
              PROCEED TO CHECKOUT
            </button>
          </Link>
        ) : (
          <Link to='/auth' className='btn link-btn'>
            LOGIN
          </Link>
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin-top: 3rem;
  display: flex;
  justify-content: center;
  article {
    border: 1px solid #6c757d;
    border-radius: 5px;
    padding: 1.5rem 3rem;
  }
  h4 {
    display: grid;
    grid-template-columns: 200px 1fr;
    margin-top: 1rem;
  }

  @media (min-width: 776px) {
    justify-content: flex-end;
  }
  .btn {
    width: 100%;
    margin-top: 1rem;
    text-align: center;
  }
  .link-btn {
    font-weight: 700;
  }
`;

export default CartTotal;
