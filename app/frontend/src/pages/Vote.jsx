import React, { useEffect, useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { requestData, requestLogin, setToken } from '../contextAPI/requests';
import VotingContext from '../contextAPI/VotingContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
// import Loading from '../components/Loading';
// import Login from '../components/Login';

const Vote = () => {
  const { fetchAPI, candidates, isLogged, setIsLogged, vote, setVote } = useContext(VotingContext);
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
      requestData('/login/validate')
        .then(() => setIsLogged(true))
        .catch((err) => console.log(err));
    })();
  }, []);


  const status = () => {
    const result = candidates.map((candidate) => (
      <div className="candidate-div" key={candidate.id}>
        <input
          className='candidate-radio'
          data-test-id={candidate.name}
          value={candidate.id}
          type="radio"
          name='votar'
          onClick={async () => sendVote(candidate.id)}
        />
        <span className="candidate-name" data-testid="candidate-name">{candidate.name}</span>
      </div>))
      console.log(result);
      return result;
  }

  const sendVote = async (id) => {
    const person = await requestLogin('/vote', { "id": id });
    setVote(person);
  }

  if (!isLogged) return <Navigate to="/login" />;

  return (
    <>
      <main className="voting-main">
        <Header />
        <section className="voting-section">
          <h2>Escolha um Brother!</h2>
          {status()}
          <p className='votou'>{vote}</p>
        </section>
        <Footer />
      </main>

    </>
  );
};

export default Vote;
