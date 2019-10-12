import React, { Component } from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import { getUsers, deleteUser } from '../../actions/users';

export class Users extends Component {
  componentDidMount() {
    const { getUsersComponent } = this.props;
    getUsersComponent();
  }

  render() {
    const { users, deleteUserComponent } = this.props;
    return (
      <>
        <h2>Leads lists</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button
                    onClick={deleteUserComponent.bind(this, user._id)}
                    className="btn btn-danger btn-sm"
                    type="button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }
}

Users.propTypes = {
  users: Proptypes.arrayOf(
    Proptypes.shape({
      _id: Proptypes.string.isRequired,
      name: Proptypes.string.isRequired,
      email: Proptypes.string.isRequired,
    }),
  ).isRequired,
  getUsersComponent: Proptypes.func.isRequired,
  deleteUserComponent: Proptypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  users: state.users.users,
});

export default connect(
  mapStateToProps,
  { getUsersComponent: getUsers, deleteUserComponent: deleteUser },
)(Users);
