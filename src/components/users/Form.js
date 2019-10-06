import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addUser } from "../../actions/users";

export class Form extends Component {
  state = {
    name: "",
    email: "",
    password: ""
  };

  static propTypes = {
    addUser: PropTypes.func.isRequired
  };

  onChange = event =>
    this.setState({ [event.target.name]: event.target.value });

  onSubmit = event => {
    event.preventDefault();
    const { name, email, password } = this.state;
    const user = { name, email, password };
    this.props.addUser(user);
  };

  render() {
    const { name, email, password } = this.state;
    return (
      <div className="card card-body mt-4 mb-4">
        <h2>Add User</h2>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              className="form-control"
              type="text"
              name="name"
              onChange={this.onChange}
              value={name}
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              className="form-control"
              type="email"
              name="email"
              onChange={this.onChange}
              value={email}
            />
          </div>
          <div className="form-group">
            <label>password</label>
            <input
              className="form-control"
              type="password"
              name="password"
              onChange={this.onChange}
              value={password}
            />
          </div>
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

export default connect(
  null,
  { addUser }
)(Form);