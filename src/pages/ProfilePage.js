import React from 'react';
import styled from 'styled-components';
import { Navbar, Sidebar, Footer, Profile } from '../components';

const ProfilePage = () => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <Wrapper className='page-100'>
        <Profile />
      </Wrapper>
      <Footer />
    </>
  );
};

const Wrapper = styled.main`
  margin: 2rem 0;
  padding: 2rem 0;
`;

export default ProfilePage;
