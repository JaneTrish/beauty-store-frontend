import React, { useEffect, useContext, useReducer } from 'react';
import reducer from '../reducers/user_reducer';

import { register_url, login_url, logout_url, user_url } from '../utils/links';
import { getLocalStorage } from '../utils/helpers';
import {
  LOAD_LOGIN,
  LOAD_REGISTER,
  FLIP_FORM,
  AUTH_USER_BEGIN,
  AUTH_USER_SUCCESS,
  AUTH_USER_ERROR,
  LOGOUT_USER_BEGIN,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_ERROR,
  GET_USER_BEGIN,
  GET_USER_SUCCESS,
  GET_USER_ERROR,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  UPDATE_USER_PASSWORD_BEGIN,
  UPDATE_USER_PASSWORD_SUCCESS,
  UPDATE_USER_PASSWORD_ERROR,
  DELETE_USER_BEGIN,
  DELETE_USER_SUCCESS,
  DELETE_USER_ERROR,
} from '../actions';
import axios from 'axios';

const initialState = {
  register: false,
  user: getLocalStorage('user'),
  isLoading: false,
  errorMsg: null,
  userEmail: '',
  success: false,
};

const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //change between login and register forms on auth page
  const flipForms = () => {
    dispatch({ type: FLIP_FORM });
  };

  //register user
  const registerUser = async ({ user_name, email, password }) => {
    dispatch({ type: AUTH_USER_BEGIN });
    try {
      const response = await axios.post(
        register_url,
        { user_name, email, password },
        {
          withCredentials: true,
        }
      );
      const { user } = await response.data;
      dispatch({ type: AUTH_USER_SUCCESS, payload: user });
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    } catch (error) {
      console.log(error);
      let { msg: errorMsg } = error.response.data;
      if (error.request.status === 500) {
        errorMsg = error.request.statusText;
      }
      dispatch({ type: AUTH_USER_ERROR, payload: errorMsg });
    }
  };

  //login user
  const loginUser = async ({ email, password }) => {
    dispatch({ type: AUTH_USER_BEGIN });
    try {
      const response = await axios.post(
        login_url,
        { email, password },
        {
          withCredentials: true,
        }
      );
      const { user } = await response.data;
      dispatch({ type: AUTH_USER_SUCCESS, payload: user });
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    } catch (error) {
      console.log(error);
      let { msg: errorMsg } = error.response.data;
      if (error.request.status === 500) {
        errorMsg = error.request.statusText;
      }
      dispatch({ type: AUTH_USER_ERROR, payload: errorMsg });
    }
  };

  //logout user
  const logoutUser = async () => {
    dispatch({ type: LOGOUT_USER_BEGIN });
    try {
      await axios.get(logout_url);
      dispatch({ type: LOGOUT_USER_SUCCESS });
      localStorage.setItem('user', JSON.stringify(null));
    } catch (error) {
      console.log(error);
      const { msg: errorMsg } = error.response.data;
      dispatch({ type: LOGOUT_USER_ERROR, payload: errorMsg });
    }
  };

  //get user email
  const getUserEmail = async (id) => {
    dispatch({ type: GET_USER_BEGIN });
    try {
      const response = await axios.get(`${user_url}/${id}`, {
        withCredentials: true,
      });
      const { user } = response.data;
      dispatch({ type: GET_USER_SUCCESS, payload: user.email });
    } catch (error) {
      console.log(error);
      let { msg: errorMsg } = error.response.data;
      if (error.request.status === 500) {
        errorMsg = error.request.statusText;
      }
      dispatch({ type: GET_USER_ERROR, payload: errorMsg });
    }
  };

  //update user details
  const updateUserDetails = async (user_name, email) => {
    dispatch({ type: UPDATE_USER_BEGIN });
    try {
      const response = await axios.put(
        `${user_url}/updateUser`,
        { user_name, email },
        {
          withCredentials: true,
        }
      );
      const { user } = await response.data;
      dispatch({ type: UPDATE_USER_SUCCESS, payload: user });
      return user;
    } catch (error) {
      console.log(error);
      let { msg: errorMsg } = error.response.data;
      if (error.request.status === 500) {
        errorMsg = error.request.statusText;
      }
      dispatch({ type: UPDATE_USER_ERROR, payload: errorMsg });
    }
  };

  //update password
  const updateUserPassword = async (oldPassword, newPassword) => {
    dispatch({ type: UPDATE_USER_PASSWORD_BEGIN });
    try {
      const response = await axios.put(
        `${user_url}/updateUserPassword`,
        { oldPassword, newPassword },
        {
          withCredentials: true,
        }
      );
      const { msg } = await response.data;
      dispatch({ type: UPDATE_USER_PASSWORD_SUCCESS });
      return msg;
    } catch (error) {
      let { msg: errorMsg } = error.response.data;
      if (error.request.status === 500) {
        errorMsg = error.request.statusText;
      }
      dispatch({ type: UPDATE_USER_PASSWORD_ERROR, payload: errorMsg });
    }
  };

  //delete user profile
  const deleteUser = async () => {
    dispatch({ type: DELETE_USER_BEGIN });
    try {
      const response = await axios.delete(`${user_url}/deleteUser`, {
        withCredentials: true,
      });
      const { status } = response;
      dispatch({ type: DELETE_USER_SUCCESS });
      localStorage.setItem('user', JSON.stringify(null));
      return status;
    } catch (error) {
      console.log(error);
      let { msg: errorMsg } = error.response.data;
      if (error.request.status === 500) {
        errorMsg = error.request.statusText;
      }
      dispatch({ type: DELETE_USER_ERROR, payload: errorMsg });
    }
  };

  //load login form on initial render
  useEffect(() => {
    if (state.register) {
      dispatch({ type: LOAD_REGISTER });
    } else {
      dispatch({ type: LOAD_LOGIN });
    }
  }, [state.register]);

  useEffect(() => {
    if (state.user) {
      getUserEmail(state.user.userId);
    }
  }, [state.user]);

  return (
    <UserContext.Provider
      value={{
        ...state,
        flipForms,
        loginUser,
        registerUser,
        logoutUser,
        getUserEmail,
        updateUserDetails,
        updateUserPassword,
        deleteUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
