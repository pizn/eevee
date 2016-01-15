import storage from '../utils/localStorage';
import Github from 'github-api';

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
  }

}

module.exports = Repo;
