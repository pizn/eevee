import { LOAD_REPO_INFO, LOAD_REPO_INFO_SUCCESS, LOAD_REPO_INFO_FAIL, UPLOAD_REPO_INFO, AUTH_LOGOUT } from '../constants/LeafActionTypes';

const initialState = {
  loaded: false,
  data: {},
};

export default function repoInfo(state = initialState, action) {
  switch (action.type) {
    case LOAD_REPO_INFO:
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    case LOAD_REPO_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result,
        error: action.error,
      };
    case LOAD_REPO_INFO_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error,
      };
    case UPLOAD_REPO_INFO:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.data,
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
