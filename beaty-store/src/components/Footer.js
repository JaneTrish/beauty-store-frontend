import React from 'react';
import styled from 'styled-components';

const Footer = () => {
  return (
    <Wrapper>
      <h5>&copy;{new Date().getFullYear()} BeautyStore</h5>
      <h5>All Rights Reserved</h5>
    </Wrapper>
  );
};

const Wrapper = styled.footer`
  height: 5rem;
  padding-top: 1rem;
  color: #252525;
  background: #d3dfb8;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h5 {
    font-weight: 500;
    line-height: 1;
  }
`;

export default Footer;
