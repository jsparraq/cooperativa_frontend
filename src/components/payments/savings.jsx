import React, { PureComponent } from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import { createSavings } from '../../actions/savings/creator';
import { returnErrors } from '../../actions/utils/messages';

class Savings extends PureComponent {
  paySavings = (e) => {
    const { userId, createSavingsPayments, returnErrorsPayments } = this.props;
    if (userId === '') {
      returnErrorsPayments("You don't select some partner", '300');
    } else {
      createSavingsPayments(1000, userId);
    }
    e.preventDefault();
  };

  render() {
    const { userId } = this.props;
    let disableButton;
    if (userId === '') {
      disableButton = 'btn btn-outline-success disabled savings-btn btn-block';
    } else {
      disableButton = 'btn btn-outline-success savings-btn btn-block';
    }
    return (
      <div className="card">
        <div className="card-header">Savings</div>
        <div className="card-body">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Topic</th>
                <th scope="col">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Solidarity fund</td>
                <td>$1.000</td>
              </tr>
              <tr>
                <td>Bond</td>
                <td>$2.000</td>
              </tr>
              <tr>
                <td>Fee</td>
                <td>$30.000</td>
              </tr>
            </tbody>
          </table>
          <button
            type="button"
            className={disableButton}
            onClick={this.paySavings}
            style={{ width: '20%', marginLeft: '70%' }}
          >
            Pay saving
          </button>
        </div>
      </div>
    );
  }
}

Savings.propTypes = {
  userId: Proptypes.string.isRequired,
  createSavingsPayments: Proptypes.func.isRequired,
  returnErrorsPayments: Proptypes.func.isRequired,
};

export default connect(
  null,
  {
    createSavingsPayments: createSavings,
    returnErrorsPayments: returnErrors,
  },
)(Savings);
