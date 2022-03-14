import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  currentQuestions,
  redirecttofeedback,
  clearRandomlyAnswers,
  resetCountdown,
} from '../actions';

class NextQuestionButton extends React.Component {
 nextQuestion = () => {
   const {
     dispatchCurrentQuestion,
     dispatchRedirectToFeedback,
     currentQuestion,
     dispatchClearAnswers,
     dispatchResetCountdown,
   } = this.props;
   const lastPosition = 4;
   const teste = 3;
   dispatchClearAnswers();
   dispatchResetCountdown();
   if (currentQuestion <= teste) {
     dispatchCurrentQuestion(1);
   }
   if (currentQuestion === lastPosition) {
     dispatchRedirectToFeedback(true);
   }
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
  // results: PropTypes.arrayOf(PropTypes.object).isRequired,
  // history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  currentQuestion: PropTypes.number.isRequired,
  dispatchCurrentQuestion: PropTypes.func.isRequired,
  dispatchRedirectToFeedback: PropTypes.func.isRequired,
  dispatchClearAnswers: PropTypes.func.isRequired,
  dispatchResetCountdown: PropTypes.func.isRequired,
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
});

export default connect(mapStateToProps, mapDispatchToProps)(NextQuestionButton);
