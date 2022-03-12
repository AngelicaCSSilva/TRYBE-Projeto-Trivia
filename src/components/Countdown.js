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
  maxDuration: PropTypes.number.isRequired,
  updateTimer: PropTypes.func.isRequired,
  resetTimer: PropTypes.func.isRequired,
  stopTimer: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  timer: state.countdown.timer,
  isCountdownStopped: state.countdown.isCountdownStopped,
  maxDuration: state.countdown.durationInSeconds,
});

const mapDispatchToProps = (dispatch) => ({
  updateTimer: () => dispatch(updateCountdown()),
  resetTimer: () => dispatch(resetCountdown()),
  stopTimer: () => dispatch(stopCountdown()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Countdown);
