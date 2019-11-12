import React, { PureComponent } from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import { createSavings } from '../../actions/savings/creator';
import { returnErrors } from '../../actions/utils/messages';
import { formatCurrency } from '../utils';

class Savings extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      bond: 0,
      total: 31000,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  paySavings = (e) => {
    e.preventDefault();
    const { userId, createSavingsPayments, returnErrorsPayments } = this.props;
    const { bond } = this.state;
    if (userId === '') {
      returnErrorsPayments("You don't select some partner", '500');
    } else {
      createSavingsPayments(bond, userId);
    }
  };

  handleChange(event) {
    let newTotal;
    if (event.target.value === '') {
      newTotal = 31000;
    } else {
      newTotal = 1000 + 30000 + parseInt(event.target.value, 10);
    }
    this.setState({ bond: event.target.value, total: newTotal });
  }

  render() {
    const { userId } = this.props;
    const { bond, total } = this.state;
    let disable;
    if (userId === '') {
      disable = true;
    } else {
      disable = false;
    }
    return (
      <div className="card">
        <div className="card-header">Savings</div>
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
                <td>Solidarity fund</td>
                <td>$1.000</td>
              </tr>
              <tr>
                <td>Bond</td>
                <td>
                  <input
                    type="Number"
                    value={bond}
                    onChange={this.handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td>Fee</td>
                <td>$30.000</td>
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
            onClick={this.paySavings}
            disabled={disable}
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
