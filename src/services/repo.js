import storage from '../utils/localStorage';
import Github from 'github-api/dist/github.min';

const b64decode = (string) => {
  const base64Decode = require('base-64').decode;
  const utf8Decode = require('utf8').decode;
  return utf8Decode(base64Decode(string));
};

const Repo = {

  init() {
    const _leafAdmin = storage.get('_leafAdmin');
    const github = new Github({
      username: _leafAdmin.email,
      password: _leafAdmin.pass,
      auth: 'basic',
    });
    this.github = github;
  },

  getInfo(username, reponame) {
    const repo = this.github.getRepo(username, reponame);
    return new Promise((resolve, reject) => {
      repo.show((err, repoData) => {
        if (err) {
          reject(err);
        } else {
          resolve(repoData);
        }
      });
    });
  },

  getTree(username, reponame) {
    const repo = this.github.getRepo(username, reponame);
    return new Promise((resolve, reject) => {
      repo.getTree('master', (err, treeData) => {
        if (err) {
          reject(err);
        } else {
          resolve(treeData);
        }
      });
    });
  },

  readTree(username, reponame, path) {
    const repo = this.github.getRepo(username, reponame);
    return new Promise((resolve, reject) => {
      repo.read('master', path, (err, file) => {
        if (err) {
          reject(err);
        } else {
          const tree = file.reverse();
          resolve(tree);
        }
      });
    });
  },

  readBlob(username, reponame, path) {
    const repo = this.github.getRepo(username, reponame);
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
    const repo = this.github.getRepo(data.username, data.reponame);
    const options = {
      author: {
        name: data.username,
        email: data.email,
      },
      committer: {
        name: data.username,
        email: data.email,
      },
    };

    return new Promise((resolve, reject) => {
      repo.write('master', data.path, data.content, '[log]: Add post', options, (err, file) => {
        if (err) {
          reject(err);
        } else {
          resolve(file);
        }
      });
    });
  },

  readBlobCommit(username, reponame, sha) {
    const repo = this.github.getRepo(username, reponame);
    return new Promise((resolve, reject) => {
      repo.getCommit('master', sha, (err, commit) => {
        if (err) {
          reject(err);
        } else {
          resolve(commit);
        }
      });
    });
  },

  writeBlob(data) {
    const repo = this.github.getRepo(data.username, data.reponame);
    const options = {
      author: {
        name: data.username,
        email: data.email
      },
      committer: {
        name: data.username,
        email: data.email
      },
    };
    return new Promise((resolve, reject) => {
      repo.write('master', data.path, data.content, '[log]: Update post', options, (err, file) => {
        if (err) {
          reject(err);
        } else {
          resolve(file);
        }
      });
    });
  },

  removeBlob(data) {
    const repo = this.github.getRepo(data.username, data.reponame);
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
};

Repo.init();
module.exports = Repo;
