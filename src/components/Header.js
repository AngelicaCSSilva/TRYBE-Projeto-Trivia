import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { emailFromUser, userName } = this.props;
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
        <p data-testid="header-score">
          Placar: 0
        </p>
      </>
    );
  }
}

Header.propTypes = {
  emailFromUser: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  emailFromUser: state.player.gravatarEmail,
  userName: state.player.name,
});

export default connect(mapStateToProps)(Header);
