import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import logo from '../trivia.png';
import {
  addEmailAndNameToState,
  saveToken,
  redirecttofeedback,
  saveQuestions,
} from '../actions';

class Login extends Component {
  state = {
    email: '',
    name: '',
  }

  componentDidMount = () => {
    const { dispatchRedirectToFeedback } = this.props;
    dispatchRedirectToFeedback(false);
  }

  handleChanges = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleClick = async () => {
    const { email, name } = this.state;
    const { playClick, saveAPIToken, history } = this.props;
    playClick({ email, name });
    await saveAPIToken();
    history.push('/game');
  }

  render() {
    const { email, name } = this.state;
    return (
      <section>
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <p>
            SUA VEZ
          </p>
        </header>
        <form>
          <label htmlFor="name">
            Nome
            <input
              id="name"
              name="name"
              data-testid="input-player-name"
              onChange={ this.handleChanges }
              value={ name }
            />
          </label>
          <label htmlFor="email">
            Email
            <input
              id="email"
              name="email"
              data-testid="input-gravatar-email"
              onChange={ this.handleChanges }
              value={ email }
            />
          </label>
          <button
            data-testid="btn-play"
            type="button"
            disabled={
              name.length === 0 || email.length === 0
            }
            onClick={ this.handleClick }
          >
            Play
          </button>
          <Link to="/settings">
            <button type="button" data-testid="btn-settings">
              configuração
            </button>
          </Link>
        </form>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.token,
});

const mapDispatchToProps = (dispatch) => ({
  saveAPIQuestions: (token) => dispatch(saveQuestions(token)),
  playClick: (objectEmailName) => dispatch(addEmailAndNameToState(objectEmailName)),
  saveAPIToken: () => dispatch(saveToken()),
  dispatchRedirectToFeedback: (bool) => dispatch(redirecttofeedback(bool)),
});

Login.propTypes = {
  playClick: PropTypes.func.isRequired,
  saveAPIToken: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
