import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends React.Component {
  render() {
    const { userAssertions } = this.props;
    console.log(userAssertions);
    const MIN_POINTS = 2;
    return (
      <section>
        <Header />
        <h1 data-testid="feedback-text">
          { userAssertions <= MIN_POINTS ? 'Could be better...' : 'Well Done!'}
        </h1>
      </section>
    );
  }
}

Feedback.propTypes = {
  userAssertions: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  userAssertions: state.player.assertions,
});

export default connect(mapStateToProps)(Feedback);
