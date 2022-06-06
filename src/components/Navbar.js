import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { NavButtons } from './index';
import styled from 'styled-components';
import { FaBars } from 'react-icons/fa';
import { links } from '../utils/links';
import logo from '../assets/logo.svg';
import { useToggleContext } from '../context/toggle_context';
import ProfileMenu from './ProfileMenu';

const useWindowWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);
  useLayoutEffect(() => {
    const updateWidth = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener('resize', updateWidth);
    updateWidth();
    return () => window.removeEventListener('resize', updateWidth);
  }, []);
  return width;
};

const Navbar = () => {
  const { openSidebar, closeSidebar, closeProfileMenu } = useToggleContext();

  const width = useWindowWidth();

  useEffect(() => {
    if (width < 992) {
      closeProfileMenu();
    }
    if (width > 992) {
      closeSidebar();
    }
  }, [width, closeSidebar, closeProfileMenu]);

  return (
    <NavWrapper className='nav-btns-wrapper'>
      <div className='nav-center'>
        <div className='nav-header'>
          <button type='button' className='nav-btn' onClick={openSidebar}>
            <FaBars />
          </button>
          <Link to='/'>
            <img src={logo} alt='beauty store' />
          </Link>
          <ul className='nav-links'>
            {links.map((link) => {
              return (
                <li key={link.id} className='nav-link'>
                  <Link to={link.url}>{link.text}</Link>
                </li>
              );
            })}
          </ul>
          <NavButtons />
        </div>
      </div>
      <ProfileMenu className='profile-menu' />
    </NavWrapper>
  );
};

const NavWrapper = styled.nav`
  height: 5.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #252525;
  position: relative;

  .nav-center {
    margin: 0 auto;
    width: 90vw;
  }

  .nav-btn {
    background: transparent;
    color: #d3dfb8;
    border: none;
    font-size: 2rem;
    padding: 5px;
    cursor: pointer;
  }

  img {
    max-width: 115px;
  }

  .nav-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .nav-links {
    display: none;
  }

  .nav-link {
    padding: 0.5rem 1rem;
    display: inline-block;
  }

  .nav-link a {
    color: #e5ecd5;
    text-transform: capitalize;
    font-size: 1.25rem;
    font-weight: 400;
  }

  .closed {
    visibility: hidden;
    transition: all 0.2s linear;
    opacity: 0;
  }
  .open {
    visibility: visible;
    transition: all 0.2s linear;
    opacity: 1;
  }

  .profile-menu {
    display: none;
  }

  @media (min-width: 992px) {
    .nav-btn {
      display: none;
    }

    .profile-menu {
      display: block;
    }

    .nav-links {
      display: block;
    }
  }
`;

export default Navbar;
