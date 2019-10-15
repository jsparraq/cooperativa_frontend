import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createPartner } from '../../actions/partner/creator';
import { createMessage } from '../../actions/utils/messages';
import { labelStyle } from '../styles/utils';

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
      <div className="col-md-6 m-auto">
        <div className="card card-body mt-5">
          <h2 className="text-center">Register Partner</h2>
          <form onSubmit={this.onSubmit}>
            <label htmlFor="name" style={labelStyle}>
              Name
              <input
                type="text"
                className="form-control"
                name="name"
                id="name"
                onChange={this.onChange}
                value={name}
              />
            </label>
            <br />
            <label htmlFor="email" style={labelStyle}>
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
            <label htmlFor="password" style={labelStyle}>
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
  { createUserRegister: createPartner, createMessageRegister: createMessage },
)(Register);
