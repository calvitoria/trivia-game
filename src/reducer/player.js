import {
  TRANSFORM_EMAIL,
  NEXT_QUESTION,
  POINT_SCORE,
  DISABLE_OPTIONS_TRUE,
  DISABLE_OPTIONS_FALSE,
  RESET_SCORE,
  NEXT_QESTION_FALSE,
  COUNT_ASSERT,
} from '../actions';

const INITIAL_STATE = {

  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  nextQuestion: false,
  disableOptions: false,

};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case TRANSFORM_EMAIL:
    return {
      ...state,
      gravatarEmail: action.payload.gravatarEmail,
      name: action.payload.name,
    };
  case COUNT_ASSERT:
    return {
      ...state,
      assertions: state.assertions + 1,
    };
  case NEXT_QUESTION:
    return {
      ...state,
      nextQuestion: true,
    };
  case POINT_SCORE:
    return {
      ...state,
      score: state.score + action.payload,
    };
  case DISABLE_OPTIONS_TRUE:
    return {
      ...state,
      disableOptions: true,
    };
  case DISABLE_OPTIONS_FALSE:
    return {
      ...state,
      disableOptions: false,
    };
  case RESET_SCORE:
    return {
      ...state,
      score: 0,
      assertions: 0,
    };
  case NEXT_QESTION_FALSE:
    return {
      ...state,
      nextQuestion: false,
    };
  default:
    return state;
  }
};

export default player;
