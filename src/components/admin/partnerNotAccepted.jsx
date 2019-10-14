import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Proptypes from 'prop-types';
import { denyPartner } from '../../actions/partner/deleter';
import { acceptPartner } from '../../actions/partner/updater';
import { getPartnersNotAccepted } from '../../actions/partner/reader';

export class Users extends Component {
  componentDidMount() {
    const { getUsersComponent } = this.props;
    getUsersComponent();
  }

  render() {
    const { role } = this.props;
    if (role === 'Partner') {
      return <Redirect to="/" />;
    }
    const {
      partners,
      deleteUserComponent,
      acceptPartnerComponent,
    } = this.props;
    return (
      <>
        <h2>Users lists</h2>
        <table className="table table-striped">
          <thead className="thead-dark">
            <tr>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Fecha de solicitud</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {partners.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {new Intl.DateTimeFormat('en-GB', {
                    month: 'long',
                    day: '2-digit',
                    year: 'numeric',
                    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                    hour: '2-digit',
                    minute: '2-digit',
                    hourCycle: 'h12',
                  }).format(new Date(user.createdAt))}
                </td>
                <td>
                  <button
                    onClick={deleteUserComponent.bind(this, user._id)}
                    className="btn btn-danger btn-sm"
                    type="button"
                  >
                    Delete
                  </button>
                  <> </>
                  <button
                    onClick={acceptPartnerComponent.bind(this, user._id)}
                    className="btn btn-success btn-sm"
                    type="button"
                  >
                    Aceptar
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
  role: Proptypes.string.isRequired,
  partners: Proptypes.arrayOf(
    Proptypes.shape({
      _id: Proptypes.string.isRequired,
      name: Proptypes.string.isRequired,
      email: Proptypes.string.isRequired,
      createdAt: Proptypes.string.isRequired,
    }),
  ).isRequired,
  getUsersComponent: Proptypes.func.isRequired,
  deleteUserComponent: Proptypes.func.isRequired,
  acceptPartnerComponent: Proptypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  partners: state.partners.partners,
  role: state.auth.user.role,
});

export default connect(
  mapStateToProps,
  {
    getUsersComponent: getPartnersNotAccepted,
    deleteUserComponent: denyPartner,
    acceptPartnerComponent: acceptPartner,
  },
)(Users);
