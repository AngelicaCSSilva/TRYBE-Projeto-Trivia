import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';

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

Ranking.propTypes = {
  emailFromUser: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.player.name,
  score: state.player.score,
  emailFromUser: state.player.gravatarEmail,
});

export default connect(mapStateToProps)(Ranking);
