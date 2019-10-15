import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Proptypes from 'prop-types';
import { logout } from '../../actions/auth';

class Header extends PureComponent {
  render() {
    const { auth, logoutHeader } = this.props;
    const { isAuthenticated, user } = auth;
    const role = user !== null ? user.role : '';
    let authLinks;

    if (role === 'Admin') {
      authLinks = (
        <>
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item active">
              <Link to="/partnersNotAccepted" className="nav-link">
                Partners Not Accepted
              </Link>
            </li>
          </ul>
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
        </>
      );
    } else {
      authLinks = (
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
    }

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
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="/">
          Cooperativa
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#linksNavbar"
          aria-controls="linksNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="linksNavbar">
          {isAuthenticated ? authLinks : guestLinks}
        </div>
      </nav>
    );
  }
}

Header.propTypes = {
  logoutHeader: Proptypes.func.isRequired,
  auth: Proptypes.shape({
    isAuthenticated: Proptypes.bool.isRequired,
    user: Proptypes.shape({
      name: Proptypes.string.isRequired,
      role: Proptypes.string.isRequired,
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
