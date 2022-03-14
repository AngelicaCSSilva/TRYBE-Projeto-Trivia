import React, { Component } from 'react';
import Countdown from '../components/Countdown';
import Header from '../components/Header';
import Questions from '../components/Questions';

class Game extends Component {
  // handleChanges = ({ target }) => {
  //   const { name, value } = target;
  //   this.setState({
  //     [name]: value,
  //   });
  // }

  // handleClick = () => {
  //   const { email } = this.state;
  //   const { userClick, history } = this.props;
  //   userClick(email);
  //   history.push('/play');
  // }
  render() {
    const { history, redirectToFeedback } = this.props;
    // const lastPosition = 4;
    return (
      <>
        <header>
          <Header />
        </header>
        <section>
          <Questions />
          <Countdown />
          <NextQuestionButton />
          {redirectToFeedback && history.push('/feedback')}
        </section>
      </>
    );
  }
}

Game.propTypes = {
  // results: PropTypes.arrayOf(PropTypes.object).isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  // currentQuestion: PropTypes.number.isRequired,
  redirectToFeedback: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  results: state.results.questions,
  currentQuestion: state.currentQuestions.currentQuestion,
  redirectToFeedback: state.currentQuestions.redirectToFeedback,
});

export default connect(mapStateToProps)(Game);
