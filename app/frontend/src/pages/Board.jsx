import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestData, setToken } from '../contextAPI/requests';
import VotingContext from '../contextAPI/VotingContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Board = () => {
  const { fetchAPI, votes, setVotes } = useContext(VotingContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAPI();
  }, []);


  useEffect(() => {
    (async () => {
      const storage = JSON.parse(localStorage.getItem('user'));
      if (!storage) return navigate('/');
      const { token } = storage;
      setToken(token);
      const getVotes = await requestData('/dashboard');
      setVotes(getVotes);

    })();
  }, []);


  const status = () => {
    return votes.map((candidate) => (
      <div className="category-div" key={candidate.id}>
        <p>
          <span className="candidate-name-board" data-testid="category">{candidate.name}</span>
          <span className="candidate-count-board" data-testid="category">{candidate.count}</span>
        </p>
      </div>
    ));
  }

  return (
    <>
      <main className="voting-main">
        <Header />
        <section className="board">
          <h3>Resultados</h3>
          {status()}
        </section>
        <Footer />
      </main>

    </>
  );
};

export default Board;
