import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { resetScore } from '../actions';
import '../styles/ranking.css';

// const MINIMUM_SCORE = 3;

class Ranking extends React.Component {
  state = {
    ranking: [],
  }

  componentDidMount() {
    const savedRank = JSON.parse(localStorage.getItem('ranking'));
    // const key = 'index';
    // savedRank.forEach((item, index) => { item[key] = index; });
    savedRank.sort((a, b) => b.score - a.score);
    this.setState({ ranking: savedRank });
  }

  render() {
    const { resetScoreButton } = this.props;
    const { ranking } = this.state;
    return (
      <main className="main-ranking">
        <section className="wrapper-ranking">
          <h1
            data-testid="ranking-title"
          >
            Game Ranking

          </h1>
          <img alt="" src="" />
          <section>
            <ol>
              {
                ranking.map((item, index) => (
                  <li key={ index }>
                    <p className="ranking">
                      {item.name}
                      {' '}
                      <br />
                      {item.score}
                      { }
                      {' '}
                      points
                    </p>
                  </li>
                ))
              }
            </ol>
          </section>
          <Link to="/">
            <button
              type="button"
              data-testid="btn-go-home"
              onClick={ resetScoreButton }
            >
              Go to home page
            </button>
          </Link>
        </section>
      </main>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  resetScoreButton: () => { dispatch(resetScore()); },
});

Ranking.propTypes = {
  resetScoreButton: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Ranking);
