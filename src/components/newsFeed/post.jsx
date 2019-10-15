import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

const stylePost = {
  background: '#FFFFFF',
  padding: '20px',
  margin: '10px 0 10px 0',
  boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.10)',
};

export default class Post extends PureComponent {
  render() {
    const { date, text } = this.props;
    return (
      <div style={stylePost}>
        <span className="label">
          {new Intl.DateTimeFormat('en-GB', {
            month: 'long',
            day: '2-digit',
            year: 'numeric',
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            hour: '2-digit',
            minute: '2-digit',
            hourCycle: 'h12',
          }).format(new Date(date))}
        </span>
        <span className="content">{text}</span>
      </div>
    );
  }
}

Post.propTypes = {
  date: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};
