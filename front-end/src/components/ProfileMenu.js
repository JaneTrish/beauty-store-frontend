import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useUserContext } from '../context/user_context';
import { useToggleContext } from '../context/toggle_context';
import { useCartContext } from '../context/cart_context';

const ProfileMenu = () => {
  const { logoutUser } = useUserContext();
  const { isProfileMenuOpen, closeProfileMenu } = useToggleContext();
  const { cart_id, deleteCart, clearCart } = useCartContext();

  let navigate = useNavigate();

  const handleClick = async () => {
    if (cart_id) {
      await deleteCart(cart_id);
    }

    await logoutUser();
    navigate('/');
    closeProfileMenu();
    clearCart();
  };

  return (
    <Wrapper
      className={
        isProfileMenuOpen ? 'profile-menu open' : 'profile-menu closed'
      }
    >
      <ul className='profile-list' onMouseLeave={closeProfileMenu}>
        <li className='profile-link' onClick={closeProfileMenu}>
          <Link to='/showMe'>My profile</Link>
        </li>
        <li className='profile-link' onClick={closeProfileMenu}>
          <Link to='/checkout'>Checkout</Link>
        </li>
        <hr />
        <li className='profile-link '>
          <button type='button' onClick={handleClick}>
            Log out
          </button>
        </li>
      </ul>
    </Wrapper>
  );
};

const Wrapper = styled.aside`
  position: absolute;
  top: 5.75rem;
  right: 2rem;
  z-index: 5;
  width: 170px;
  border: 1px solid #252525;
  background: #ffffff;

  .profile-link button {
    background: none;
    border: none;
    color: #252525;
    text-transform: capitalize;
    font-size: 1.25rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s linear;
  }

  .profile-link button:hover {
    color: #c2d39c;
  }

  .profile-list {
    padding: 0.5rem 0;
  }

  .profile-link {
    padding: 0.5rem 1rem;
    display: block;
  }

  hr {
    margin-top: 0.75rem;
  }

  .profile-link a {
    color: #252525;
    text-transform: capitalize;
    font-size: 1.25rem;
    font-weight: 600;
    transition: all 0.2s linear;
  }

  .profile-link a:hover {
    color: #c2d39c;
  }
`;

export default ProfileMenu;
