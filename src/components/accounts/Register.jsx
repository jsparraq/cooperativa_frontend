import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createPartner } from '../../actions/partner/creator';
import { createMessage } from '../../actions/utils/messages';
import './Login.css';

export class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      createPartnerForm: false,
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
      this.setState({
        name: '',
        email: '',
        password: '',
        password2: '',
        createPartnerForm: true,
      });
    }
  };

  onChange = (event) => this.setState({ [event.target.name]: event.target.value });

  render() {
    const { password2, password } = this.state;
    const { name, email, createPartnerForm } = this.state;
    const { isAuthenticated } = this.props;

    if (isAuthenticated || createPartnerForm) {
      return <Redirect to="/" />;
    }
    return (
      <div className="container-login100">
        <div className="wrap-login100">
          <div className="login100-form-title">
            <span className="login100-form-title-1">Register</span>
          </div>
          <form onSubmit={this.onSubmit} className="login100-form">
            <div className="wrap-input100 m-b-26">
              <span className="label-input100">Name</span>
              <input
                type="text"
                className="input100"
                name="name"
                id="name"
                onChange={this.onChange}
                value={name}
              />
            </div>
            <div className="wrap-input100 m-b-18">
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
            <div className="wrap-input100 m-b-18">
              <span className="label-input100">Confirm password</span>
              <input
                type="password"
                className="input100"
                name="password2"
                onChange={this.onChange}
                value={password2}
              />
            </div>
            <div className="form-group container-login100-form-btn m-t-17">
              <button type="submit" className="login100-form-btn">
                Register
              </button>
            </div>
            <p className="account-class">
              Already have an account?
              <> </>
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
  { createUserRegister: createPartner, createMessageRegister: createMessage },
)(Register);
