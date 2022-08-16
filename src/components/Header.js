import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../styles/header.css';

class Header extends React.Component {
  render() {
    const { gravatarEmail, placar } = this.props;
    return (
      <header>
        <div className="about-player">
          <p
            className="header-p"
            data-testid="header-player-name"
          >
            {`Player: ${localStorage.getItem('name')}`}

          </p>
          <div className="text-about-player">
            <img
              data-testid="header-profile-picture"
              alt="seu gravatar"
              src={ `https://www.gravatar.com/avatar/${gravatarEmail}` }
            />
            <p
              className="header-p"
              data-testid="header-score"
            >
              {`Score: ${placar}`}
            </p>
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  gravatarEmail: state.player.gravatarEmail,
  placar: state.player.score,
});

Header.propTypes = {
  gravatarEmail: PropTypes.string.isRequired,
  placar: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, null)(Header);
