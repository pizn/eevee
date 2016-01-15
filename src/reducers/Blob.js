import { READ_REPO_BLOB, READ_REPO_BLOB_SUCCESS, READ_REPO_BLOB_FAIL } from '../constants/LeafActionTypes';

const initialState = {
  loaded: false,
  data: {}
};

export default function blob(state = initialState, action) {
  switch (action.type) {
    case READ_REPO_BLOB:
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    case READ_REPO_BLOB_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result,
        error: action.error,
      };
    case READ_REPO_BLOB_FAIL:
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