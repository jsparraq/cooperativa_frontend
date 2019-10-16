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
        <div className="wrap-login100 p-l-110 p-r-110 p-t-62 p-b-33">
          <form
            onSubmit={this.onSubmit}
            className="login100-form flex-sb flex-w"
          >
            <span className="login100-form-title">Register</span>
            <div className="p-b-9">
              <span className="txt1">Name</span>
            </div>
            <div className="wrap-input100">
              <input
                type="text"
                className="form-control input100"
                name="name"
                id="name"
                onChange={this.onChange}
                value={name}
              />
            </div>
            <div className="p-t-31 p-b-9">
              <span className="txt1">Email</span>
            </div>
            <div className="wrap-input100">
              <input
                type="email"
                className="form-control"
                name="email"
                onChange={this.onChange}
                value={email}
              />
            </div>
            <div className="p-t-31 p-b-9">
              <span className="txt1">password</span>
            </div>
            <div className="wrap-input100">
              <input
                type="password"
                className="form-control"
                name="password"
                onChange={this.onChange}
                value={password}
              />
            </div>
            <div className="p-t-31 p-b-9">
              <span className="txt1">Confirm password</span>
            </div>
            <div className="wrap-input100">
              <input
                type="password"
                className="form-control"
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
  { createUserRegister: createPartner, createMessageRegister: createMessage },
)(Register);
