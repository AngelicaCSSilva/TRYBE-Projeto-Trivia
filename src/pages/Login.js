import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import logo from '../trivia.png';
// import { loginAction } from '../actions';

class Login extends Component {
  handleChanges = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  render() {
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


export default connect(null, mapDispatchToProps)(Login);
