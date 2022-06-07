import React from 'react';
import styled from 'styled-components';
import { useFilterContext } from '../context/filter_context';
import { getUniqueValues, formatPrice } from '../utils/helpers';

export const Filters = () => {
  const {
    filters: { text, category, min_price, max_price, price, instock },
    all_products,
    updateFilters,
    clearFilters,
  } = useFilterContext();

  const categories = getUniqueValues(all_products, 'category');

  return (
    <Wrapper>
      <div className='content'>
        <form onSubmit={(e) => e.preventDefault()}>
          {/* search input */}
          <div className='form-control'>
            <input
              type='text'
              name='text'
              placeholder='search'
              className='search-input'
              value={text}
              onChange={updateFilters}
            />
          </div>
          {/* end of search input */}
          {/* categories */}
          <div className='form-control'>
            <h5>category</h5>
            <div>
              {categories.map((cat, index) => {
                return (
                  <button
                    key={index}
                    onClick={updateFilters}
                    name='category'
                    type='button'
                    className={`${
                      category === cat.toLowerCase() ? 'active' : null
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
          {/* end of categories */}
          {/* price */}
          <div className='form-control'>
            <h5>price</h5>
            <p className='price'>{formatPrice(price)}</p>
            <input
              type='range'
              name='price'
              onChange={updateFilters}
              min={min_price}
              max={max_price}
              value={price}
            />
          </div>
          {/* end of price */}
          {/* in stock */}
          <div className='form-control instock'>
            <label htmlFor='instock'>in stock</label>
            <input
              type='checkbox'
              name='instock'
              id='instock'
              onChange={updateFilters}
              checked={instock}
            />
          </div>
          {/* end of in stock */}
        </form>
        <button type='button' className='clear-btn' onClick={clearFilters}>
          clear filters
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
    label {
      font-weight: bold;
    }
  }
  .search-input {
    width: 300px;
    padding: 0.5rem;
    background: #f7f9fa;
    border-radius: 5px;
    border-color: transparent;
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    color: #252525;
    cursor: pointer;
  }
  .active {
    border-color: #252525;
  }

  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .instock {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
  }
  .clear-btn {
    background: #9e2a2b;
    color: #f7f9f1;
    padding: 0.25rem 0.5rem;
    border-radius: 5px;
  }
  @media (min-width: 768px) {
    .search-input {
      width: auto;
    }
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`;

export default Filters;
