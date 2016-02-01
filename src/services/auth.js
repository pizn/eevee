import storage from '../utils/localStorage';
import Github from 'github-api/dist/github.min';
import assign from 'object-assign';

const authorization = {

  login(auth) {
    return new Promise((resolve, reject) => {
      const github = new Github({
        username: auth.email,
        password: auth.pass,
        auth: 'basic'
      });
      const user = github.getUser();
      user.show(null, (err, repodata) => {
        if (err) {
          reject(err);
        } else {
          storage.set('_leafAdmin', {
            email: auth.email,
            pass: auth.pass,
            loggedIn: false,
          });
          resolve(repodata);
        }
      });
    });
  },

  loginDone() {
    let _leafAdmin = storage.get('_leafAdmin');
    _leafAdmin = assign({}, _leafAdmin, {
      loggedIn: true,
    });
    storage.set('_leafAdmin', _leafAdmin);
  },

  logout() {
    return new Promise((resolve) => {
      storage.remove('_leafAdmin');
      resolve();
    });
  },

  loggedIn() {
    const admin = storage.get('_leafAdmin');
    if (admin.loggedIn) {
      return true;
    }
    return false;
  },
};

module.exports = authorization;
