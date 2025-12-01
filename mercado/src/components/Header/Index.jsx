// C:\Users\aluno.den\Downloads\mercado\src\components\Header\Index.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import './style.css'; 

function Header() {
  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">Mercado Desatakarejo</Link>
        <nav className="nav">
          <Link to="/cadastro" className="navLink">Produtos</Link>
          <Link to="/usuarios" className="navLink">Pagamento</Link>
          <Link to="/usuarios" className="navLink">Contato</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;