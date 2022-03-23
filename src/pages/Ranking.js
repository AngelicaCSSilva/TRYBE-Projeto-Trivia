import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';

const HeaderDiv = styled.div`
display: flex;
justify-content: center;
align-items: center;
align-content: center;
margin: 2vh;
padding: 5px;
height: 60px;
border-radius: 50px;
font-weight: bolder;
background-color: rgb(250, 250, 250, 0.6);
`;

const ButtonStyled = styled.button`
position: relative;
  display: inline-block;
  margin: 30px 15px;
  padding: 15px 40px;
  text-align: center;
  font-size: 18px;
  letter-spacing: 1px;
  text-decoration: none;
  color: #764ba2;
  background: white;
  transition: ease-out 0.5s;
  border: 2px solid rgba(0,0,0,0.1);
  border-radius: 50px;
  -webkit-box-shadow: 8px 10px 31px 9px rgba(0,0,0,0.3); 
  box-shadow: 8px 10px 31px 9px rgba(0,0,0,0.3);
`;

const RankingDivStyled = styled.div`
margin: 2vh;
padding: 2vh;
border-radius: 50px;
background-color: rgb(250, 250, 250, 0.6);
align-text: center;
`;

const Avatar = styled.img`
width: 40px;
border-radius: 100%;
@media ( min-width : 768px ) {
  width: 60px;
}
`;

const RankingRowStyled = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  padding: 1vh;
  border-bottom: solid 1px rgb(250, 250, 250, 0.6);
`;
class Ranking extends React.Component {
  componentDidMount() {
    document.title = 'Trivia - Ranking';
  }

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
     <div>
       <Link to="/">
         <ButtonStyled type="button" data-testid="btn-go-home">
           Início
         </ButtonStyled>
       </Link>
       <HeaderDiv data-testid="ranking-title">Tela de Ranking</HeaderDiv>
       <RankingDivStyled>
         { rankingSort.map((userRanking, index) => (
           <RankingRowStyled key={ userRanking.name }>
             <Avatar src={ userRanking.img } alt="imagem de perfil" />
             <p data-testid={ `player-name-${index}` }>{ userRanking.name }</p>
             <p data-testid={ `player-score-${index}` }>{ userRanking.score }</p>
           </RankingRowStyled>
         ))}
       </RankingDivStyled>
     </div>
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
