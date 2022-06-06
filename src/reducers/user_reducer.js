import {
  SUCCESS_FALSE,
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

const user_reducer = (state, action) => {
  if (action.type === SUCCESS_FALSE) {
    return { ...state, success: false };
  }
  if (action.type === LOAD_LOGIN) {
    return { ...state, register: false };
  }
  if (action.type === LOAD_REGISTER) {
    return { ...state, register: true };
  }
  if (action.type === FLIP_FORM) {
    if (state.register) {
      return { ...state, register: false };
    } else {
      return { ...state, register: true };
    }
  }

  // USER AUTH
  if (action.type === AUTH_USER_BEGIN) {
    return { ...state, isLoading: true, success: false, errorMsg: null };
  }
  if (action.type === AUTH_USER_SUCCESS) {
    const { userId, name, role } = action.payload;
    return {
      ...state,
      isLoading: false,
      errorMsg: null,
      success: true,
      register: false,
      user: { userId, name, role },
    };
  }
  if (action.type === AUTH_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      success: false,
      errorMsg: action.payload,
    };
  }

  //LOGOUT USER
  if (action.type === LOGOUT_USER_BEGIN) {
    return { ...state, isLoading: true, success: false, errorMsg: null };
  }
  if (action.type === LOGOUT_USER_SUCCESS) {
    return {
      ...state,
      errorMsg: null,
      user: null,
      userEmail: '',
      success: true,
      isLoading: false,
      orders: [],
    };
  }
  if (action.type === LOGOUT_USER_ERROR) {
    return {
      ...state,
      errorMsg: action.payload,
      success: false,
      isLoading: false,
    };
  }

  //GET SINGLE USER
  if (action.type === GET_USER_BEGIN) {
    return { ...state, isLoading: true, success: false, errorMsg: null };
  }
  if (action.type === GET_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      userEmail: action.payload,
      errorMsg: null,
      success: true,
    };
  }
  if (action.type === GET_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      errorMsg: action.payload,
      success: false,
    };
  }

  //UPDATE USER
  if (action.type === UPDATE_USER_BEGIN) {
    return { ...state, isLoading: true, success: false, errorMsg: null };
  }
  if (action.type === UPDATE_USER_SUCCESS) {
    const { name, email } = action.payload;
    return {
      ...state,
      isLoading: false,
      user: { ...state.user, name },
      userEmail: email,
      errorMsg: null,
      success: true,
    };
  }
  if (action.type === UPDATE_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      success: false,
      errorMsg: action.payload,
    };
  }

  //UPDATE PASSWORD
  if (action.type === UPDATE_USER_PASSWORD_BEGIN) {
    return { ...state, isLoading: true, success: false, errorMsg: null };
  }
  if (action.type === UPDATE_USER_PASSWORD_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      errorMsg: null,
      success: true,
    };
  }
  if (action.type === UPDATE_USER_PASSWORD_ERROR) {
    return {
      ...state,
      isLoading: false,
      success: false,
      errorMsg: action.payload,
    };
  }

  //DELETE USER
  if (action.type === DELETE_USER_BEGIN) {
    return { ...state, isLoading: true, success: false, errorMsg: null };
  }
  if (action.type === DELETE_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      errorMsg: null,
      success: true,
      user: null,
      userEmail: '',
    };
  }
  if (action.type === DELETE_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      success: false,
      errorMsg: action.payload,
    };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default user_reducer;
