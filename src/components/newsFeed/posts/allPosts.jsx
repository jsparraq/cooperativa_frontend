import React, { Component } from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import { getNews } from '../../../actions/news/reader';
import Post from './post';

export class AllPost extends Component {
  componentDidMount() {
    const { getNewsFeed } = this.props;
    getNewsFeed();
    this.setTimer();
  }

  shouldComponentUpdate(nextProps) {
    const { posts } = this.props;
    const differentPosts = posts !== nextProps.posts;
    if (differentPosts) {
      return true;
    }
    return false;
  }

  componentWillUnmount() {
    clearInterval(this.timeout);
  }

  setTimer = () => {
    this.timeout = setInterval(this.timer, 180000);
  };

  timer = () => {
    const { getNewsFeed } = this.props;
    getNewsFeed();
  };

  render() {
    const { posts } = this.props;
    const postsContainer = posts.map((post) => (
      <Post key={post._id} date={post.createdAt} text={post.text} />
    ));
    return <>{postsContainer}</>;
  }
}

AllPost.propTypes = {
  getNewsFeed: Proptypes.func.isRequired,
  posts: Proptypes.arrayOf(
    Proptypes.shape({
      _id: Proptypes.string.isRequired,
      text: Proptypes.string.isRequired,
      createdAt: Proptypes.string.isRequired,
    }),
  ).isRequired,
};

const mapStateToProps = (state) => ({
  posts: state.news.news,
});

export default connect(
  mapStateToProps,
  {
    getNewsFeed: getNews,
  },
)(AllPost);
