import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';

import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

import { Provider } from 'react-redux';
import Header from './layout/Header';
import Dashboard from './users/Dashboard';
import Alerts from './layout/Alerts';

import store from '../store';

const alertOption = {
  timeout: 3000,
  position: 'top center',
};

class App extends PureComponent {
  render() {
    return (
      <Provider store={store}>
        <AlertProvider
          template={AlertTemplate}
          position={alertOption.position}
          timeout={alertOption.timeout}
        >
          <>
            <Header />
            <Alerts />
            <div className="container">
              <Dashboard />
            </div>
          </>
        </AlertProvider>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
