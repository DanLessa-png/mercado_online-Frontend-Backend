import './style.css'
import { useEffect, useState } from 'react'
import { getCarrinho, checkout } from '../../../services/api'

function CarrinhoPage() {
  const [itens, setItens] = useState([])
  const [loading, setLoading] = useState(false)
  const [checkoutLoading, setCheckoutLoading] = useState(false)

  const loadCarrinho = async () => {
    try {
      setLoading(true)
      const res = await getCarrinho()
      setItens(res.data)
    } catch (err) {
      console.error(err)
      alert('Erro ao buscar carrinho. Verifique o backend.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadCarrinho() }, [])

  const handleCheckout = async () => {
    try {
      setCheckoutLoading(true)
      await checkout()
      alert('Compra finalizada com sucesso!')
      setItens([])
    } catch (err) {
      console.error(err)
      alert('Erro no checkout. Tente novamente.')
    } finally {
      setCheckoutLoading(false)
    }
  }

  return (
    <section className="carrinho container">
      <header className="carrinho__header">
        <h1>Meu Carrinho</h1>
      </header>

      {loading ? (
        <p>Carregando itens...</p>
      ) : (
        <div className="carrinho__list">
          {itens.length === 0 ? (
            <p>Seu carrinho está vazio.</p>
          ) : (
            <>
              <ul>
                {itens.map(item => (
                  <li key={item.id} className="carrinho__item">
                    <strong>{item.produto.nome}</strong> — {item.quantidade} x R$ {item.produto.preco}
                  </li>
                ))}
              </ul>

              <div style={{ marginTop: 20 }}>
                <button onClick={handleCheckout} disabled={checkoutLoading}>
                  {checkoutLoading ? 'Processando...' : 'Finalizar Compra'}
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </section>
  )
}

export default CarrinhoPage
