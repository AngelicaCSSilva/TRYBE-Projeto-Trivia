import { combineReducers } from 'redux';
import { player } from './user';
import { results } from './results';
import { token } from './token';
import { countdown } from './countdown';
import { randomlyAnswers } from './randomlyAnswers';
import { nextQuestionButton } from './nextQuestionButton';
import { currentQuestions } from './currentQuestions';

export default combineReducers({
  player,
  token,
  results,
  countdown,
  randomlyAnswers,
  nextQuestionButton,
  currentQuestions,
});
