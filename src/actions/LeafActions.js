import * as types from '../constants/LeafActionTypes';
import auth from '../services/auth';
import user from '../services/user';
import repo from '../services/repo';

export function login(data) {
  return {
    types: [types.AUTH_LOGIN, types.AUTH_LOGIN_SUCCESS, types.AUTH_LOGIN_FAIL],
    promise: auth.login(data),
    data,
  };
}

export function logout() {
  return {
    types: [types.AUTH_LOGOUT, types.AUTH_LOGOUT_SUCCESS, types.AUTH_LOGOUT_FAIL],
    promise: auth.logout(),
  };
}

export function updateUserInfo(data) {
  if (data) {
    return {
      type: types.UPDATE_USER_INFO,
      data,
    }
  } else {
    return {
      types: [types.LOAD_USER_INFO, types.LOAD_USER_INFO_SUCCESS, types.LOAD_USER_INFO_FAIL],
      promise: user.getInfo(),
    }
  }
}

export function loadRepoInfo(data) {
  return {
    types: [types.LOAD_REPO_INFO, types.LOAD_REPO_INFO_SUCCESS, types.LOAD_REPO_INFO_FAIL],
    promise: repo.getInfo(data.username, data.reponame),
  }
}

export function loadRepoTree(data) {
  return {
    types: [types.LOAD_REPO_TREE, types.LOAD_REPO_TREE_SUCCESS, types.LOAD_REPO_TREE_FAIL],
    promise: repo.getTree(data.username, data.reponame),
  }
}


