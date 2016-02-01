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

export function loginDone() {
  // login Done
  auth.loginDone();
  return {
    type: types.AUTH_LOGIN_DONE,
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
    };
  }
  return {
    types: [types.LOAD_USER_INFO, types.LOAD_USER_INFO_SUCCESS, types.LOAD_USER_INFO_FAIL],
    promise: user.getInfo(),
  };
}

export function loadRepoInfo(data) {
  return {
    types: [types.LOAD_REPO_INFO, types.LOAD_REPO_INFO_SUCCESS, types.LOAD_REPO_INFO_FAIL],
    promise: user.checkRepo(data.username),
  };
}

export function updateRepoInfo(data) {
  return {
    type: types.UPLOAD_REPO_INFO,
    data,
  };
}

export function loadRepoTree(data) {
  return {
    types: [types.LOAD_REPO_TREE, types.LOAD_REPO_TREE_SUCCESS, types.LOAD_REPO_TREE_FAIL],
    promise: repo.getTree(data.username, data.reponame),
  };
}

export function readRepoTree(data) {
  return {
    types: [types.READ_REPO_TREE, types.READ_REPO_TREE_SUCCESS, types.READ_REPO_TREE_FAIL],
    promise: repo.readTree(data.username, data.reponame, data.path),
  };
}

export function readRepoBlob(data) {
  return {
    types: [types.READ_REPO_BLOB, types.READ_REPO_BLOB_SUCCESS, types.READ_REPO_BLOB_FAIL],
    promise: repo.readBlob(data.username, data.reponame, data.path),
  };
}

export function readRepoBlobCommit(data) {
  return {
    types: [types.READ_REPO_BLOB_COMMIT, types.READ_REPO_BLOB_COMMIT_SUCCESS, types.READ_REPO_BLOB_COMMIT_FAIL],
    promise: repo.readBlobCommit(data.username, data.reponame, data.sha),
  };
}

export function addRepoBlob(data) {
  return {
    types: [types.ADD_REPO_BLOB, types.ADD_REPO_BLOB_SUCCESS, types.ADD_REPO_BLOB_FAIL],
    promise: repo.addBlob(data),
  };
}

export function updateRepoBlob(data) {
  return {
    types: [types.UPDATE_REPO_BLOB, types.UPDATE_REPO_BLOB_SUCCESS, types.UPDATE_REPO_BLOB_FAIL],
    promise: repo.writeBlob(data),
    data,
  };
}

export function removeRepoBlob(data) {
  return {
    types: [types.REMOVE_REPO_BLOB, types.REMOVE_REPO_BLOB_SUCCESS, types.REMOVE_REPO_BLOB_FAIL],
    promise: repo.removeBlob(data),
    data,
  };
}

export function clearRepoBlob() {
  return {
    type: types.CLEAR_REPO_BLOB,
  };
}
