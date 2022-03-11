import React, { Component } from 'react';
import Header from '../components/Header';
import Questions from '../components/Questions';

class Game extends Component {
  // handleChanges = ({ target }) => {
  //   const { name, value } = target;
  //   this.setState({
  //     [name]: value,
  //   });
  // }

  // handleClick = () => {
  //   const { email } = this.state;
  //   const { userClick, history } = this.props;
  //   userClick(email);
  //   history.push('/play');
  // }
  render() {
    return (
      <>
        <header>
          <Header />
        </header>
        <section>
          <Questions />
        </section>
      </>
    );
  }
}

export default Game;
