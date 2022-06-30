import React, { useState } from 'react';
import PropTypes from 'prop-types';
import VotingContext from './VotingContext';
import { requestData } from './requests';

export default function VotingProvider({ children }) {
  const [candidates, setCandidates] = useState([]);
  const [votes, setVotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [vote, setVote] = useState('');
  const [password, setPassword] = useState('');
  const [failedTryLogin, setFailedTryLogin] = useState(false);

  const fetchAPI = async () => {
    setIsLoading(true);
    const response = await requestData('/candidates');
    console.log(response);
    setCandidates(response);
    setIsLoading(false);
  };

  return (
    <VotingContext.Provider
      value={ {
        candidates,
        setCandidates,
        isLoading,
        setIsLoading,
        fetchAPI,
        isLogged,
        setIsLogged,
        email,
        setEmail,
        password,
        setPassword,
        failedTryLogin,
        setFailedTryLogin,
        vote,
        setVote,
        user,
        setUser,
        votes,
        setVotes,
      } }
    >
      { children }
    </VotingContext.Provider>
  );
}

VotingProvider.propTypes = {
  children: PropTypes.node.isRequired,
};