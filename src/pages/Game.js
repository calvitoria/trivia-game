/* eslint-disable max-lines */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../styles/game.css';
import {
  nextQuestionAction,
  pointScore,
  disableOptionsFalse,
  disableOptionsTrue,
  nextQuestionFalseAc,
  countAssert,
} from '../actions/index';
import Header from '../components/Header';

const FOUR = 4;
const DEFAULT_BORDER = '3px solid black';
const ONE_SECOND = 1000;
const TEN = 10;
const THREE = 3;

class Game extends React.Component {
  state = {
    responseAPI: [],
    indexQuestion: 0,
    randomizedAns: [],
    responseCode: 0,
    seconds: 30,
    stylesAns: {
      correctAns: {
        border: DEFAULT_BORDER,
      },
      wrongAns: {
        border: DEFAULT_BORDER,
      },
    },
  }

  componentDidMount() {
    const TWO_SECONDS = 2000;
    this.triviaApiRequest();
    setTimeout(this.tokenHasExpired, TWO_SECONDS);
    setTimeout(this.randomizeAnswers, TWO_SECONDS);
  }

  componentDidUpdate() {
    const { disableButtonAction, nextQuest } = this.props;
    const { seconds } = this.state;
    if (seconds === 0) {
      clearInterval(this.intervalId);
      disableButtonAction();
      nextQuest();
    }
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  handleAnswerClick = ({ target: { name, value } }) => {
    const { nextQuest, countPoint, countAssertions, disableButtonAction } = this.props;
    const { responseAPI } = this.state;
    clearInterval(this.intervalId);
    this.setState({
      stylesAns: {
        correctAns: {
          background: 'rgb(6, 240, 15)',
        },
        wrongAns: {
          background: 'red',
        },
      },
    });
    nextQuest();
    disableButtonAction();
    if (name === 'correct-ans') {
      countAssertions();
      const scored = this.scorePoints(responseAPI[value].difficulty);
      countPoint(scored);
    }
  }

  scorePoints = (difficulty) => {
    const { seconds } = this.state;
    if (difficulty === 'easy') {
      return (TEN + ((seconds) * 1));
    }
    if (difficulty === 'medium') {
      return (TEN + ((seconds) * 2));
    }
    if (difficulty === 'hard') {
      return (TEN + ((seconds) * THREE));
    }
  }

  triviaApiRequest = async () => {
    const token = localStorage.getItem('token');
    const apiData = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const response = await apiData.json();
    return this.setState({
      responseAPI: response.results,
      responseCode: response.response_code,
    });
  };

  tokenHasExpired = () => {
    const { responseCode } = this.state;
    const { history } = this.props;
    if (responseCode !== 0) {
      localStorage.removeItem('token');
      localStorage.removeItem('name');
      history.push('/');
    }
  }

  randomizeAnswers = () => {
    const { responseAPI } = this.state;
    const arrayWithAns = [];
    responseAPI.map((item) => {
      const array = [{ answer: item.correct_answer }];
      item.incorrect_answers.map((ans, index) => {
        const obj = {
          answer: ans,
          index,
        };
        return array.push(obj);
      });
      // Fonte: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
      const shuffled = array
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
      return arrayWithAns.push(shuffled);
    });
    this.setState({ randomizedAns: arrayWithAns });
    this.setTimer();
  }

  handleNextClick = () => {
    const { disableButtonFalse, history, nextQuestionFalse } = this.props;
    const { indexQuestion } = this.state;
    this.setTimer();
    if (indexQuestion === FOUR) {
      history.push('/feedback');
    }
    this.setState((prevState) => ({
      indexQuestion: prevState.indexQuestion + 1,
      seconds: 30,
      stylesAns: {
        correctAns: {
          border: DEFAULT_BORDER,
        },
        wrongAns: {
          border: DEFAULT_BORDER,
        },
      },
    }));
    disableButtonFalse();
    nextQuestionFalse();
  }

  setTimer = () => {
    this.intervalId = setInterval(() => {
      this.setState((prevState) => ({ seconds: prevState.seconds - 1 }));
    }, ONE_SECOND);
  }

  render() {
    const { nextQuestion, disableButton } = this.props;
    const { responseAPI, indexQuestion, stylesAns, randomizedAns, seconds } = this.state;
    return (
      <main>
        <section className="bg-question">
          <Header />
          {responseAPI.length > 0 && (

            <div className="question-info">
              <h1 data-testid="question-category" className="category">
                {responseAPI[indexQuestion].category}
              </h1>
              <p
                data-testid="question-text"
                className="p-question"
              >
                {responseAPI[indexQuestion].question}
              </p>
              <div className="timer">
                {
                  randomizedAns.length > 0
                  && <h2>{seconds}</h2>
                }
              </div>
              {/* <p className="p-question">
                Questão:
                {' '}
                {indexQuestion + 1}
                /5
              </p> */}
              <div data-testid="answer-options">
                <div className="answer-container">
                  {randomizedAns.length > 0
                  && randomizedAns[indexQuestion].map((item, index) => (
                    item.answer === responseAPI[indexQuestion].correct_answer ? (
                      <button
                        className="btn-answer"
                        key="correct-ans"
                        style={ stylesAns.correctAns }
                        data-testid="correct-answer"
                        value={ indexQuestion }
                        type="button"
                        name="correct-ans"
                        disabled={ disableButton }
                        onClick={ this.handleAnswerClick }
                      >
                        {item.answer}
                      </button>
                    ) : (
                      <button
                        className="btn-answer"
                        type="button"
                        key={ index }
                        style={ stylesAns.wrongAns }
                        disabled={ disableButton }
                        value={ indexQuestion }
                        data-testid={ `wrong-answer-${item.index}` }
                        onClick={ this.handleAnswerClick }
                      >
                        {item.answer}
                      </button>
                    )
                  ))}
                  {
                    nextQuestion ? (
                      <button
                        className="btn-next"
                        data-testid="btn-next"
                        type="button"
                        onClick={ this.handleNextClick }
                      >
                        Próxima
                      </button>
                    ) : ''
                  }
                </div>
              </div>
            </div>
          )}
        </section>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  nextQuestion: state.player.nextQuestion,
  disableButton: state.player.disableOptions,
});

const mapDispatchToProps = (dispatch) => ({
  nextQuest: () => { dispatch(nextQuestionAction()); },
  countPoint: (pontos) => { dispatch(pointScore(pontos)); },
  disableButtonFalse: () => { dispatch(disableOptionsFalse()); },
  disableButtonAction: () => { dispatch(disableOptionsTrue()); },
  nextQuestionFalse: () => { dispatch(nextQuestionFalseAc()); },
  countAssertions: () => { dispatch(countAssert()); },
});

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  nextQuestion: PropTypes.bool.isRequired,
  nextQuest: PropTypes.func.isRequired,
  countPoint: PropTypes.func.isRequired,
  disableButton: PropTypes.bool.isRequired,
  disableButtonFalse: PropTypes.func.isRequired,
  nextQuestionFalse: PropTypes.func.isRequired,
  disableButtonAction: PropTypes.func.isRequired,
  countAssertions: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
