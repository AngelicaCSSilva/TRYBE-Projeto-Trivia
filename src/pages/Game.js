import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Countdown from '../components/Countdown';
import Header from '../components/Header';
import Questions from '../components/Questions';
import NextQuestionButton from '../components/NextQuestionButton';

const GameSectionStyled = styled.section`
  margin: 2vh;
  padding: 1vh;
  border-radius: 50px;
  background-color: rgb(250, 250, 250, 0.6);
`;
class Game extends React.Component {
  componentDidMount() {
    document.title = 'Trivia - Jogando...';
  }

  render() {
    const { history, redirectToFeedback } = this.props;
    return (
      <>
        <header>
          <Header />
        </header>
        <GameSectionStyled>
          <Questions />
          <Countdown />
        </GameSectionStyled>
        <NextQuestionButton />
        {redirectToFeedback && history.push('/feedback')}
      </>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  redirectToFeedback: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  results: state.results.questions,
  currentQuestion: state.currentQuestions.currentQuestion,
  redirectToFeedback: state.currentQuestions.redirectToFeedback,
});

export default connect(mapStateToProps)(Game);
