// C:\Users\aluno.den\Downloads\mercado\src\components\Footer\index.jsx

import './style.css';

function Footer() {
  const anoAtual = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container">
        <p>Mercado Desatakarejo | &copy; {anoAtual} Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;