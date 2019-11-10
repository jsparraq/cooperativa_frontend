import React, { Component } from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import { getFee } from '../../actions/fee/reader';
import { returnErrors } from '../../actions/utils/messages';
import { formatCurrency } from '../utils';

class Fee extends Component {
  componentDidMount() {
    const { userId, returnErrorsPayments } = this.props;
    if (userId === '') {
      returnErrorsPayments("You don't select some partner", 500);
    }
  }

  componentDidUpdate(prevProps) {
    const { userId, getFeePayment } = this.props;
    if (userId !== prevProps.userId && userId !== '') {
      getFeePayment(userId);
    }
  }

  render() {
    const { payment, interest, admin } = this.props;
    const { userId } = this.props;
    const total = payment + interest + admin;
    let disableButton;
    if (userId === '') {
      disableButton = 'btn btn-outline-success disabled savings-btn btn-block';
    } else {
      disableButton = 'btn btn-outline-success savings-btn btn-block';
    }
    return (
      <div className="card">
        <div className="card-header">Fee</div>
        <div className="card-body">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Topic</th>
                <th scope="col" style={{ width: '50%' }}>
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Payment</td>
                <td>{formatCurrency(`${payment}`)}</td>
              </tr>
              <tr>
                <td>Interest</td>
                <td>{formatCurrency(`${interest}`)}</td>
              </tr>
              <tr>
                <td>Admin</td>
                <td>{formatCurrency(`${admin}`)}</td>
              </tr>
              <tr>
                <td>
                  <strong>Total</strong>
                </td>
                <td>
                  <strong>{formatCurrency(`${total}`)}</strong>
                </td>
              </tr>
            </tbody>
          </table>
          <button
            type="button"
            className={disableButton}
            style={{ width: '20%', marginLeft: '70%' }}
          >
            Fee saving
          </button>
        </div>
      </div>
    );
  }
}

Fee.propTypes = {
  userId: Proptypes.string.isRequired,
  getFeePayment: Proptypes.func.isRequired,
  returnErrorsPayments: Proptypes.func.isRequired,
  payment: Proptypes.number.isRequired,
  interest: Proptypes.number.isRequired,
  admin: Proptypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  payment: state.fee.fee.payment,
  interest: state.fee.fee.interest,
  admin: state.fee.fee.admin,
});

export default connect(
  mapStateToProps,
  {
    getFeePayment: getFee,
    returnErrorsPayments: returnErrors,
  },
)(Fee);
