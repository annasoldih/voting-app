import React, { useContext, useEffect } from 'react';
import VotingContext from '../contextAPI/VotingContext';

export const Logoff = () => {
  const { isLogged, setIsLogged, setUser } = useContext(VotingContext);

  const setLogoff = async () => {
    await setIsLogged(false);
    localStorage.clear();
  }

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = (loggedInUser);
      setUser(foundUser);
    }
  }, []);

  return (
    <>
      {
        isLogged ? <button type="submit" onClick={setLogoff()} className="logoff-button">Logoff</button> : <p>Efetue Login!</p>
      }
    </>

  );
}

