import { AUTH_LOGIN, AUTH_LOGOUT } from '../constants/LarkActionTypes';

const initialState = {
  username: '',
  password: '',
  loggedIn: false,
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
