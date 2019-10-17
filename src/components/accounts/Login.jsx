import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import './Login.css';

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    const { loginForm } = this.props;
    loginForm(email, password);
    this.setState({
      password: '',
    });
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { isAuthenticated } = this.props;
    if (isAuthenticated) {
      return <Redirect to="/" />;
    }
    const { email, password } = this.state;
    return (
      <div className="container-login100">
        <div className="wrap-login100">
          <div className="login100-form-title">
            <span className="login100-form-title-1">Login</span>
          </div>
          <form onSubmit={this.onSubmit} className="login100-form">
            <div className="wrap-input100 m-b-26">
              <span className="label-input100">Email</span>
              <input
                type="email"
                className="input100"
                name="email"
                onChange={this.onChange}
                value={email}
              />
            </div>
            <div className="wrap-input100 m-b-18">
              <span className="label-input100">Password</span>
              <input
                type="password"
                className="input100"
                name="password"
                onChange={this.onChange}
                value={password}
              />
            </div>
            <div className="container-login100-form-btn">
              <button type="submit" className="login100-form-btn">
                Login
              </button>
            </div>
            <p className="account-class">
              Do not have an account?
              <> </>
              <Link to="/register">Register</Link>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginForm: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(
  mapStateToProps,
  { loginForm: login },
)(Login);
