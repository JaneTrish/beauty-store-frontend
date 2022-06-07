import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import logo from '../assets/logo.svg';
import { links } from '../utils/links';
import { NavButtons } from '../components/index';
import { useToggleContext } from '../context/toggle_context';
import { useUserContext } from '../context/user_context';

const Sidebar = () => {
  const { isSidebarOpen, closeSidebar } = useToggleContext();
  const { user } = useUserContext();

  return (
    <Wrapper>
      <aside className={isSidebarOpen ? 'sidebar show-sidebar' : 'sidebar'}>
        <div className='sidebar-header'>
          <img src={logo} alt='beauty store' />
          <button type='button' className='close-btn' onClick={closeSidebar}>
            <FaTimes />
          </button>
        </div>
        <ul className='sidebar-links'>
          {links.map((link) => {
            return (
              <li key={link.id} className='sidebar-link'>
                <Link to={link.url} onClick={closeSidebar}>
                  {link.text}
                </Link>
              </li>
            );
          })}
          {user && (
            <>
              <li className='sidebar-link'>
                <Link to='/checkout' onClick={closeSidebar}>
                  Checkout
                </Link>
              </li>
              <li className='sidebar-link'>
                <Link to='/showMe' onClick={closeSidebar}>
                  My profile
                </Link>
              </li>
            </>
          )}
        </ul>
        <NavButtons />
      </aside>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  text-align: center;

  .sidebar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 5.5rem;
    background: #252525;
    padding: 1rem 1.5rem;
  }

  .close-btn {
    background: transparent;
    color: #d3dfb8;
    border: none;
    font-size: 2rem;
    padding: 5px;
    cursor: pointer;
    transition: all 0.3s linear;
  }

  .close-btn:hover {
    color: #f6f9f1;
  }

  img {
    max-width: 115px;
  }

  .sidebar-links {
    text-align: left;
    margin-top: 1.5rem;
    margin-left: 1rem;
  }

  .sidebar-link {
    padding: 0.5rem 1rem;
    display: block;
  }

  .sidebar-link a {
    color: #252525;
    text-transform: capitalize;
    font-size: 1.25rem;
    font-weight: 600;
  }

  .sidebar-link a:hover {
    color: #c2d39c;
  }

  .nav-btns-container {
    margin-top: 3rem;
  }

  .nav-btns-container svg {
    font-size: 2.5rem;
    color: #252525
  }

  .nav-btns-container span {
    color:  #d3dfb8
  }

  .sidebar {
    background: #ffffff;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: all 0.3s linear;
    transform: translate(-100%);
    z-index: -1;
  }

  .show-sidebar {
    transform: translate(0);
    z-index: 999;
  }

 

  @media screen and (min-width: 992px) {
    .sidebar {
      display: none;
  }
`;

export default Sidebar;
