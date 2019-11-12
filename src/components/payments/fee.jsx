import React, { Component } from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import { createFee } from '../../actions/fee/creator';
import { getLoan } from '../../actions/loan/reader';
import { returnErrors } from '../../actions/utils/messages';
import { formatCurrency } from '../utils';
import LoanInfo from './loanInfo';

class Fee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paymentFee: 0,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidUpdate() {
    const { userId, returnErrorsPayments } = this.props;
    const { fee, getLoanPayment } = this.props;
    if (userId === '') {
      returnErrorsPayments("You don't select some partner", 500);
    }
    getLoanPayment(fee.loanId);
  }

  payFee = (e) => {
    e.preventDefault();
    const { userId, createFeePayments, returnErrorsPayments } = this.props;
    const { fee } = this.props;
    const { interest, admin, loanId } = fee;
    const { payment } = this.state;
    if (userId === '' || payment === 0) {
      returnErrorsPayments("You don't select some partner", 500);
    } else {
      createFeePayments(payment, interest, 0, admin, loanId);
    }
  };

  handleChange(event) {
    this.setState({ paymentFee: event.target.value });
  }

  render() {
    const { fee } = this.props;
    const { interest, admin, payment } = fee;
    const { paymentFee } = this.state;
    const { userId } = this.props;
    let total = parseInt(paymentFee, 10) + parseInt(interest, 10) + parseInt(admin, 10);
    if (paymentFee === undefined || Number.isNaN(total)) {
      total = parseInt(interest, 10) + parseInt(admin, 10);
    }
    let disable;
    if (userId === '' || interest === 0) {
      disable = true;
    } else {
      disable = false;
    }
    return (
      <div className="card">
        <div className="card-header">
          <>
            <>Fee</>
            <>
              <LoanInfo userId={userId} />
            </>
          </>
        </div>
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
                <td>
                  <input
                    type="Number"
                    value={paymentFee}
                    placeholder={payment}
                    onChange={this.handleChange}
                  />
                </td>
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
            className="btn btn-outline-success savings-btn btn-block"
            onClick={this.payFee}
            style={{ width: '20%', marginLeft: '70%' }}
            disabled={disable}
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
  returnErrorsPayments: Proptypes.func.isRequired,
  getLoanPayment: Proptypes.func.isRequired,
  fee: Proptypes.shape({
    payment: Proptypes.number.isRequired,
    interest: Proptypes.number.isRequired,
    admin: Proptypes.number.isRequired,
    loanId: Proptypes.string.isRequired,
  }).isRequired,
  createFeePayments: Proptypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  fee: state.fee.fee,
});

export default connect(
  mapStateToProps,
  {
    returnErrorsPayments: returnErrors,
    createFeePayments: createFee,
    getLoanPayment: getLoan,
  },
)(Fee);
