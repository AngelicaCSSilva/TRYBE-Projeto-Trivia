import {
  GET_QUESTIONS_SUCCESS,
  GET_QUESTIONS_ERROR,
  REQUEST_QUESTIONS,
  RESET_QUESTIONS,
} from '../actions';

const initialStateQuestions = {
  isLoading: false,
  questions: [],
  errorMessage: '',
};

export function results(state = initialStateQuestions, action) {
  switch (action.type) {
  case REQUEST_QUESTIONS:
    return { ...state, isLoading: true };
  case GET_QUESTIONS_SUCCESS:
    return { ...state, isLoading: false, questions: action.payload };
  case GET_QUESTIONS_ERROR:
    return { ...state, isLoading: false, errorMessage: action.payload };
  case RESET_QUESTIONS:
    return { ...state, questions: [] };
  default:
    return state;
  }
}

export default results;
