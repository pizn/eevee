import * as types from '../constants/LarkActionTypes';
import authorization from '../utils/authorization';

export function login(auth) {
  return {
    type: types.AUTH_LOGIN,
    promise: authorization.login(auth),
    auth,
  };
}

export function logout() {
  return {
    type: types.AUTH_LOGOUT,
    promise: authorization.logout(),
  };
}
