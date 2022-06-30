import React, { useContext, useEffect, Navigate } from 'react';
import VotingContext from '../contextAPI/VotingContext';
import Login from './Login';
import Loading from '../components/Loading';

export const Home = () => {
  const { fetchAPI, isLoading, isLogged } = useContext(VotingContext);

  useEffect(() => {
    fetchAPI();
  }, []);

    if (isLoading) {
      return <Loading />
    } else if (isLogged) {
      return <Navigate to="/vote" />;
    } else {
      return <Login />;
    }
}
