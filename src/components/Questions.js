import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  saveQuestions,
  saveToken,
  stopCountdown,
  saveRandomlyAnswers,
  saveScore,
  nextButton,
} from '../actions';
import '../styles/answers.css';

class Questions extends React.Component {
    // Ref.: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    getRandomNumber = (answersLength) => {
      const max = Math.floor(answersLength);
      return Math.floor(Math.random() * max);
    }

    createArrayWithRandomlyArrangedAnswers = (arrayAnswersElements) => {
      const randomlyArrangedAnswers = [];
      while (arrayAnswersElements.length) {
        const index = this.getRandomNumber(arrayAnswersElements.length);
        randomlyArrangedAnswers.push(arrayAnswersElements.splice(index, 1));
      }
      return randomlyArrangedAnswers;
    }

    componentDidMount = async () => {
      const { token, saveAPIQuestions } = this.props;
      await saveAPIQuestions(token);
      this.SaveToStateRandomlyAnswers();
      localStorage.setItem('score', 0);
    }

    componentDidUpdate = () => {
      const { currentQuestion } = this.props;
      const lastPosition = 4;
      if (currentQuestion <= lastPosition) {
        this.SaveToStateRandomlyAnswers();
      }
    }

    renderQuestion = () => {
      const { results } = this.props;
      const { currentQuestion } = this.props;
      const { category, question } = results[currentQuestion];
      return (
        <div>
          <p data-testid="question-category">{category}</p>
          <p data-testid="question-text">{ question }</p>
        </div>
      );
    }

    // REQUISITO 9 DE ESCORE:
    // switch para definir na função do score o nivel de dificuldade.
    questionDifficulty = () => {
      const { results } = this.props;
      const { currentQuestion } = this.props;
      const difficultyHard = 3;
      const difficultyMedium = 2;
      const difficultyEasy = 1;
      switch (results[currentQuestion].difficulty) {
      case 'hard':
        return difficultyHard;
      case 'medium':
        return difficultyMedium;
      default:
        return difficultyEasy;
      }
    }
    // saveScoreValue é chave no mapDispatch, pra atualizar o estado global do score;

    handleClick = ({ target }) => {
      const {
        stopTimer,
        timer, saveScoreValue,
        saveButtonState } = this.props;
      stopTimer();
      saveButtonState(true);
      if (target.className === 'answers correct-answer hidden') {
        const points = 10;
        const score = points + (timer * this.questionDifficulty());
        const getScore = localStorage.getItem('score') || 0;
        const sum = Number(score) + Number(getScore);
        localStorage.setItem('score', sum);
        saveScoreValue(sum);
      }
    }

    createElements = (correct, incorrects) => {
      const incorretsElements = incorrects.map((answer, index) => (
        <button
          key={ answer }
          data-testid={ `wrong-answer-${index}` }
          type="button"
          className="answers incorrect-answers hidden"
          onClick={ this.handleClick }
        >
          { answer }
        </button>
      ));

      const correctElement = (
        <button
          key={ correct }
          data-testid="correct-answer"
          type="button"
          className="answers correct-answer hidden"
          onClick={ this.handleClick }
        >
          { correct }
        </button>);

      return [correctElement, ...incorretsElements];
    }

    SaveToStateRandomlyAnswers = () => {
      const { results, saveRandomlyAnswersArray, randomAnswers } = this.props;
      const { currentQuestion } = this.props;

      if (randomAnswers.length === 0) {
      // [Desestruturação]
        const {
          correct_answer: correct,
          incorrect_answers: incorrects } = results[currentQuestion];

        // [ Cria os elementos conforme solicitado pelo requisito, adicionando data-testid  ]
        const arrayAnswersElements = this.createElements(correct, incorrects);

        // [Cria um novo array com as respostas organizadas aleatoriamente ]
        const randomlyArrangedAnswers = this
          .createArrayWithRandomlyArrangedAnswers(arrayAnswersElements);

        saveRandomlyAnswersArray(randomlyArrangedAnswers);
      }
    }

    renderAnswers = () => {
      const { randomAnswers } = this.props;
      return (
        <>
          {randomAnswers.map((answer, index) => (
            <div
              key={ index }
              data-testid="answer-options"
              id={ `option-${index}` }
            >
              { answer }
            </div>
          ))}
        </>
      );
    }

    render() {
      const { results } = this.props;
      return (
        <section>
          { results.length > 0 && this.renderQuestion() }

          { results.length > 0 && this.renderAnswers() }

        </section>
      );
    }
}

Questions.propTypes = {
  token: PropTypes.string.isRequired,
  saveAPIQuestions: PropTypes.func.isRequired,
  results: PropTypes.arrayOf(PropTypes.object).isRequired,
  randomAnswers: PropTypes.arrayOf(PropTypes.array).isRequired,
  stopTimer: PropTypes.func.isRequired,
  saveRandomlyAnswersArray: PropTypes.func.isRequired,
  timer: PropTypes.number.isRequired,
  saveScoreValue: PropTypes.func.isRequired,
  saveButtonState: PropTypes.func.isRequired,
  currentQuestion: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  token: state.token,
  results: state.results.questions,
  randomAnswers: state.randomlyAnswers.array,
  durationInSeconds: state.countdown.durationInSeconds,
  timer: state.countdown.timer,
  currentQuestion: state.currentQuestions.currentQuestion,
});

const mapDispatchToProps = (dispatch) => ({
  saveAPIQuestions: (token) => dispatch(saveQuestions(token)),
  saveAPIToken: () => dispatch(saveToken()),
  stopTimer: () => dispatch(stopCountdown()),
  saveRandomlyAnswersArray: (array) => dispatch(saveRandomlyAnswers(array)),
  saveScoreValue: (score) => dispatch(saveScore(score)),
  saveButtonState: (bool) => dispatch(nextButton(bool)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
