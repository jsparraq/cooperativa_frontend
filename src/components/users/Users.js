import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Proptypes from "prop-types";
import { getUsers, deleteUser } from "../../actions/users";

export class Leads extends Component {
  static propTypes = {
    users: Proptypes.array.isRequired,
    getUsers: Proptypes.func.isRequired,
    deleteUser: Proptypes.func.isRequired
  };

  componentDidMount() {
    this.props.getUsers();
  }

  render() {
    return (
      <Fragment>
        <h2>Leads lists</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {this.props.users.map(user => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button
                    onClick={this.props.deleteUser.bind(this, user._id)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users.users
});

export default connect(
  mapStateToProps,
  { getUsers, deleteUser }
)(Leads);