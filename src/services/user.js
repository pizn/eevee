import storage from '../utils/localStorage';
import Github from 'github-api';

const User = {
  getInfo() {
    const _leafAdmin = storage.get('_leafAdmin');
    const github = new Github({
       username: _leafAdmin.email,
       password: _leafAdmin.pass,
       auth: 'basic'
    });
    const user = github.getUser();
    return new Promise((resolve, reject) => {
      user.show(null, (err, user) => {
        if (err) {
          reject(err);
        } else {
          resolve(user);
        }
      });
    });
  },


}

module.exports = User;
