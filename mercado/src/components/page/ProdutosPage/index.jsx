// C:\Users\aluno.den\Downloads\mercado\src\components\page\ProdutosPage\index.jsx

import './style.css'
import { useState } from 'react'
import { addToCarrinho } from '../../../services/api'

function ProdutosPage() {
    const [loadingId, setLoadingId] = useState(null)

    const services = [
        { id: 1, title: 'Arroz', desc: 'Valor R$ 5,89' },
        { id: 2, title: 'Feijão', desc: 'Valor R$ 7,43' },
        { id: 3, title: 'Farinha', desc: 'Valor R$ 3,34' },
        { id: 4, title: 'Café', desc: 'Valor R$ 10,45' },
        { id: 5, title: 'Macarrão', desc: 'Valor R$ 7,34' },
        { id: 6, title: 'Carne', desc: 'Valor R$ 25,65' },
    ]

    const handleAdicionar = async (produto) => {
        try {
            setLoadingId(produto.id)
            await addToCarrinho(produto.id, 1)
            alert(`Produto "${produto.title}" adicionado ao carrinho.`)
        } catch (err) {
            console.error(err)
            alert('Erro ao adicionar ao carrinho. Verifique se o backend está rodando.')
        } finally {
            setLoadingId(null)
        }
    }

    return (
        <section className="produtos container">
            <header className="produtos__header">
                <h1>Nossos Produtos</h1>
                <p>Oferecemos Produtos Com A Melhor Qualidade</p>
            </header>

            <div className="produtos__grid">
                {services.map((s) => (
                    <article key={s.id} className="produto card">
                        <h3>{s.title}</h3>
                        <p>{s.desc}</p>
                        <div className="produto__actions">
                            <button type="button" onClick={() => handleAdicionar(s)} disabled={loadingId === s.id}>
                                {loadingId === s.id ? 'Adicionando...' : 'Adicionar ao Carrinho'}
                            </button>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    )
}

export default ProdutosPage