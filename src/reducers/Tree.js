import { READ_REPO_TREE, READ_REPO_TREE_SUCCESS, READ_REPO_TREE_FAIL } from '../constants/LeafActionTypes';

const initialState = {
  loaded: false,
  data: {}
};

export default function tree(state = initialState, action) {
  switch (action.type) {
    case READ_REPO_TREE:
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    case READ_REPO_TREE_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result,
        error: action.error,
      };
    case READ_REPO_TREE_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error,
      }
    default:
      return state;
  }
}