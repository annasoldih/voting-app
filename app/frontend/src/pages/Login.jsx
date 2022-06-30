import React, { useEffect, useContext } from 'react';
import VotingContext from '../contextAPI/VotingContext';
import { Navigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { requestLogin } from '../contextAPI/requests';

const Login = () => {
  const {
    isLogged,
    setIsLogged,
    email,
    setEmail,
    password,
    setPassword,
    failedTryLogin,
    setFailedTryLogin,
  } = useContext(VotingContext);

  const login = async (event) => {
    event.preventDefault();
    try {
      const endpoint = '/login';
      const { token, user } = await requestLogin(endpoint, { email, password });
      localStorage.setItem('user', JSON.stringify({ token, ...user }));
      localStorage.setItem('logged', isLogged);
      setIsLogged(true);
    } catch (error) {
      setFailedTryLogin(true);
      setIsLogged(false);
    }
  };

  useEffect(() => {
    setFailedTryLogin(false);
  }, [email, password, setFailedTryLogin]);

  if (isLogged) return <Navigate to="/vote" />;

  return (
    <>
      <main className="voting-main">
        <Header />
        <section className="user-login-area">
          <h3>Área do usuário</h3>
          <form className='form-login'>
            <label htmlFor="email-input">
              <input
                className="login__login_input"
                type="text"
                value={email}
                onChange={({ target: { value } }) => setEmail(value)}
                data-testid="login__login_input"
                placeholder="Login"
              />
            </label>
            <label htmlFor="password-input">
              <input
                type="password"
                value={password}
                onChange={({ target: { value } }) => setPassword(value)}
                data-testid="login__password_input"
                className="login__password_input"
                placeholder="Senha"
              />
            </label>
            {
              (failedTryLogin)
                ? (
                  <p data-testid="login__input_invalid_login_alert" className='login-warning'>
                    {
                      `O endereço de e-mail ou a senha não estão corretos.
                    Por favor, tente novamente.`
                    }
                  </p>
                )
                : null
            }
            <button
              data-testid="login__login_btn"
              type="submit"
              className="login__button_input"

              onClick={(event) => login(event)}
            >
              Entrar
            </button>
          </form>
        </section>
        <Footer />
      </main>
    </>
  );
};

export default Login;
