import React from 'react';
import { Link } from 'react-router-dom';

class Ranking extends React.Component {
  render() {
    return (
      <section>
        <h1 data-testid="ranking-title">Tela de Ranking</h1>
        <Link to="/">
          <button type="button" data-testid="btn-go-home">
            Inicio
          </button>
        </Link>
      </section>
    );
  }
}

export default Ranking;
