import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { saveQuestions, saveToken } from '../actions';

// const MIN = 0;
// const MAX = 6;
// const INDEX = Math.floor(Math.random() * (MAX - MIN) + MIN);

class Questions extends Component {
  state = {
    currentQuestion: 0,
    // answers: '',
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

    renderAnswers = () => {
      const { results } = this.props;
      const { currentQuestion } = this.state;
      const { category } = results[currentQuestion];
      // const { currentQuestion, allQuestions } = this.state;
      // const selectedQuestion = allQuestions[currentQuestion];
      // console.log(allQuestions[currentQuestion].correct_answer);

      // console.log(selectedQuestion.category);   nao consigo pegar as informaçoes
      console.log(category);
      // // const incorrectAnswers =
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
  // saveAPIToken: PropTypes.func.isRequired,
  results: PropTypes.objectOf(PropTypes.array).isRequired,
  // statusCode: PropTypes.objectOf(PropTypes.array).isRequired,
};

const mapStateToProps = (state) => ({
  token: state.token,
  results: state.results.questions,
});

// const mapDispatchToProps = (dispatch) => ({
//   saveAPIQuestions: (token) => dispatch(saveQuestions(token)),
//   saveAPIToken: () => dispatch(saveToken()),
// });

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
