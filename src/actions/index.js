import { getTokenFromAPI, getQuestions } from '../services/API';

// [ DADOS USER ]
export const ADD_EMAIL_NAME = 'ADD_EMAIL_NAME';
export const RESET_USER = 'RESET_USER';

// SCORE!!
export const SAVE_SCORE = 'SAVE_SCORE';
// [ TOKEN ]
export const SAVE_TOKEN = 'SAVE_TOKEN';

// [ QUESTIONS ]
export const GET_QUESTIONS_SUCCESS = 'GET_QUESTIONS_SUCCESS';
export const GET_QUESTIONS_ERROR = 'GET_QUESTIONS_ERROR';
export const REQUEST_QUESTIONS = 'REQUEST_QUESTIONS';
export const RESET_QUESTIONS = 'RESET_QUESTIONS';

// [ COUNTDOWN ]
export const UPDATE_COUNTDOWN = 'UPDATE_COUNTDOWN';
export const STOP_COUNTDOWN = 'STOP_COUNTDOWN';
export const RESET_COUNTDOWN = 'RESET_COUNTDOWN';

// [ SAVE ANSWERS RANDOMLY ]
export const SAVE_RANDOMLY_ANSWERS = 'SAVE_RANDOMLY_ANSWERS';
export const CLEAR_RANDOMLY_ANSWERS = 'CLEAR_RANDOMLY_ANSWERS';

// [ NEXT QUESTION BUTTON ]
export const UPDATE_NEXT_BUTTON = 'UPDATE_NEXT_BUTTON';

// [ CURRENTQUESTION ]
export const CURRENT_QUESTIONS = 'CURRENT_QUESTIONS';

// [ REDIRECTTOFEEDBACK ]
export const REDIRECT_TO_FEEDBACK = 'REDIRECT_TO_FEEDBACK';

// --- [ DADOS USER ]
export function addEmailAndNameToState(objectEmailName) {
  return {
    type: ADD_EMAIL_NAME,
    payload: objectEmailName,
  };
}

export const resetUser = () => ({
  type: RESET_USER,
});

// --- [ SCORE ]
export const saveScore = (score) => ({
  type: SAVE_SCORE,
  score,
});

// --- [ TOKEN ]
const saveTokenToState = (token) => ({
  type: SAVE_TOKEN,
  token,
});

export const saveToken = () => async (dispatch) => {
  const token = await getTokenFromAPI();
  localStorage.setItem('token', token);
  dispatch(saveTokenToState(token));
};

// --- [ NEXT BUTTON ]
export const nextButton = (payload) => ({
  type: UPDATE_NEXT_BUTTON,
  payload,
});

// --- [ CURRENTQUESTIONS ]
export const currentQuestions = (payload) => ({
  type: CURRENT_QUESTIONS,
  payload,
});
// --- [ REDIRECTTOFEEDBACK ]
export const redirecttofeedback = (payload) => ({
  type: REDIRECT_TO_FEEDBACK,
  payload,
});

// --- [ QUESTIONS ]
const requestQuestions = () => ({
  type: REQUEST_QUESTIONS,
});

const getQuestionsSuccess = (response) => ({
  type: GET_QUESTIONS_SUCCESS,
  payload: response,
});

const getQuestionsError = (error) => ({
  type: GET_QUESTIONS_ERROR,
  payload: error,
});

export const resetQuestions = () => ({
  type: RESET_QUESTIONS,
});

export const saveQuestions = (token) => async (dispatch) => {
  dispatch(requestQuestions());
  try {
    const response = await getQuestions(token);
    dispatch(getQuestionsSuccess(response.results));
  } catch (error) {
    dispatch(getQuestionsError(error.message));
  }
};

// --- [ COUNTDOWN ]
export function updateCountdown() {
  return {
    type: UPDATE_COUNTDOWN,
  };
}

export function stopCountdown() {
  return {
    type: STOP_COUNTDOWN,
  };
}

export function resetCountdown() {
  return {
    type: RESET_COUNTDOWN,
  };
}

// --- [ SAVE ANSWERS RANDOMLY ]
export function saveRandomlyAnswers(arrayAnswers) {
  return {
    type: SAVE_RANDOMLY_ANSWERS,
    arrayAnswers,
  };
}

export function clearRandomlyAnswers() {
  return {
    type: CLEAR_RANDOMLY_ANSWERS,
  };
}
