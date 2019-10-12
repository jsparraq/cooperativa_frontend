import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addUser } from '../../actions/users';

const propTypes = {
  addUserForm: PropTypes.func.isRequired,
};

export class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
    };
  }

  onChange = (event) => this.setState({ [event.target.name]: event.target.value });

  onSubmit = (event) => {
    event.preventDefault();
    const { addUserForm } = this.props;
    const { name, email, password } = this.state;
    const user = { name, email, password };
    addUserForm(user);
  };

  render() {
    const { name, email, password } = this.state;
    return (
      <div className="card card-body mt-4 mb-4">
        <h2>Add User</h2>
        <form onSubmit={this.onSubmit}>
          <label htmlFor="name">
            Name
            <input
              className="form-control"
              type="text"
              name="name"
              onChange={this.onChange}
              value={name}
            />
          </label>
          <br />
          <label htmlFor="email">
            Email
            <input
              className="form-control"
              type="email"
              name="email"
              onChange={this.onChange}
              value={email}
            />
          </label>
          <br />
          <label htmlFor="password">
            password
            <input
              className="form-control"
              type="password"
              name="password"
              onChange={this.onChange}
              value={password}
            />
          </label>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Create user
            </button>
          </div>
        </form>
      </div>
    );
  }
}

Form.propTypes = propTypes;

export default connect(
  null,
  { addUserForm: addUser },
)(Form);
