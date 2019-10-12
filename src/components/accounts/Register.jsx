import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createUser } from '../../actions/auth';
import { createMessage } from '../../actions/messages';

export class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
    };
  }

  onSubmit = (event) => {
    event.preventDefault();
    const { createMessageRegister, createUserRegister } = this.props;
    const { password2, password } = this.state;
    const { name, email } = this.state;
    if (password2 !== password) {
      createMessageRegister({ passwordNotMatch: "Passwords don't match" });
    } else {
      const newUser = { name, email, password };
      createUserRegister(newUser);
    }
  };

  onChange = (event) => this.setState({ [event.target.name]: event.target.value });

  render() {
    const { password2, password } = this.state;
    const { name, email } = this.state;
    const { isAuthenticated } = this.props;
    if (isAuthenticated) {
      return <Redirect to="/" />;
    }
    return (
      <div className="col-md-6 m-auto">
        <div className="card card-body mt-5">
          <h2 className="text-center">Register</h2>
          <form onSubmit={this.onSubmit}>
            <label htmlFor="name">
              Name
              <input
                type="text"
                className="form-control"
                name="name"
                onChange={this.onChange}
                value={name}
              />
            </label>
            <br />
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
            <br />
            <label htmlFor="email">
              Confirm Password
              <input
                type="password"
                className="form-control"
                name="password2"
                onChange={this.onChange}
                value={password2}
              />
            </label>
            <div className="form-group">
              <button type="submit" className="btn btn-primary">
                Register
              </button>
            </div>
            <p>
              Already have an account?
              <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  createUserRegister: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  createMessageRegister: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(
  mapStateToProps,
  { createUserRegister: createUser, createMessageRegister: createMessage },
)(Register);
