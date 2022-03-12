import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateCountdown, resetCountdown, stopCountdown } from '../actions';

class Countdown extends Component {
  state = {
    intervalInSeconds: 1000,
    runningTimer: null,
  }

  componentDidMount() {
    this.handleTimer();
  }

  componentDidUpdate() {
    const { runningTimer } = this.state;
    const { timer, isCountdownStopped, stopTimer } = this.props;

    // condição para limpar o timer: ter acabado o tempo ou o contador ter parado (jogador respondeu)
    if ((timer === 0 || isCountdownStopped) && runningTimer) {
      stopTimer();
      this.clearTimer();
      this.changeButtonStyles();
    }
  }

  changeButtonStyles = () => {
    const answersButtons = document.querySelectorAll('.answers');
    answersButtons.forEach((button) => {
      button.classList.remove('hidden');
      button.disabled = true;
    });
  }

  handleTimer = () => {
    const { updateTimer } = this.props;
    const { intervalInSeconds } = this.state;
    const runningTimer = setInterval(() => {
      updateTimer();
    }, intervalInSeconds);

    this.setState({
      runningTimer,
    });
  }

  clearTimer() {
    const { runningTimer } = this.state;
    clearInterval(runningTimer);

    this.setState({
      runningTimer: null,
    });
  }

  newTimer() {
    const { resetTimer } = this.props;
    resetTimer();
  }

  render() {
    const { timer } = this.props;
    return (
      <div>
        { timer }
      </div>
    );
  }
}

Countdown.propTypes = {
  timer: PropTypes.number.isRequired,
  isCountdownStopped: PropTypes.bool.isRequired,
  updateTimer: PropTypes.func.isRequired,
  resetTimer: PropTypes.func.isRequired,
  stopTimer: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  timer: state.countdown.timer,
  isCountdownStopped: state.countdown.isCountdownStopped,

});

const mapDispatchToProps = (dispatch) => ({
  updateTimer: () => dispatch(updateCountdown()),
  resetTimer: () => dispatch(resetCountdown()),
  stopTimer: () => dispatch(stopCountdown()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Countdown);
