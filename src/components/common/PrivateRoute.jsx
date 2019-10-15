import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...rest}
    render={(props) => {
      if (auth.isLoading) {
        return <h2>Loading ...</h2>;
      }
      if (!auth.isAuthenticated) {
        return <Redirect to="/login" />;
      }
      // eslint-disable-next-line react/jsx-props-no-spreading
      return <Component {...props} />;
    }}
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  auth: PropTypes.shape({
    isAuthenticated: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(PrivateRoute);
