import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Proptypes from 'prop-types';
import { logout } from '../../actions/auth';

class Header extends PureComponent {
  render() {
    const { auth, logoutHeader } = this.props;
    const { isAuthenticated, user } = auth;

    const authLinks = (
      <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
        <span className="navbar-text mr-3">
          <strong>{user ? `Welcome ${user.name}` : ''}</strong>
        </span>
        <li className="nav-item">
          <button
            onClick={logoutHeader}
            className="nav-link btn btn-info btn-sm text-light"
            type="button"
          >
            Logout
          </button>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
        <li className="nav-item">
          <Link to="/register" className="nav-link">
            Register
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/login" className="nav-link">
            Login
          </Link>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <a className="navbar-brand" href="/">
          Cooperativa
        </a>
        {isAuthenticated ? authLinks : guestLinks}
      </nav>
    );
  }
}

Header.propTypes = {
  logoutHeader: Proptypes.func.isRequired,
  auth: Proptypes.shape({
    isAuthenticated: Proptypes.bool.isRequired,
    user: Proptypes.shape({
      _id: Proptypes.string.isRequired,
      name: Proptypes.string.isRequired,
      email: Proptypes.string.isRequired,
    }),
  }).isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(
  mapStateToProps,
  { logoutHeader: logout },
)(Header);
