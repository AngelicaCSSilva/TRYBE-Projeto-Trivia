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

const mapDispatchToProps = (dispatch) => ({
  updateTimer: () => dispatch(updateCountdown()),
  resetTimer: () => dispatch(resetCountdown()),
  stopTimer: () => dispatch(stopCountdown()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Countdown);
