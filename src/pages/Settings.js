import React from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Settings extends React.Component {
  render() {
    return (
      <h1
        data-testid="settings-title"
      >
        Settings

      </h1>
    );
  }
}

export default connect()(Settings);
