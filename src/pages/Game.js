import React, { Component } from 'react';
import Header from '../components/Header';

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
          <p> AAAA </p>
        </section>
      </>
    );
  }
}

export default Game;