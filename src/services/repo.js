import storage from '../utils/localStorage';
import Github from 'github-api';

const b64decode = function(string) {
  const base64Decode = require('base-64').decode;
  const utf8Decode = require('utf8').decode;
  return utf8Decode(base64Decode(string))
}

const Repo = {

  getInfo(username, reponame) {
    const _leafAdmin = storage.get('_leafAdmin');
    const github = new Github({
       username: _leafAdmin.email,
       password: _leafAdmin.pass,
       auth: 'basic'
    });
    const repo = github.getRepo(username, reponame);
    return new Promise((resolve, reject) => {
      repo.show((err, repo) => {
        if (err) {
          reject(err);
        } else {
          console.log(repo);
          resolve(repo);
        }
      });
    });
  },

  getTree(username, reponame) {
    const _leafAdmin = storage.get('_leafAdmin');
    const github = new Github({
       username: _leafAdmin.email,
       password: _leafAdmin.pass,
       auth: 'basic'
    });
    const repo = github.getRepo(username, reponame);
    return new Promise((resolve, reject) => {
      repo.getTree('master', (err, tree) => {
        if (err) {
          reject(err);
        } else {

          resolve(tree);
        }
      });
    });
  },

  readTree(username, reponame, path) {
    const _leafAdmin = storage.get('_leafAdmin');
    const github = new Github({
       username: _leafAdmin.email,
       password: _leafAdmin.pass,
       auth: 'basic'
    });
    const repo = github.getRepo(username, reponame);
    return new Promise((resolve, reject) => {
      repo.read('master', path, (err, file) => {
        if (err) {
          reject(err);
        } else {
          resolve(file);
        }
      });
    });
  },

  readBlob(username, reponame, path) {
    const _leafAdmin = storage.get('_leafAdmin');
    const github = new Github({
       username: _leafAdmin.email,
       password: _leafAdmin.pass,
       auth: 'basic'
    });
    const repo = github.getRepo(username, reponame);
    return new Promise((resolve, reject) => {
      repo.contents('master', path, (err, file) => {
        if (err) {
          reject(err);
        } else {
          file.content = b64decode(file.content);
          resolve(file);
        }
      });
    });
  },

  addBlob(data) {
    const _leafAdmin = storage.get('_leafAdmin');
    const github = new Github({
      username: _leafAdmin.email,
      password: _leafAdmin.pass,
      auth: 'basic'
    });
    const repo = github.getRepo(data.username, data.reponame);
    const options = {
      author: {name: data.username, email: data.email},
      committer: {name: data.username, email: data.email},
    }
    return new Promise((resolve, reject) => {
      repo.write('master', data.path, data.content, '[Leafeon]: Add post', options, (err, file) => {
        if (err) {
          reject(err);
        } else {
          resolve(file);
        }
      });
    });
  },

  readBlobCommit(username, reponame, sha) {
    const _leafAdmin = storage.get('_leafAdmin');
    const github = new Github({
       username: _leafAdmin.email,
       password: _leafAdmin.pass,
       auth: 'basic'
    });
    const repo = github.getRepo(username, reponame);
    return new Promise((resolve, reject) => {
      repo.getCommit('master', sha, (err, commit) => {
        console.log(commit);
        if (err) {
          reject(err);
        } else {
          resolve(commit);
        }
      });
    });
  },

  writeBlob(data) {
    const _leafAdmin = storage.get('_leafAdmin');
    const github = new Github({
      username: _leafAdmin.email,
      password: _leafAdmin.pass,
      auth: 'basic'
    });
    const repo = github.getRepo(data.username, data.reponame);
    const options = {
      author: {name: data.username, email: data.email},
      committer: {name: data.username, email: data.email},
    }
    return new Promise((resolve, reject) => {
      repo.write('master', data.path, data.content, '[Leafeon]: Update post', options, (err, file) => {
        if (err) {
          reject(err);
        } else {
          resolve(file);
        }
      });
    });
  },

  removeBlob(data) {
    const _leafAdmin = storage.get('_leafAdmin');
    const github = new Github({
      username: _leafAdmin.email,
      password: _leafAdmin.pass,
      auth: 'basic'
    });
    const repo = github.getRepo(data.username, data.reponame);
    return new Promise((resolve, reject) => {
      repo.remove('master', data.path, (err, file) => {
        if (err) {
          reject(err);
        } else {
          resolve(file);
        }
      });
    });
  }

}

module.exports = Repo;
