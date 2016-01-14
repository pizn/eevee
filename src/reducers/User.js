import { LOAD_USER_INFO, LOAD_USER_INFO_SUCCESS, LOAD_USER_INFO_FAIL } from '../constants/LeafActionTypes';

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
      console.log(action.result);
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
    default:
      return state;
  }
}
