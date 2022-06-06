import React from 'react';
import { useFilterContext } from '../context/filter_context';
import GridView from './GridView';
import ListView from './ListView';

export const ProductList = () => {
  const { filtered_products, grid_view } = useFilterContext();

  if (filtered_products.length < 1) {
    return <h5>No products matched your search</h5>;
  }
  if (grid_view === false) {
    return <ListView products={filtered_products} />;
  }

  return <GridView products={filtered_products} />;
};

export default ProductList;
