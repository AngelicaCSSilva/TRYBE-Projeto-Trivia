import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveQuestions, saveToken } from '../actions';
import '../styles/answers.css';

class Questions extends Component {
    state = {
      currentQuestion: 0,
    }

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
    }

    renderQuestion = () => {
      const { results } = this.props;
      const { currentQuestion } = this.state;
      const { category, question } = results[currentQuestion];
      return (
        <div>
          <p data-testid="question-category">{category}</p>
          <p data-testid="question-text">{ question }</p>
        </div>
      );
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

    renderAnswers = () => {
      const { results } = this.props;
      const { currentQuestion } = this.state;

      // [Desestruturação]
      const {
        correct_answer: correct,
        incorrect_answers: incorrects } = results[currentQuestion];

      // [ Cria os elementos conforme solicitado pelo requisito, adicionando data-testid  ]
      const arrayAnswersElements = this.createElements(correct, incorrects);

      // [Cria um novo array com as respostas organizadas aleatoriamente ]
      const randomlyArrangedAnswers = this
        .createArrayWithRandomlyArrangedAnswers(arrayAnswersElements);

      return (
        <>
          {randomlyArrangedAnswers.map((answer, index) => (
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
};

const mapStateToProps = (state) => ({
  token: state.token,
  results: state.results.questions,
});

const mapDispatchToProps = (dispatch) => ({
  saveAPIQuestions: (token) => dispatch(saveQuestions(token)),
  saveAPIToken: () => dispatch(saveToken()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
