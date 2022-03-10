import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
class Header extends Component {
  render() {
    const { emailFromUser, userName } = this.props;
    return (
    );
  }
}

const mapStateToProps = (state) => ({
  emailFromUser: state.player.gravatarEmail,
  userName: state.player.name,
});
export default connect(mapStateToProps)(Header);
