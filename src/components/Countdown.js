import React, { Component } from 'react';
import { connect } from 'react-redux';
class Countdown extends Component {
  render() {
    return (
      <div>
      </div>
    );
  }
}

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
