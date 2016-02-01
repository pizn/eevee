import { READ_REPO_TREE, READ_REPO_TREE_SUCCESS, READ_REPO_TREE_FAIL, ADD_REPO_BLOB, ADD_REPO_BLOB_SUCCESS, ADD_REPO_BLOB_FAIL, AUTH_LOGOUT, REMOVE_REPO_BLOB } from '../constants/LeafActionTypes';

const initialState = {
  loaded: false,
  data: [],
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
      };
    case ADD_REPO_BLOB:
      return {
        ...state,
        adding: true,
      };
    case ADD_REPO_BLOB_SUCCESS:
      return {
        ...state,
        adding: false,
        added: true,
        data: state.data.concat([action.result.content]),
      };
    case ADD_REPO_BLOB_FAIL:
      return {
        ...state,
        adding: false,
        added: false,
        error: action.error,
      };
    case AUTH_LOGOUT:
      return {
        loaded: false,
        data: [],
      };
    case REMOVE_REPO_BLOB:
      return {
        ...state,
        data: state.data.filter(item => {
          return item.path !== action.data.path;
        }),
      };
    default:
      return state;
  }
}
