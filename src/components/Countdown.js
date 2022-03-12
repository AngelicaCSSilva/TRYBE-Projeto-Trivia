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

export default connect(mapStateToProps, mapDispatchToProps)(Countdown);
