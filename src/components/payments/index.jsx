import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Proptypes from 'prop-types';
import { getPartners } from '../../actions/partner/reader';
import { getFee } from '../../actions/fee/reader';
import Savings from './savings';
import Fee from './fee';

export class Payments extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { getPartnersPayments } = this.props;
    getPartnersPayments();
  }

  handleChange(event) {
    const { getFeePayment } = this.props;
    if (event.target.value !== '') {
      getFeePayment(event.target.value);
    }
    this.setState({ value: event.target.value });
  }

  render() {
    const { role, partners } = this.props;
    const { value } = this.state;
    if (role === 'Partner') {
      return <Redirect to="/" />;
    }
    const partnersOption = partners.map((partner) => (
      <option key={partner._id} value={partner._id}>
        {partner.name}
      </option>
    ));
    return (
      <>
        <h3>Payments</h3>
        <select
          value={value}
          onChange={this.handleChange}
          style={{ margin: '1%', width: '20%' }}
        >
          <option key="0" value="">
            Select partner
          </option>
          {partnersOption}
        </select>
        <Savings userId={value} />
        <br />
        <Fee userId={value} />
      </>
    );
  }
}

Payments.propTypes = {
  role: Proptypes.string.isRequired,
  getPartnersPayments: Proptypes.func.isRequired,
  getFeePayment: Proptypes.func.isRequired,
  partners: Proptypes.arrayOf(
    Proptypes.shape({
      _id: Proptypes.string.isRequired,
      name: Proptypes.string.isRequired,
      email: Proptypes.string.isRequired,
    }),
  ).isRequired,
};

const mapStateToProps = (state) => ({
  partners: state.partners.partnersAccepted,
  role: state.auth.user.role,
});

export default connect(mapStateToProps, {
  getFeePayment: getFee,
  getPartnersPayments: getPartners,
})(Payments);
