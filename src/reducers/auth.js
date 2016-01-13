import { AUTH_LOGIN, AUTH_LOGIN_SUCCESS, AUTH_LOGIN_FAIL, AUTH_LOGOUT } from '../constants/LeafActionTypes';
import storage from '../utils/localStorage';

const _leafAdmin = storage.get('_leafAdmin');

const initialState = {
  loggedIn: false,
  email: _leafAdmin && _leafAdmin.email,
  pass: _leafAdmin && _leafAdmin.pass,
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case AUTH_LOGIN:
      return {
        ...state,
        loading: true,
      };
    case AUTH_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        loggedIn: true,
        email: action.auth.email,
        pass: action.auth.pass,
      };
    case AUTH_LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        loggedIn: false,
        error: action.error,
      };
    case AUTH_LOGOUT:
      return {
        email: '',
        pass: '',
        loggedIn: false,
      };
    default:
      return state;
  }
}
