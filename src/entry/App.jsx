import React from 'react';
import ReactDOM from 'react-dom';

import { Router, Route, IndexRoute, Redirect } from 'react-router';
import createHistory from 'history/lib/createHashHistory';

import configureStore from '../stores';
import { Provider } from 'react-redux';

import Leaf from './Leaf';
import Desktop from '../containers/Desktop';
import Login from '../containers/Login';

import authorization from '../utils/authorization';
import '../common/lib';

const history = createHistory({
  queryKey: false,
});

const store = configureStore();

function requireAuth(nextState, replace) {
  if (!authorization.loggedIn()) {
    replace({ nextPathname: nextState.location.pathname }, '/login', nextState.location.query);
  }
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Redirect from="/" to="desktop" />
      <Route path="desktop" component={Desktop} onEnter={requireAuth} />
      <Route path="login" component={Login} />
    </Router>
  </Provider>,
  document.getElementById('leaf')
);
