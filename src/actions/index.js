import { getTokenFromAPI, getQuestions } from '../services/API';

// [ DADOS USER ]
export const ADD_EMAIL_NAME = 'ADD_EMAIL_NAME';

// [ TOKEN ]
export const SAVE_TOKEN = 'SAVE_TOKEN';

// [ QUESTIONS ]
export const GET_QUESTIONS_SUCCESS = 'GET_QUESTIONS_SUCCESS';
export const GET_QUESTIONS_ERROR = 'GET_QUESTIONS_ERROR';
export const REQUEST_QUESTIONS = 'REQUEST_QUESTIONS';

// --- [ DADOS USER ]
export function addEmailAndNameToState(objectEmailName) {
  return {
    type: ADD_EMAIL_NAME,
    payload: objectEmailName,
  };
}

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

export const saveQuestions = (token) => async (dispatch) => {
  dispatch(requestQuestions());
  try {
    const response = await getQuestions(token);
    dispatch(getQuestionsSuccess(response.results));
  } catch (error) {
    dispatch(getQuestionsError(error.message));
  }
};
