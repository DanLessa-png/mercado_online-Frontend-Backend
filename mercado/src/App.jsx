import './App.css'
import { Routes, Route, Link } from 'react-router-dom'
import CarrinhoPage from './components/page/CarrinhoPage'
import ProdutosPage from './components/page/ProdutosPage'
import FaleConoscoPage from './components/page/ContatoPage'
import LoginPage from './components/page/LoginPage'
import RegisterPage from './components/page/RegisterPage'

function App() {
  return (
    <div className="app-root">
      <header className="app-header">
        <h1>Mercado Kpex</h1>
        <nav className="app-nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/produtos" className="nav-link">Produtos</Link>
          <Link to="/contato" className="nav-link">Contato</Link>
          <Link to="/login" className="nav-link">Login</Link>
          <Link to="/register" className="nav-link">Cadastrar</Link>
          <Link to="/carrinho" className="nav-link">Carrinho</Link>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={
            <div style={{ 
              padding: '40px 20px', 
              textAlign: 'center',
              color: '#e6eef8'
            }}>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '20px', color: '#fff' }}>
                Bem-vindo ao Mercado Kpex! 🛒
              </h2>
              <p style={{ fontSize: '1.1rem', marginBottom: '30px', color: '#cbd5e1' }}>
                Confira nossos produtos e ofertas especiais. Use o menu acima para navegar.
              </p>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '20px',
                maxWidth: '1000px',
                margin: '0 auto'
              }}>
                <div style={{
                  background: '#0e1624',
                  padding: '20px',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.06)'
                }}>
                  <h3 style={{ color: '#9bd0ff' }}>🛒 Produtos</h3>
                  <p>Veja nossos produtos com preços especiais</p>
                </div>
                <div style={{
                  background: '#0e1624',
                  padding: '20px',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.06)'
                }}>
                  <h3 style={{ color: '#9bd0ff' }}>💳 Pagamento</h3>
                  <p>Sistema de pagamento seguro e rápido</p>
                </div>
                <div style={{
                  background: '#0e1624',
                  padding: '20px',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.06)'
                }}>
                  <h3 style={{ color: '#9bd0ff' }}>📧 Contato</h3>
                  <p>Entre em contato conosco via WhatsApp ou telefone</p>
                </div>
              </div>
            </div>
          } />
          <Route path="/produtos" element={<ProdutosPage />} />
          <Route path="/contato" element={<FaleConoscoPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/carrinho" element={<CarrinhoPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
