import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { GiShoppingBag } from 'react-icons/gi';
import { RiLoginBoxLine, RiLogoutBoxRLine } from 'react-icons/ri';
import { BsPersonCircle } from 'react-icons/bs';
import { useToggleContext } from '../context/toggle_context';
import { useCartContext } from '../context/cart_context';
import { useUserContext } from '../context/user_context';

const NavButtons = () => {
  const {
    closeSidebar,
    isSidebarOpen,
    isProfileMenuOpen,
    closeProfileMenu,
    openProfileMenu,
  } = useToggleContext();
  const { user, logoutUser } = useUserContext();
  const { total_items, cart_id, deleteCart, clearCart } = useCartContext();

  const toggleProfileMenu = () =>
    isProfileMenuOpen ? closeProfileMenu() : openProfileMenu();

  const handleClick = async () => {
    await deleteCart(cart_id);
    await logoutUser();
    clearCart();
    closeSidebar();
  };

  if (isSidebarOpen) {
    return (
      <Wrapper className='nav-btns-container'>
        <Link to='/cart'>
          <button
            type='button'
            title='shopping bag'
            className='bag-btn'
            onClick={closeSidebar}
          >
            <GiShoppingBag />
            <span className='bag-value'>{total_items}</span>
          </button>
        </Link>
        {user ? (
          <button
            type='button'
            title='sign out'
            className='auth-btn'
            onClick={handleClick}
          >
            <RiLogoutBoxRLine />
          </button>
        ) : (
          <Link to='/auth'>
            <button
              type='button'
              title='sing in / register'
              className='auth-btn'
              onClick={closeSidebar}
            >
              <RiLoginBoxLine />
            </button>
          </Link>
        )}
      </Wrapper>
    );
  }

  if (!isSidebarOpen) {
    return (
      <Wrapper className='nav-btns-container'>
        <Link to='/cart'>
          <button
            type='button'
            title='shopping bag'
            className='bag-btn'
            onClick={closeSidebar}
          >
            <GiShoppingBag />
            <span className='bag-value'>{total_items}</span>
          </button>
        </Link>
        {user ? (
          <button
            type='button'
            title='User profile'
            className='auth-btn profile-btn'
            onClick={toggleProfileMenu}
          >
            <BsPersonCircle />
          </button>
        ) : (
          <Link to='/auth'>
            <button
              type='button'
              title='sing in / register'
              className='auth-btn'
              onClick={closeSidebar}
            >
              <RiLoginBoxLine />
            </button>
          </Link>
        )}
      </Wrapper>
    );
  }
};

const Wrapper = styled.div`
  a,
  button {
    color: #d3dfb8;
    margin: 0 0.5rem;
    cursor: pointer;
  }

  button {
    background: transparent;
    border: none;
  }
  svg {
    font-size: 2rem;
  }

  .auth-btn {
    align-items: center;
    color: #d3dfb8;
    text-transform: capitalize;
    font-size: 1.25rem;
    cursor: pointer;
  }

  .bag-btn {
    position: relative;
  }

  .bag-value {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -30%);
    font-size: 1rem;
    font-weight: 800;
    color: #252525;
  }

   @media (max-width: 992px) {
    .profile-btn {
      display: none;
    }
`;

export default NavButtons;
