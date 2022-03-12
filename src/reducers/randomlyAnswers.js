import {
  CLEAR_RANDOMLY_ANSWERS,
  SAVE_RANDOMLY_ANSWERS } from '../actions';

const initialState = {
  array: [] };

export function randomlyAnswers(state = initialState, action) {
  switch (action.type) {
  case SAVE_RANDOMLY_ANSWERS:
    return {
      ...state,
      array: action.arrayAnswers,
    };
  case CLEAR_RANDOMLY_ANSWERS:
    return {
      ...state,
      array: [],
    };
  default:
    return state;
  }
}

export default randomlyAnswers;
