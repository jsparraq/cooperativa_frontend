import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import PostForm from './postForm';
import AllPost from './allPosts';

export class Feed extends PureComponent {
  render() {
    const { role } = this.props;
    const adminRole = role === 'Admin';
    return (
      <>
        <h3>News Feed</h3>
        <div>{adminRole ? <PostForm /> : <></>}</div>
        <AllPost />
      </>
    );
  }
}

Feed.propTypes = {
  role: Proptypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  role: state.auth.user.role,
});

export default connect(mapStateToProps)(Feed);
