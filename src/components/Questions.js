import React, { Component } from 'react';
import { connect } from 'react-redux';

class Questions extends Component {

    componentDidMount = async () => {
      const { token, saveAPIQuestions } = this.props;
      await saveAPIQuestions(token);
      const { results } = this.props;
      this.setState({ allQuestions: results });
    }

    render() {
      return (
        <section>
        </section>
      );
    }
}

Questions.propTypes = {
  token: PropTypes.string.isRequired,
  saveAPIQuestions: PropTypes.func.isRequired,
  // saveAPIToken: PropTypes.func.isRequired,
  results: PropTypes.objectOf(PropTypes.array).isRequired,
  // statusCode: PropTypes.objectOf(PropTypes.array).isRequired,
};
const mapStateToProps = (state) => ({
  token: state.token,
  results: state.results.questions,
});
export default connect(mapStateToProps, mapDispatchToProps)(Questions);
