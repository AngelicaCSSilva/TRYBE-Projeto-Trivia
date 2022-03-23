import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateCountdown, resetCountdown, stopCountdown, nextButton } from '../actions';

const CountdownStyled = styled.div`
  font-size: 6vh;
`;
class Countdown extends Component {
  state = {
    intervalInSeconds: 1000,
    runningTimer: null,
  }

  componentDidMount() {
    const { resetTimer } = this.props;
    resetTimer();
    this.handleTimer();
  }

  componentDidUpdate() {
    const { runningTimer } = this.state;
    const { timer, isCountdownStopped, saveButtonState, durationInSeconds } = this.props;

    // condição para limpar o timer: ter acabado o tempo ou o contador ter parado (jogador respondeu)
    if ((timer === 0 || isCountdownStopped) && runningTimer) {
      saveButtonState(true);
      this.clearTimer();
      this.changeButtonStyles();
    }
    if (timer === durationInSeconds && !isCountdownStopped && !runningTimer) {
      this.handleTimer();
    }
  }

  componentWillUnmount() {
    const { runningTimer } = this.state;
    if (runningTimer) this.clearTimer();
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
      <CountdownStyled>
        { timer }
      </CountdownStyled>
    );
  }
}

Countdown.propTypes = {
  timer: PropTypes.number.isRequired,
  isCountdownStopped: PropTypes.bool.isRequired,
  durationInSeconds: PropTypes.number.isRequired,
  updateTimer: PropTypes.func.isRequired,
  resetTimer: PropTypes.func.isRequired,
  saveButtonState: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  timer: state.countdown.timer,
  isCountdownStopped: state.countdown.isCountdownStopped,
  durationInSeconds: state.countdown.durationInSeconds,
});

const mapDispatchToProps = (dispatch) => ({
  updateTimer: () => dispatch(updateCountdown()),
  resetTimer: () => dispatch(resetCountdown()),
  stopTimer: () => dispatch(stopCountdown()),
  saveButtonState: (bool) => dispatch(nextButton(bool)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Countdown);
