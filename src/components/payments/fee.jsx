import React, { Component } from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import { createFee } from '../../actions/fee/creator';
import { returnErrors } from '../../actions/utils/messages';
import { formatCurrency } from '../utils';

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
    if (userId === '') {
      returnErrorsPayments("You don't select some partner", 500);
    }
  }

  payFee = (e) => {
    e.preventDefault();
    const { userId, createFeePayments, returnErrorsPayments } = this.props;
    const { interest, admin } = this.props;
    const { payment } = this.state;
    const { loanId } = this.props;
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
    const { interest, admin, payment } = this.props;
    const { paymentFee } = this.state;
    const { userId } = this.props;
    let total = parseInt(paymentFee, 10) + parseInt(interest, 10) + parseInt(admin, 10);
    if (paymentFee === undefined || Number.isNaN(total)) {
      total = parseInt(interest, 10) + parseInt(admin, 10);
    }
    let disableButton;
    if (userId === '' || paymentFee === 0) {
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
            className={disableButton}
            onClick={this.payFee}
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
  returnErrorsPayments: Proptypes.func.isRequired,
  payment: Proptypes.number.isRequired,
  interest: Proptypes.number.isRequired,
  admin: Proptypes.number.isRequired,
  loanId: Proptypes.string.isRequired,
  createFeePayments: Proptypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  interest: state.fee.fee.interest,
  payment: state.fee.fee.payment,
  admin: state.fee.fee.admin,
  loanId: state.fee.fee.loanId,
});

export default connect(
  mapStateToProps,
  {
    returnErrorsPayments: returnErrors,
    createFeePayments: createFee,
  },
)(Fee);
