import { AUTH_LOGIN, AUTH_LOGOUT } from '../constants/LarkActionTypes';
import storage from '../utils/localStorage';

const _leafAdmin = storage.get('_leafAdmin');

const initialState = {
  email: _leafAdmin && _leafAdmin.email,
  pass: _leafAdmin && _leafAdmin.pass,
  loggedIn: _leafAdmin && _leafAdmin.loggedIn,
};

export default function larkAuth(state = initialState, action) {
  switch (action.type) {
    case AUTH_LOGIN:
      return {
        email: action.auth.email,
        pass: action.auth.pass,
        loggedIn: true,
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
