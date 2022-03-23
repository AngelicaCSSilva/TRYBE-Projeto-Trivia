import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import logo from '../trivia.png';
import {
  addEmailAndNameToState,
  saveToken,
  redirecttofeedback,
  resetQuestions,
  resetUser,
} from '../actions';

// [ Styled.Components ]
// ** Header
const StyledHeader = styled.header`
  margin-top: 20vh;
`;

const StyledLogo = styled.img`
width: 80%;
@media ( min-width : 768px ) {
  width: 65%;
}
@media ( min-width : 1024px ) {
  width: 50%;
}
`;

const StyledLabel = styled.label`
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
  flex-direction: column;
  margin-top: 20px;
  `;

const Input = styled.input`
  border: solid 1px #ccc;
  margin: 4px;
  padding: 5px;
  border-radius: 10px;
  
  &:focus {
      outline: none;
      box-shadow: none;
    }
  `;

// Ref.: https://cssbuttons.io/detail/adamgiebl/rude-bear-14
const StyledButton = styled.button`
  position: relative;
  display: inline-block;
  margin: 30px 15px;
  padding: 15px 40px;
  text-align: center;
  font-size: 18px;
  letter-spacing: 1px;
  text-decoration: none;
  color: #764ba2;
  background: white;
  transition: ease-out 0.5s;
  border: 2px solid rgba(0,0,0,0.1);
  border-radius: 50px;
  -webkit-box-shadow: 8px 10px 31px 9px rgba(0,0,0,0.3); 
  box-shadow: 8px 10px 31px 9px rgba(0,0,0,0.3);

  &:disabled{
    border: 2px solid #bbb;
    color: #aaa;
  }
  `;

const PlayButton = styled(StyledButton).attrs({
  id: 'btn-play',
})`
  &:enabled {
    color: white;
    background-color: #764ba2;
  }`;

class Login extends Component {
  state = {
    email: '',
    name: '',
  }

  componentDidMount = () => {
    document.title = 'Trivia';
    const {
      dispatchRedirectToFeedback,
      resetStateQuestions,
      resetUserState,
    } = this.props;
    resetStateQuestions();
    resetUserState();
    dispatchRedirectToFeedback(false);
  }

  validateEmail = (email) => {
    const validationRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return validationRegEx.test(email);
  };

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
        <StyledHeader>
          <StyledLogo
            src={ logo }
            alt="logo"
          />
        </StyledHeader>
        <form>
          <StyledLabel htmlFor="name">
            Nome
            <Input
              id="name"
              name="name"
              data-testid="input-player-name"
              onChange={ this.handleChanges }
              placeholder="Digite o seu nome..."
              value={ name }
            />
          </StyledLabel>
          <StyledLabel htmlFor="email">
            Email
            <Input
              id="email"
              name="email"
              data-testid="input-gravatar-email"
              placeholder="Digite o seu email..."
              onChange={ this.handleChanges }
              value={ email }
            />
          </StyledLabel>
          <PlayButton
            data-testid="btn-play"
            type="button"
            id="btn-play"
            disabled={
              name.length === 0 || email.length === 0 || !this.validateEmail(email)
            }
            onClick={ this.handleClick }
          >
            Play
          </PlayButton>
          <Link to="/settings">
            <StyledButton type="button" data-testid="btn-settings">
              Configuração
            </StyledButton>
          </Link>
        </form>
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  playClick: (objectEmailName) => dispatch(addEmailAndNameToState(objectEmailName)),
  saveAPIToken: () => dispatch(saveToken()),
  dispatchRedirectToFeedback: (bool) => dispatch(redirecttofeedback(bool)),
  resetStateQuestions: () => dispatch(resetQuestions()),
  resetUserState: () => dispatch(resetUser()),
});

Login.propTypes = {
  dispatchRedirectToFeedback: PropTypes.func.isRequired,
  playClick: PropTypes.func.isRequired,
  saveAPIToken: PropTypes.func.isRequired,
  resetStateQuestions: PropTypes.func.isRequired,
  resetUserState: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
