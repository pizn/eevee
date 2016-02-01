import { LOAD_REPO_TREE, LOAD_REPO_TREE_SUCCESS, LOAD_REPO_TREE_FAIL, AUTH_LOGOUT } from '../constants/LeafActionTypes';

const initialState = {
  loaded: false,
  data: {},
};

export default function repoTree(state = initialState, action) {
  switch (action.type) {
    case LOAD_REPO_TREE:
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    case LOAD_REPO_TREE_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result,
        error: action.error,
      };
    case LOAD_REPO_TREE_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error,
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
