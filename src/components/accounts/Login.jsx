import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

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
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { isAuthenticated } = this.props;
    if (isAuthenticated) {
      return <Redirect to="/" />;
    }
    const { email, password } = this.state;
    return (
      <div className="col-md-6 m-auto">
        <div className="card card-body mt-5">
          <h2 className="text-center">Login</h2>
          <form onSubmit={this.onSubmit}>
            <label htmlFor="email">
              Email
              <input
                type="email"
                className="form-control"
                name="email"
                onChange={this.onChange}
                value={email}
              />
            </label>
            <br />
            <label htmlFor="email">
              Password
              <input
                type="password"
                className="form-control"
                name="password"
                onChange={this.onChange}
                value={password}
              />
            </label>
            <div className="form-group">
              <button type="submit" className="btn btn-primary">
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
