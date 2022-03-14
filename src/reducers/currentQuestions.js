import { CURRENT_QUESTIONS, REDIRECT_TO_FEEDBACK } from '../actions';

const initialStateBtn = {
  currentQuestion: 0,
  redirectToFeedback: false,
};

export function currentQuestions(state = initialStateBtn, action) {
  switch (action.type) {
  case CURRENT_QUESTIONS:
    return {
      ...state,
      currentQuestion: state.currentQuestion + action.payload,
    };
  case REDIRECT_TO_FEEDBACK:
    return {
      ...state,
      redirectToFeedback: action.payload,
    };
  default:
    return state;
  }
}

export default currentQuestions;
