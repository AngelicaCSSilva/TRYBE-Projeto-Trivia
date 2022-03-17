import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class Feedback extends React.Component {
  render() {
    const { userAssertions, userScore } = this.props;
    console.log(userAssertions);
    const MIN_POINTS = 2;
    return (
      <section>
        <Header />
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
        <Link to="/">
          <button type="button" data-testid="btn-play-again">
            Play Again
          </button>
        </Link>

        <Link to="/ranking">
          <button type="button" data-testid="btn-ranking">
            Ranking
          </button>
        </Link>
      </section>
    );
  }
}

Feedback.propTypes = {
  userAssertions: PropTypes.number.isRequired,
  userScore: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  userAssertions: state.player.assertions,
  userScore: state.player.score,
});

export default connect(mapStateToProps)(Feedback);
