/* eslint-disable react/jsx-max-depth */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../styles/feedback.css';
import { resetScore } from '../actions';

const MINIMUM_SCORE = 3;

class Feedback extends React.Component {
  componentDidMount() {
    this.saveScore();
  }

  saveScore = () => {
    const { score, gravatar } = this.props;
    const nameSaved = localStorage.getItem('name');
    const ranking = [{
      name: nameSaved,
      score,
      picture: gravatar,
    }];
    if (!localStorage.getItem('ranking')) {
      localStorage.setItem('ranking', JSON.stringify(ranking));
    } else {
      const savedScores = JSON.parse(localStorage.getItem('ranking'));
      const newRank = {
        name: nameSaved,
        score,
        picture: gravatar,
      };
      const savedArray = [...savedScores, newRank];
      localStorage.setItem('ranking', JSON.stringify(savedArray));
    }
  }

  resetScore = () => {
    const { resetScoreButton } = this.props;
    resetScoreButton();
  }

  render() {
    const { score, gravatar, assertions } = this.props;
    return (
      <main>
        <div className="wrapper">
          <div className="text-wrapper">
            <img
              data-testid="header-profile-picture"
              alt="seu gravatar"
              src={ `https://www.gravatar.com/avatar/${gravatar}` }
            />
            <p
              data-testid="header-player-name"
            >
              Player:
              {' '}
              {localStorage.getItem('name')}

            </p>
            <p
              data-testid="header-score"
            >
              Score:
              {' '}
              {score}
            </p>
            <p
              data-testid="feedback-total-score"
            >
              Total score:
              {' '}
              {score}
            </p>
            <p
              data-testid="feedback-total-question"
            >
              Assertions:
              {' '}
              {assertions}
              /5
            </p>
            <div>
              {
                score >= MINIMUM_SCORE ? (
                  <p data-testid="feedback-text">Well Done!</p>
                ) : <p data-testid="feedback-text">Could be better...</p>
              }
            </div>
            <div>
              <Link to="/">
                <button
                  type="button"
                  data-testid="btn-play-again"
                  onClick={ this.resetScore }
                >
                  Play Again

                </button>
              </Link>
              <Link to="/ranking">
                <button
                  type="button"
                  data-testid="btn-ranking"
                >
                  Ranking

                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.player.score,
  name: state.player.name,
  gravatar: state.player.gravatarEmail,
  assertions: state.player.assertions,
});

const mapDispatchToProps = (dispatch) => ({
  resetScoreButton: () => { dispatch(resetScore()); },
});

Feedback.propTypes = {
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
  gravatar: PropTypes.string.isRequired,
  resetScoreButton: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
