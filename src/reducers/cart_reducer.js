import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  UPLOAD_CART_ITEM_SUCCESS,
  UPLOAD_CART_ITEM_ERROR,
  UPLOAD_CART_ITEM_BEGIN,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  CREATE_CART_SUCCESS,
  CREATE_CART_BEGIN,
  CREATE_CART_ERROR,
  GET_CART_BEGIN,
  GET_CART_SUCCESS,
  GET_CART_ERROR,
  DELETE_CART_ON_LOGOUT_SUCCESS,
  DELETE_CART_ON_LOGOUT_ERROR,
  UPDATE_SHIPPING_INFO,
  PLACE_ORDER_BEGIN,
  PLACE_ORDER_SUCCESS,
  PLACE_ORDER_ERROR,
} from '../actions';

const cart_reducer = (state, action) => {
  // CREATE CART
  if (action.type === CREATE_CART_BEGIN) {
    return {
      ...state,
      error: null,
      cart_loading: true,
    };
  }
  if (action.type === CREATE_CART_SUCCESS) {
    return {
      ...state,
      cart_id: action.payload,
      error: null,
      cart_loading: false,
    };
  }
  if (action.type === CREATE_CART_ERROR) {
    return { ...state, error: action.payload, cart_loading: false };
  }

  //GET USER'S CART
  if (action.type === GET_CART_BEGIN) {
    return {
      ...state,
      cart_id: action.payload,
      error: null,
      cart_loading: true,
    };
  }
  if (action.type === GET_CART_SUCCESS) {
    return {
      ...state,
      cart: action.payload,
      error: null,
      cart_loading: false,
    };
  }
  if (action.type === GET_CART_ERROR) {
    return { ...state, error: action.payload, cart_loading: false };
  }

  // DELETE CART
  if (action.type === DELETE_CART_ON_LOGOUT_SUCCESS) {
    return { ...state, cart_id: '' };
  }
  if (action.type === DELETE_CART_ON_LOGOUT_ERROR) {
    return { ...state, cart_id: '', error: action.payload };
  }

  // ADD TO CART (to front-end)
  if (action.type === ADD_TO_CART) {
    const { id, amount, product } = action.payload;
    const tempItem = state.cart.find((item) => item.id === id);
    if (tempItem) {
      const tempCart = state.cart.map((cartItem) => {
        if (cartItem.id === id) {
          let newAmount = cartItem.amount + amount;
          if (newAmount > cartItem.max) {
            newAmount = cartItem.max;
          }
          return { ...cartItem, amount: newAmount };
        } else {
          return cartItem;
        }
      });
      return { ...state, cart: tempCart };
    } else {
      const newItem = {
        id,
        name: product.product_name,
        amount,
        image: product.image,
        price: product.price,
        max: product.stock,
      };
      return { ...state, cart: [...state.cart, newItem] };
    }
  }

  // UPLOAD ITEM TO CART (to back-end)
  if (action.type === UPLOAD_CART_ITEM_BEGIN) {
    return { ...state, cart_loading: true };
  }
  if (action.type === UPLOAD_CART_ITEM_SUCCESS) {
    return { ...state, cart_loading: false };
  }
  if (action.type === UPLOAD_CART_ITEM_ERROR) {
    return { ...state, cart_loading: false, error: action.payload };
  }

  // REMOVE CART ITEM
  if (action.type === REMOVE_CART_ITEM) {
    const tempCart = state.cart.filter((item) => item.id !== action.payload);
    return { ...state, cart: tempCart };
  }

  // CLEAR CART
  if (action.type === CLEAR_CART) {
    return { ...state, cart: [] };
  }

  //TOGGLE AMOUNT
  if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
    const { id, value } = action.payload;
    const tempCart = state.cart.map((item) => {
      if (item.id === id) {
        if (value === 'inc') {
          let newAmount = item.amount + 1;
          if (newAmount > item.max) {
            newAmount = item.max;
          }
          return { ...item, amount: newAmount };
        }
        if (value === 'dec') {
          let newAmount = item.amount - 1;
          if (newAmount < 1) {
            newAmount = 1;
          }
          return { ...item, amount: newAmount };
        }
        return { ...item };
      } else {
        return item;
      }
    });
    return { ...state, cart: tempCart };
  }

  // CALCULATE CART TOTALS
  if (action.type === COUNT_CART_TOTALS) {
    const { total_items, total_amount } = state.cart.reduce(
      (total, cartItem) => {
        const { amount, price } = cartItem;
        total.total_items += amount;
        total.total_amount += price * amount;

        return total;
      },
      { total_items: 0, total_amount: 0 }
    );

    return { ...state, total_items, total_amount };
  }

  //UPDATE SHIPPING INFO
  if (action.type === UPDATE_SHIPPING_INFO) {
    const { name, value } = action.payload;

    return {
      ...state,
      shipping_info: { ...state.shipping_info, [name]: value },
    };
  }

  //PLACE ORDER
  if (action.type === PLACE_ORDER_BEGIN) {
    return { ...state, cart_loading: true };
  }
  if (action.type === PLACE_ORDER_SUCCESS) {
    return {
      ...state,
      cart_loading: false,
      cart_id: '',
      cart: [],
      total_items: 0,
      total_amount: 0,
      shipping_info: {
        shipping_name: '',
        shipping_address: '',
        email: '',
        phone: '',
        pay_later: false,
      },
      order_id: action.payload,
    };
  }
  if (action.type === PLACE_ORDER_ERROR) {
    return { ...state, cart_loading: false, error: action.payload };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default cart_reducer;
