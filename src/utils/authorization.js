import storage from './localStorage';

const authorization = {

  login(auth) {
    storage.set('_leafAdmin', {
      email: auth.email,
      pass: auth.pass,
      loggedIn: true,
    });
  },

  logout() {
    storage.remove('_leafAdmin');
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
