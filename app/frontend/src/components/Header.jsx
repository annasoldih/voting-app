import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Header extends Component {
  render() {
    return (
      <header className="voting-header">
        <h2>This is the Amazing Vote App</h2>
        <div className='links'>
        <Link to="/vote" className="header-link">
          <span className="link-text">Votar</span>
        </Link>
        <Link to="/dashboard" className="header-link">
          <span className="link-text">Painel</span>
        </Link>
        </div>
      </header>
    );
  }
}
