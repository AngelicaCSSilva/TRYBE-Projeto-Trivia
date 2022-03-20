import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';

class Ranking extends React.Component {
 getRanking = () => {
   const { name, score, emailFromUser } = this.props;
   const hash = md5(emailFromUser).toString();
   const img = `https://www.gravatar.com/avatar/${hash}`;
   const ranking = { name, score, img };
   const getRanking = JSON.parse(localStorage.getItem('ranking'));
   if (getRanking === null) {
     localStorage.setItem('ranking', JSON.stringify([ranking]));
   } else {
     const spreadGetRanking = [...getRanking, ranking];
     localStorage.setItem('ranking', JSON.stringify(spreadGetRanking));
   }
   return JSON.parse(localStorage.getItem('ranking'));
 }

 render() {
   const getLocalStorageRanking = this.getRanking();
   const rankingSort = getLocalStorageRanking.sort(({ score: a }, { score: b }) => b - a);

   return (
     <section>
       <h1 data-testid="ranking-title">Tela de Ranking</h1>
       <Link to="/">
         <button type="button" data-testid="btn-go-home">
           Inicio
         </button>
       </Link>
       { rankingSort.map((userRanking, index) => (
         <div key={ userRanking.name }>
           <p data-testid={ `player-name-${index}` }>{ userRanking.name }</p>
           <p data-testid={ `player-score-${index}` }>{ userRanking.score }</p>
           <img src={ userRanking.name } alt="imagem de perfil" />
         </div>
       ))}
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
