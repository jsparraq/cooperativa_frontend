import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import { formatCurrency } from '../utils';

class LoanInfo extends PureComponent {
  render() {
    const { loan, userId, interest } = this.props;
    let disable;
    if (userId === '' || interest === 0) {
      disable = true;
    } else {
      disable = false;
    }
    const paidOut = loan.totalAmount - loan.amount;
    return (
      <>
        <button
          type="button"
          className="btn btn-primary col-1 right"
          data-toggle="modal"
          data-target="#loanInfo"
          disabled={disable}
          style={{ position: 'relative', left: '90%' }}
        >
          Loan info
        </button>
        <div
          className="modal fade"
          id="loanInfo"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="loanInfoTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="loanInfoTitle">
                  Loan info
                </h5>
              </div>
              <div className="modal-body">
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
                      <td>Total quantity</td>
                      <td>{formatCurrency(`${loan.totalAmount}`)}</td>
                    </tr>
                    <tr style={{ color: 'green' }}>
                      <td>Paid out</td>
                      <td>{formatCurrency(`${paidOut}`)}</td>
                    </tr>
                    <tr style={{ color: 'red' }}>
                      <td>Pending to pay</td>
                      <td>{formatCurrency(`${loan.amount}`)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

LoanInfo.propTypes = {
  loan: Proptypes.shape({
    amount: Proptypes.number.isRequired,
    totalAmount: Proptypes.number.isRequired,
  }).isRequired,
  userId: Proptypes.string.isRequired,
  interest: Proptypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  loan: state.loan.loan,
  interest: state.fee.fee.interest,
});

export default connect(
  mapStateToProps,
  {},
)(LoanInfo);
