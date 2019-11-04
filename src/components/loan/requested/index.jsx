import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Proptypes from 'prop-types';
import { getLoansNotAccepted } from '../../../actions/loan/reader';
import { denyLoan } from '../../../actions/loan/deleter';
import { acceptLoan } from '../../../actions/loan/updater';
import { months } from '../../utils';

export class Users extends Component {
  componentDidMount() {
    const { getLoansComponent } = this.props;
    getLoansComponent();
  }

  render() {
    const { role, denyLoanComponent, acceptLoanComponent } = this.props;
    if (role === 'Partner') {
      return <Redirect to="/" />;
    }
    const { loans } = this.props;
    return (
      <>
        <h2>Requested Loan</h2>
        <table className="table table-striped">
          <thead className="thead-dark">
            <tr>
              <th>Partner Name</th>
              <th>Amount</th>
              <th>Loan date</th>
              <th>Request date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loans.map((loan) => (
              <tr key={loan._id}>
                <td>{`${loan.userId.name} (${loan.userId.email})`}</td>
                <td>{loan.amount}</td>
                <td>{`${months[loan.month]} (${loan.year})`}</td>
                <td>
                  {new Intl.DateTimeFormat('en-GB', {
                    month: 'long',
                    day: '2-digit',
                    year: 'numeric',
                    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                    hour: '2-digit',
                    minute: '2-digit',
                    hourCycle: 'h12',
                  }).format(new Date(loan.createdAt))}
                </td>
                <td>
                  <button
                    onClick={acceptLoanComponent.bind(this, loan._id)}
                    className="btn btn-success btn-sm"
                    type="button"
                  >
                    Accept
                  </button>
                  <> </>
                  <button
                    onClick={denyLoanComponent.bind(this, loan._id)}
                    className="btn btn-danger btn-sm"
                    type="button"
                  >
                    Reject
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
  getLoansComponent: Proptypes.func.isRequired,
  denyLoanComponent: Proptypes.func.isRequired,
  acceptLoanComponent: Proptypes.func.isRequired,
  loans: Proptypes.arrayOf(
    Proptypes.shape({
      _id: Proptypes.string.isRequired,
      amount: Proptypes.number.isRequired,
      month: Proptypes.number.isRequired,
      year: Proptypes.number.isRequired,
      createdAt: Proptypes.string.isRequired,
      userId: Proptypes.shape({
        name: Proptypes.string.isRequired,
        email: Proptypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  ).isRequired,
};

const mapStateToProps = (state) => ({
  role: state.auth.user.role,
  loans: state.loan.loans,
});

export default connect(
  mapStateToProps,
  {
    getLoansComponent: getLoansNotAccepted,
    denyLoanComponent: denyLoan,
    acceptLoanComponent: acceptLoan,
  },
)(Users);
