import { LOAD_USER_INFO, LOAD_USER_INFO_SUCCESS, LOAD_USER_INFO_FAIL, UPDATE_USER_INFO, AUTH_LOGOUT } from '../constants/LeafActionTypes';

const initialState = {
  loaded: false,
  data: {},
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case LOAD_USER_INFO:
      return {
        ...state,
        loading: true,
      };
    case LOAD_USER_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result,
        error: action.error,
      };
    case LOAD_USER_INFO_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error,
      };
    case UPDATE_USER_INFO:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.data,
        error: null,
      };
    case AUTH_LOGOUT:
      return {
        loaded: false,
        data: {},
      };
    default:
      return state;
  }
}
