import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  OPEN_PROFILE_MENU,
  CLOSE_PROFILE_MENU,
  TOGGLE_CHANGE_PASS,
  TOGGLE_DELETE_MODULE,
} from '../actions';

const toggle_reducer = (state, action) => {
  if (action.type === SIDEBAR_OPEN) {
    return { ...state, isSidebarOpen: true };
  }
  if (action.type === SIDEBAR_CLOSE) {
    return { ...state, isSidebarOpen: false };
  }
  if (action.type === OPEN_PROFILE_MENU) {
    return { ...state, isProfileMenuOpen: true };
  }
  if (action.type === CLOSE_PROFILE_MENU) {
    return { ...state, isProfileMenuOpen: false };
  }
  if (action.type === TOGGLE_CHANGE_PASS) {
    return { ...state, changePass: !state.changePass };
  }
  if (action.type === TOGGLE_DELETE_MODULE) {
    return { ...state, deleteModuleOpen: !state.deleteModuleOpen };
  }

  throw new Error(`No matching ${action.type} action type`);
};

export default toggle_reducer;
