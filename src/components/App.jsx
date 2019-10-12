import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import Header from './layout/Header';
import Dashboard from './users/Dashboard';

import store from '../store';

class App extends PureComponent {
  render() {
    return (
      <Provider store={store}>
        <>
          <Header />
          <div className="container">
            <Dashboard />
          </div>
        </>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
