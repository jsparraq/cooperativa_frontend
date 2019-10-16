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
        <div className="wrap-login100 p-l-110 p-r-110 p-t-62 p-b-33">
          <form
            onSubmit={this.onSubmit}
            className="login100-form validate-form flex-sb flex-w"
          >
            <span className="login100-form-title">Login</span>
            <div className="p-b-9">
              <span className="txt1">Email</span>
            </div>
            <div className="wrap-input100">
              <input
                type="email"
                className="form-control input100"
                name="email"
                onChange={this.onChange}
                value={email}
              />
            </div>
            <div className="p-t-13 p-b-9">
              <span className="txt1">Password</span>
            </div>
            <div className="wrap-input100">
              <input
                type="password"
                className="form-control input100"
                name="password"
                onChange={this.onChange}
                value={password}
              />
            </div>
            <div className="form-group container-login100-form-btn m-t-17">
              <button type="submit" className="login100-form-btn">
                Login
              </button>
            </div>
            <p>
              Do not have an account?
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
