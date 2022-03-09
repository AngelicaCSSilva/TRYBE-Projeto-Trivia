import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import logo from '../trivia.png';
// import { loginAction } from '../actions';

class Login extends Component {
  state = {
    email: '',
    name: '',
  }

  handleChanges = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleClick = () => {
    const { email } = this.state;
    const { userClick, history } = this.props;
    userClick(email);
    history.push('/play');
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
        </form>
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  userClick: (email) => dispatch((email)),
});

Login.propTypes = {
  userClick: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
