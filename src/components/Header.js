import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';

const FlexDiv = styled.div`
display: flex;
flex-direction: row;
flex-wrap: wrap;
justify-content: space-evenly;
align-items: center;
align-content: center;
margin: 2vh;
padding: 5px;
height: 60px;
border-radius: 50px;
background-color: rgb(250, 250, 250, 0.6);
`;

const Avatar = styled.img`
width: 40px;
border-radius: 100%;
@media ( min-width : 768px ) {
  width: 60px;
}
`;
class Header extends Component {
  render() {
    const { emailFromUser, userName, userScore } = this.props;
    const hash = md5(emailFromUser).toString();
    return (
      <FlexDiv>
        <Avatar
          src={ `https://www.gravatar.com/avatar/${hash}` }
          alt="imagem do usuario"
          data-testid="header-profile-picture"
        />
        <p data-testid="header-player-name">
          { userName }
        </p>
        <label htmlFor="header-score">
          Placar:
          {' '}
          <span id="header-score" data-testid="header-score">{ userScore }</span>
        </label>
      </FlexDiv>
    );
  }
}

Header.propTypes = {
  emailFromUser: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  userScore: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  emailFromUser: state.player.gravatarEmail,
  userName: state.player.name,
  userScore: state.player.score,
});

export default connect(mapStateToProps)(Header);
