import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Proptypes from 'prop-types';
import { createLoans } from '../../actions/loan/creator';
import { returnErrors } from '../../actions/utils/messages';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export class Loan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      monthsLoan: [],
      monthSelect: '',
      amountLoan: 0,
    };
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    const monthsLoan = [];
    const currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    for (let month = currentMonth; month < 12; month += 1) {
      monthsLoan.push({
        text: `${months[month]} (${currentYear.toString()})`,
        key: month,
      });
    }
    currentYear += 1;
    for (let month = 0; month < currentMonth; month += 1) {
      monthsLoan.push({
        text: `${months[month]} (${currentYear.toString()})`,
        key: month,
      });
    }
    this.setState({ monthsLoan });
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmit = (e) => {
    e.preventDefault();
    const { monthSelect, amountLoan } = this.state;
    const { createLoansForm, user, createMessageForm } = this.props;
    const regex = /(?<month>[A-Z][a-z]*) \((?<year>\d{4})\)/;
    if (amountLoan > 0) {
      createLoansForm(
        user._id,
        months.indexOf(monthSelect.replace(regex, '$<month>')),
        monthSelect.replace(regex, '$<year>'),
        amountLoan,
      );
    } else {
      createMessageForm('The loan amount is negative', 500);
    }
    this.setState({
      amountLoan: '',
      monthSelect: '',
    });
  };

  render() {
    const { role } = this.props;
    const { monthsLoan, monthSelect, amountLoan } = this.state;
    const monthsOption = monthsLoan.map((month) => (
      <option key={month.key} value={month.text}>
        {month.text}
      </option>
    ));
    if (role === 'Admin') {
      return <Redirect to="/" />;
    }
    return (
      <>
        <h3>Loans</h3>
        Select Month
        <form onSubmit={this.onSubmit}>
          <select
            value={monthSelect}
            onChange={this.onChange}
            style={{ margin: '1%', width: '20%' }}
            name="monthSelect"
          >
            <option key="0" value="">
              Select Month
            </option>
            {monthsOption}
          </select>
          <br />
          <span>Amount Loan</span>
          <br />
          <input
            type="number"
            name="amountLoan"
            onChange={this.onChange}
            value={amountLoan}
          />
          <br />
          <br />
          <button type="submit" className="btn btn-success">
            Ask for a loan
          </button>
        </form>
      </>
    );
  }
}

Loan.propTypes = {
  role: Proptypes.string.isRequired,
  createLoansForm: Proptypes.func.isRequired,
  user: Proptypes.shape({ _id: Proptypes.string.isRequired }).isRequired,
  createMessageForm: Proptypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  role: state.auth.user.role,
  user: state.auth.user,
});

export default connect(
  mapStateToProps,
  {
    createLoansForm: createLoans,
    createMessageForm: returnErrors,
  },
)(Loan);
