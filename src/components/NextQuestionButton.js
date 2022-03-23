import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  currentQuestions,
  redirecttofeedback,
  clearRandomlyAnswers,
  resetCountdown,
  nextButton,
} from '../actions';

class NextQuestionButton extends React.Component {
 nextQuestion = () => {
   const {
     dispatchCurrentQuestion,
     dispatchRedirectToFeedback,
     currentQuestion,
     dispatchClearAnswers,
     dispatchResetCountdown,
     saveButton,
   } = this.props;
   const lastPosition = 4;
   dispatchClearAnswers();
   if (currentQuestion <= (lastPosition - 1)) {
     dispatchResetCountdown();
     dispatchCurrentQuestion(1);
   }
   if (currentQuestion === lastPosition) {
     dispatchRedirectToFeedback(true);
   }
   saveButton(false);
 }

 render() {
   const { saveButtonState } = this.props;
   return (
     saveButtonState && (
       <button
         data-testid="btn-next"
         type="button"
         onClick={ this.nextQuestion }
       >
         Próxima pergunta
       </button>
     )
   );
 }
}

NextQuestionButton.propTypes = {
  saveButtonState: PropTypes.bool.isRequired,
  currentQuestion: PropTypes.number.isRequired,
  dispatchCurrentQuestion: PropTypes.func.isRequired,
  dispatchRedirectToFeedback: PropTypes.func.isRequired,
  dispatchClearAnswers: PropTypes.func.isRequired,
  dispatchResetCountdown: PropTypes.func.isRequired,
  saveButton: PropTypes.func.isRequired,
};

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
  saveButton: (bool) => dispatch(nextButton(bool)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NextQuestionButton);
