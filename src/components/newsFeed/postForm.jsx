import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createNews } from '../../actions/news/creator';
import { labelStyle } from '../styles/utils';

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
      <div className="post-form">
        <form onSubmit={this.onSubmit}>
          <label htmlFor="message" style={labelStyle}>
            Message
            <input
              type="text"
              className="form-control"
              name="message"
              onChange={this.onChange}
              value={message}
            />
          </label>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Publish
            </button>
          </div>
        </form>
      </div>
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
