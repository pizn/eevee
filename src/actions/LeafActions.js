import * as types from '../constants/LeafActionTypes';
import authorization from '../utils/authorization';

export function login(auth) {
  return {
    types: [types.AUTH_LOGIN, types.AUTH_LOGIN_SUCCESS, types.AUTH_LOGIN_FAIL],
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
