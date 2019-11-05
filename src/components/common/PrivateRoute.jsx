/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner';
import Header from '../layout/Header';

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...rest}
    render={(props) => {
      if (auth.isLoading) {
        return (
          <Loader
            style={{ margin: 'auto', maxHeight: '100%' }}
            type="Triangle"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={3000}
          />
        );
      }
      if (!auth.isAuthenticated) {
        return <Redirect to="/login" />;
      }
      return (
        <>
          <Header />
          <div className="container">
            <Component {...props} />
          </div>
        </>
      );
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
