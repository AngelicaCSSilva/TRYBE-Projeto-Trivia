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
    );
  }
}


export default connect(null, mapDispatchToProps)(Login);
