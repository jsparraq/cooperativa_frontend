import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

import { Provider } from 'react-redux';
import store from '../store';

import Alerts from './layout/Alerts';
import PrivateRoute from './common/PrivateRoute';

import PartnersNotAccepted from './partnerNotAccepted';
import newsFeed from './newsFeed';

import Register from './accounts/Register';
import Login from './accounts/Login';

import { loadUser } from '../actions/auth';

const timeoutAlert = 3000;
const positionAlert = 'top center';

class App extends PureComponent {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <AlertProvider
          template={AlertTemplate}
          position={positionAlert}
          timeout={timeoutAlert}
        >
          <Router>
            <>
              <Alerts />
              <Switch>
                <PrivateRoute exact path="/" component={newsFeed} />
                <PrivateRoute
                  exact
                  path="/partnersNotAccepted"
                  component={PartnersNotAccepted}
                />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
              </Switch>
            </>
          </Router>
        </AlertProvider>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
