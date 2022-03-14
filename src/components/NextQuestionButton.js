import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
class NextQuestionButton extends React.Component {
 render() {
   return (
   );
 }
}


const mapStateToProps = (state) => ({
  saveButtonState: state.nextQuestionButton.buttonIsTrue,
  results: state.results.questions,
  currentQuestion: state.currentQuestions.currentQuestion,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchCurrentQuestion: (position) => dispatch(currentQuestions(position)),
  dispatchRedirectToFeedback: (bool) => dispatch(redirecttofeedback(bool)),
  dispatchClearAnswers: () => dispatch(clearRandomlyAnswers()),
  dispatchResetCountdown: () => dispatch(resetCountdown()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NextQuestionButton);
