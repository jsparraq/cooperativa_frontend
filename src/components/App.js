import React, { Fragment, Component} from 'react';
import ReactDOM from "react-dom";

import Header from './layout/Header';

class App extends Component {
  render(){
    return (
      <div className="App">
        <Fragment>
          <Header />
          <div className='container'>
            <h1>Hello</h1>
          </div>
        </Fragment>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
