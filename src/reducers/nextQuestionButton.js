import { UPDATE_NEXT_BUTTON } from '../actions';

const initialStateBtn = {
  buttonIsTrue: false,
};

export function nextQuestionButton(state = initialStateBtn, action) {
  switch (action.type) {
  case UPDATE_NEXT_BUTTON:
    return {
      ...state,
      buttonIsTrue: action.payload,
    };
  default:
    return state;
  }
}

export default nextQuestionButton;
