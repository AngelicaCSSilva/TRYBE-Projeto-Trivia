import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  currentQuestions,
  redirecttofeedback,
  clearRandomlyAnswers,
  resetCountdown,
  nextButton,
} from '../actions';

const NextButtonStyled = styled.button`
position: relative;
  display: inline-block;
  margin: 30px 15px;
  padding: 15px 40px;
  text-align: center;
  font-size: 18px;
  letter-spacing: 1px;
  text-decoration: none;
  color: #764ba2;
  background: white;
  transition: ease-out 0.5s;
  border: 2px solid rgba(0,0,0,0.1);
  border-radius: 50px;
  -webkit-box-shadow: 8px 10px 31px 9px rgba(0,0,0,0.3); 
  box-shadow: 8px 10px 31px 9px rgba(0,0,0,0.3);
`;

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
       <NextButtonStyled
         data-testid="btn-next"
         type="button"
         onClick={ this.nextQuestion }
       >
         Próxima pergunta
       </NextButtonStyled>
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
