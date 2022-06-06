import React from 'react';
import styled from 'styled-components';
import {
  Navbar,
  Sidebar,
  Filters,
  ProductList,
  Sort,
  Footer,
} from '../components';

const ProductsPage = () => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <main>
        <Wrapper className='page-100'>
          <div className='section-center products'>
            <Filters />
            <div>
              <Sort />
              <ProductList />
            </div>
          </div>
        </Wrapper>
      </main>
      <Footer />
    </>
  );
};

const Wrapper = styled.div`
  .products {
    display: grid;
    gap: 3rem 1.5rem;
    margin: 1rem auto 4rem;
  }

  .section-center {
    margin-top: 0;
  }

  @media (min-width: 768px) {
    .products {
      grid-template-columns: 200px 1fr;
    }
  }
`;

export default ProductsPage;
