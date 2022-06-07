import React, { useContext, useReducer } from 'react';
import reducer from '../reducers/toggle_reducer';

import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  OPEN_PROFILE_MENU,
  CLOSE_PROFILE_MENU,
  TOGGLE_CHANGE_PASS,
  TOGGLE_DELETE_MODULE,
} from '../actions';

const initialState = {
  isSidebarOpen: false,
  isProfileMenuOpen: false,
  changePass: false,
  deleteModuleOpen: false,
};

const ToggleContext = React.createContext();

export const ToggleProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const openSidebar = () => {
    dispatch({ type: SIDEBAR_OPEN });
  };

  const closeSidebar = () => {
    dispatch({ type: SIDEBAR_CLOSE });
  };

  const openProfileMenu = () => {
    dispatch({ type: OPEN_PROFILE_MENU });
  };

  const closeProfileMenu = () => {
    dispatch({ type: CLOSE_PROFILE_MENU });
  };

  //toggle changePass visibility
  const toggleChangePass = () => {
    dispatch({ type: TOGGLE_CHANGE_PASS });
  };

  //toggle deleteUser visibility
  const toggleDeleteModule = () => {
    dispatch({ type: TOGGLE_DELETE_MODULE });
  };

  return (
    <ToggleContext.Provider
      value={{
        ...state,
        openSidebar,
        closeSidebar,
        openProfileMenu,
        closeProfileMenu,
        toggleChangePass,
        toggleDeleteModule,
      }}
    >
      {children}
    </ToggleContext.Provider>
  );
};

export const useToggleContext = () => {
  return useContext(ToggleContext);
};
