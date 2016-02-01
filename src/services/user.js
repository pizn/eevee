import storage from '../utils/localStorage';
import Github from 'github-api/dist/github.min';

const User = {

  init() {
    const _leafAdmin = storage.get('_leafAdmin');
    const github = new Github({
      username: _leafAdmin.email,
      password: _leafAdmin.pass,
      auth: 'basic',
    });
    this.github = github;
  },

  getInfo() {
    const user = this.github.getUser();
    return new Promise((resolve, reject) => {
      user.show(null, (err, userData) => {
        if (err) {
          reject(err);
        } else {
          resolve(userData);
        }
      });
    });
  },

  checkRepo(username) {
    const user = this.github.getUser();
    var options = {
      type: 'owner',
      sort: 'updated',
      per_page: 1000,
      page: 1,
    };
    const rule = username + '.github.';
    return new Promise((resolve, reject) => {
      user.repos(options, (err, repos) => {
        if (err) {
          reject(err);
        } else {
          let status = false;
          let result;
          repos.map(item => {
            if (item.name.indexOf(rule) === 0) {
              status = true;
              result = item;
            }
          });
          if (status) {
            resolve(result);
          } else {
            reject({
              error: 404,
              message: 'Not found',
            });
          }
        }
      });
    });
  }
};

User.init();
module.exports = User;
