import React, { Component } from 'react';
import { withAlert } from 'react-alert';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export class Alerts extends Component {
  componentDidUpdate(prevProps) {
    const { error, alert, message } = this.props;
    if (error !== prevProps.error) {
      alert.error(error.msg);
    }

    if (message !== prevProps.message) {
      alert.success(message.msg);
    }
  }

  render() {
    return <></>;
  }
}

Alerts.propTypes = {
  error: PropTypes.shape({
    msg: PropTypes.string.isRequired,
    status: PropTypes.number.isRequired,
  }).isRequired,
  message: PropTypes.string.isRequired,
  alert: PropTypes.shape({
    error: PropTypes.func.isRequired,
    success: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  error: state.error,
  message: state.messages,
});

export default connect(mapStateToProps)(withAlert()(Alerts));
