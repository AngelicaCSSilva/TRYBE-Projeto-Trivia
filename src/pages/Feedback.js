import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { clearRandomlyAnswers } from '../actions';

const FeedbackSectionStyled = styled.section`
margin: 2vh;
padding: 2vh;
border-radius: 50px;
background-color: rgb(250, 250, 250, 0.6);
`;

const ButtonStyled = styled.button`
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
class Feedback extends React.Component {
  componentDidMount() {
    document.title = 'Trivia - Resultado';
    const { clearAnswers } = this.props;
    clearAnswers();
  }

  render() {
    const { userAssertions, userScore } = this.props;
    const MIN_POINTS = 2;
    return (
      <>
        <Header />
        <FeedbackSectionStyled>
          <h1 data-testid="feedback-text">
            { userAssertions <= MIN_POINTS ? 'Could be better...' : 'Well Done!'}
          </h1>
          <label htmlFor="total-score">
            Placar Final:
            <p id="total-score" data-testid="feedback-total-score">{ userScore }</p>
          </label>
          <label htmlFor="total-question">
            Respostas Corretas:
            <p id="total-question" data-testid="feedback-total-question">
              { userAssertions }
            </p>
          </label>
        </FeedbackSectionStyled>
        <Link to="/">
          <ButtonStyled type="button" data-testid="btn-play-again">
            Play Again
          </ButtonStyled>
        </Link>

        <Link to="/ranking">
          <ButtonStyled
            type="button"
            data-testid="btn-ranking"
            onClick={ this.hendleRanking }
          >
            Ranking
          </ButtonStyled>
        </Link>
      </>
    );
  }
}

Feedback.propTypes = {
  userAssertions: PropTypes.number.isRequired,
  userScore: PropTypes.number.isRequired,
  clearAnswers: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  userAssertions: state.player.assertions,
  userScore: state.player.score,
});

const mapDispatchToProps = (dispatch) => ({
  clearAnswers: () => dispatch(clearRandomlyAnswers()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
