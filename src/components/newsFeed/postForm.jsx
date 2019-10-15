import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createNews } from '../../actions/news/creator';

import './postFrom.css';

export class PostFrom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
    };
  }

  onSubmit = (event) => {
    event.preventDefault();
    const { message } = this.state;
    const { postNews } = this.props;
    postNews(message);
    this.setState({
      message: '',
    });
  };

  onChange = (event) => this.setState({ [event.target.name]: event.target.value });

  render() {
    const { message } = this.state;
    return (
      <form onSubmit={this.onSubmit} className="flex-form">
        <label htmlFor="message">
          <input
            type="text"
            className="form-control"
            name="message"
            placeholder="Write the news feed"
            onChange={this.onChange}
            value={message}
          />
        </label>
        <input type="submit" className="btn" value="Publish" />
      </form>
    );
  }
}

PostFrom.propTypes = {
  postNews: PropTypes.func.isRequired,
};

export default connect(
  null,
  { postNews: createNews },
)(PostFrom);
