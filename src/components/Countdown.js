import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
class Countdown extends Component {
  render() {
    return (
      <div>
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
