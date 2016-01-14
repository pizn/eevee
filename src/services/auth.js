import storage from '../utils/localStorage';
import Github from 'github-api';

const authorization = {

  login(auth) {
    return new Promise((resolve, reject) => {
      const github = new Github({
         username: auth.email,
         password: auth.pass,
         auth: 'basic'
      });
      const user = github.getUser();
      user.show(null, (err, user) => {
        if (err) {
          reject(err);
        } else {
          storage.set('_leafAdmin', {
            email: auth.email,
            pass: auth.pass,
            loggedIn: true,
          });
          resolve(user);
        }
      });
    });
  },

  logout() {
    console.log('logout');
    return new Promise((resolve, reject) => {
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
