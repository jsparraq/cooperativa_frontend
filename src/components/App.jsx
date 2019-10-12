import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

import { Provider } from 'react-redux';
import Header from './layout/Header';
import Dashboard from './users/Dashboard';
import Alerts from './layout/Alerts';
import Register from './accounts/Register';
import Login from './accounts/Login';
import PrivateRoute from './common/PrivateRoute';

import store from '../store';

const timeoutAlert = 3000;
const positionAlert = 'top center';

class App extends PureComponent {
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
              <Header />
              <Alerts />
              <div className="container">
                <Switch>
                  <PrivateRoute exact path="/" component={Dashboard} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/register" component={Register} />
                </Switch>
              </div>
            </>
          </Router>
        </AlertProvider>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
