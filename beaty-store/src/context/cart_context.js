import React, { useEffect, useContext, useReducer } from 'react';
import reducer from '../reducers/cart_reducer';
import {
  CREATE_CART_SUCCESS,
  CREATE_CART_BEGIN,
  CREATE_CART_ERROR,
  ADD_TO_CART,
  UPLOAD_CART_ITEM_SUCCESS,
  UPLOAD_CART_ITEM_ERROR,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  DELETE_CART_ON_LOGOUT_SUCCESS,
  DELETE_CART_ON_LOGOUT_ERROR,
  UPDATE_SHIPPING_INFO,
  PLACE_ORDER_BEGIN,
  PLACE_ORDER_SUCCESS,
  PLACE_ORDER_ERROR,
  UPLOAD_CART_ITEM_BEGIN,
} from '../actions';
import axios from 'axios';
import { cart_url } from '../utils/links';
import { getLocalStorage } from '../utils/helpers';

const initialState = {
  cart_loading: false,
  cart_id: getLocalStorage('cart_id'),
  order_id: '',
  cart: getLocalStorage('cart'),
  total_items: 0,
  total_amount: 0,
  error: null,
  shipping_info: {
    shipping_name: '',
    shipping_address: '',
    email: '',
    phone: '',
    paid: false,
  },
};

const CartContext = React.createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //create cart
  const createCart = async () => {
    dispatch({ type: CREATE_CART_BEGIN });
    try {
      const response = await axios.post(
        cart_url,
        { cart_total: state.total_amount },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      const { cart_id } = response.data;
      dispatch({ type: CREATE_CART_SUCCESS, payload: cart_id });
      localStorage.setItem('cart_id', JSON.stringify(cart_id));
    } catch (error) {
      const { msg } = error.response.data;
      dispatch({ type: CREATE_CART_ERROR, payload: msg });
    }
  };

  //delete cart
  const deleteCart = async (cartId) => {
    try {
      await axios.delete(`${cart_url}/${cartId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      dispatch({ type: DELETE_CART_ON_LOGOUT_SUCCESS });
      localStorage.setItem('cart_id', JSON.stringify(''));
    } catch (error) {
      const { msg } = error.response.data;
      dispatch({ type: DELETE_CART_ON_LOGOUT_ERROR, payload: msg });
    }
  };

  //add to cart (front-end)
  const addToCart = async (id, amount, product) => {
    dispatch({ type: ADD_TO_CART, payload: { id, amount, product } });
  };

  //upload item to cart (back-end)
  const uploadItemToCart = async (cartId, id, amount, product) => {
    dispatch({ type: UPLOAD_CART_ITEM_BEGIN });
    try {
      await axios.post(
        `${cart_url}/${cartId}/item`,
        {
          cart_id: cartId,
          product_id: id,
          cart_item_name: product.name,
          price: product.price,
          quantity: amount,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      dispatch({ type: UPLOAD_CART_ITEM_SUCCESS });
      dispatch({ type: COUNT_CART_TOTALS });
    } catch (error) {
      const { msg } = error.response.data;
      dispatch({ type: UPLOAD_CART_ITEM_ERROR, payload: msg });
    }
  };

  //remove item

  const removeItem = (id) => {
    dispatch({ type: REMOVE_CART_ITEM, payload: id });
  };

  //toggle amount

  const toggleAmount = (id, value) => {
    dispatch({ type: TOGGLE_CART_ITEM_AMOUNT, payload: { id, value } });
  };

  //clear cart
  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };

  //update shipping information
  const updateShippingInfo = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    dispatch({ type: UPDATE_SHIPPING_INFO, payload: { name, value } });
  };

  //place order
  const placeOrder = async () => {
    dispatch({ type: PLACE_ORDER_BEGIN });
    const { shipping_name, shipping_address, email, phone, paid } =
      state.shipping_info;

    try {
      const response = await axios.post(
        `${cart_url}/${state.cart_id}/checkout`,
        { shipping_name, shipping_address, email, phone, paid },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );

      const { orderId } = response.data;
      dispatch({ type: PLACE_ORDER_SUCCESS, payload: orderId });
      localStorage.setItem('cart', JSON.stringify([]));
      localStorage.setItem('cart_id', JSON.stringify(''));
      return orderId;
    } catch (error) {
      console.log(error);
      const { msg } = error.response.data;
      dispatch({ type: PLACE_ORDER_ERROR, payload: msg });
    }
  };

  useEffect(() => {
    dispatch({ type: COUNT_CART_TOTALS });
    localStorage.setItem('cart', JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        removeItem,
        toggleAmount,
        clearCart,
        createCart,
        deleteCart,
        updateShippingInfo,
        placeOrder,
        uploadItemToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  return useContext(CartContext);
};
