import React from 'react';
import ReactDOM from 'react-dom';

import { Router, Route, IndexRoute, Redirect } from 'react-router';
import createHistory from 'history/lib/createHashHistory';

import configureStore from '../stores';
import { Provider } from 'react-redux';

import Leaf from './Leaf';
import Desktop from '../containers/Desktop';
import Post from '../containers/Post';
import Login from '../containers/Login';

import auth from '../services/auth';
import '../common/lib';

const history = createHistory({
  queryKey: false,
});

const store = configureStore();

function requireAuth(nextState, replace) {
  if (!auth.loggedIn()) {
    replace({ nextPathname: nextState.location.pathname }, '/login', nextState.location.query);
  }
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Redirect from="/" to="_posts" />
      <Route path="_posts" component={Desktop} onEnter={requireAuth} />
      <Route path="_posts/:name" component={Post} onEnter={requireAuth} />
      <Route path="login" component={Login} />
    </Router>
  </Provider>,
  document.getElementById('leaf')
);
