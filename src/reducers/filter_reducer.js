import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions';

const filter_reducer = (state, action) => {
  if (action.type === LOAD_PRODUCTS) {
    let maxPrice = action.payload.map((product) => Number(product.price));
    maxPrice = maxPrice.sort((a, b) => a - b);
    maxPrice = maxPrice.pop();

    return {
      ...state,
      filters: {
        ...state.filters,
        price: maxPrice,
        max_price: maxPrice,
      },
      all_products: [...action.payload],
      filtered_products: [...action.payload],
    };
  }

  // GRID VIEW
  if (action.type === SET_GRIDVIEW) {
    return {
      ...state,
      grid_view: true,
    };
  }

  // LIST VIEW
  if (action.type === SET_LISTVIEW) {
    return {
      ...state,
      grid_view: false,
    };
  }

  // UPDATE SORT
  if (action.type === UPDATE_SORT) {
    return {
      ...state,
      sort: action.payload,
    };
  }

  // SORT PRODUCTS
  if (action.type === SORT_PRODUCTS) {
    const { filtered_products, sort } = state;
    let tempProducts = [...filtered_products];

    if (sort === 'price-lowest') {
      tempProducts = filtered_products.sort((a, b) => a.price - b.price);
    }

    if (sort === 'price-highest') {
      tempProducts = filtered_products.sort((a, b) => b.price - a.price);
    }

    if (sort === 'name-a') {
      tempProducts = filtered_products.sort((a, b) =>
        a.product_name.localeCompare(b.product_name)
      );
    }

    if (sort === 'name-z') {
      tempProducts = filtered_products.sort((a, b) =>
        b.product_name.localeCompare(a.product_name)
      );
    }

    return {
      ...state,
      filtered_products: tempProducts,
    };
  }

  // UPDATE FILTERS
  if (action.type === UPDATE_FILTERS) {
    const { name, value } = action.payload;

    return { ...state, filters: { ...state.filters, [name]: value } };
  }

  // FILTER PRODUCTS
  if (action.type === FILTER_PRODUCTS) {
    const { all_products } = state;
    const { text, category, price, instock } = state.filters;
    let tempProducts = [...all_products];

    //filter by text input
    if (text) {
      tempProducts = tempProducts.filter((product) => {
        return product.product_name.toLowerCase().includes(text.toLowerCase());
      });
    }

    //filter by category
    if (category !== 'all') {
      tempProducts = tempProducts.filter(
        (product) => product.category === category
      );
    }

    //filter by price
    tempProducts = tempProducts.filter((product) => product.price < price);

    //filter by stock
    if (instock) {
      tempProducts = tempProducts.filter((products) => products.stock > 0);
    }

    return { ...state, filtered_products: tempProducts };
  }

  // CLEAR FILTERS
  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      filters: {
        ...state.filters,
        text: '',
        category: 'all',
        price: state.filters.max_price,
        instock: false,
      },
    };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
