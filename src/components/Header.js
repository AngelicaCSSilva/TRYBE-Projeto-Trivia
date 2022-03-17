import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { emailFromUser, userName, userScore } = this.props;
    const hash = md5(emailFromUser).toString();
    return (
      <>
        <img
          src={ `https://www.gravatar.com/avatar/${hash}` }
          alt="imagem do usuario"
          data-testid="header-profile-picture"
        />
        <p data-testid="header-player-name">
          { `Nome de suário: ${userName}` }
        </p>
        <label htmlFor="header-score">
          Placar:
          <p id="header-score" data-testid="header-score">{ userScore }</p>
        </label>
      </>
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
