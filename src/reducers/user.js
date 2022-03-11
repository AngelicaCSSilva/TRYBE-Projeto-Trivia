import { ADD_EMAIL_NAME, SAVE_TOKEN,
  GET_QUESTIONS_SUCCESS, GET_QUESTIONS_ERROR, REQUEST_QUESTIONS } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: 0,
  gravatarEmail: '',
};

export function player(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_EMAIL_NAME:
    return {
      ...state,
      name: action.payload.name,
      gravatarEmail: action.payload.email,
    };
  default:
    return state;
  }
}

const initialStateToken = {};

export function token(state = initialStateToken, action) {
  switch (action.type) {
  case SAVE_TOKEN:
    return action.token;
  default:
    return state;
  }
}

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
  default:
    return state;
  }
}
