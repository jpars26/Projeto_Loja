import React from 'react';
import './Colecoes.css'; // Estilo que você pode personalizar
import amanda from "../assets/images/amanda.webp";

const colecoes = [
    { nome: 'Coleção Noiva 2025', preco: 'A partir de R$ 800', imagem: amanda, selo: 'Lançamento' },
    { nome: 'Coleção Madrinhas Luxo', preco: 'A partir de R$ 500', imagem: amanda, selo: 'Sob Medida' },
    { nome: 'Coleção Formandas 2025', preco: 'A partir de R$ 600', imagem: amanda, selo: 'Exclusivo' },
    // Adicione suas coleções aqui
];

const Colecoes = () => {
    return (
        <div className="pagina-colecoes">
            <h2 className="titulo-pagina">Nossas Coleções</h2>

            <div className="grid-colecoes">
                {colecoes.map((col, index) => (
                    <div key={index} className="colecao-card">
                        <div className="imagem-container">
                            <img src={col.imagem} alt={col.nome} />
                            <span className="selo">{col.selo}</span>
                        </div>
                        <h3>{col.nome}</h3>
                        <p>{col.preco}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Colecoes;
