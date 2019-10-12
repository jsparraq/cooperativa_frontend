import React, { PureComponent } from 'react';

class Header extends PureComponent {
  render() {
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <a className="navbar-brand" href="/">Cooperativa</a>
      </nav>
    );
  }
}

export default Header;