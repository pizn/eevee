import storage from './localStorage';

const authorization = {

  login(auth) {
    storage.set('_larkAdmin', {
      email: auth.email,
      pass: auth.pass,
      loggedIn: true,
    });
  },

  logout() {
    storage.remove('_larkAdmin');
  },

  loggedIn() {
    const admin = storage.get('_larkAdmin');
    if (admin.loggedIn) {
      return true;
    }
    return false;
  },
};

module.exports = authorization;
