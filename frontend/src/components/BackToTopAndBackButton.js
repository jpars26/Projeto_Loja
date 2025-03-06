import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowUp, FaArrowLeft } from 'react-icons/fa'; // Ícones para o botão

import './BackToTopAndBackButton.css'; // Crie um CSS só para ele

const BackToTopAndBackButton = () => {
    const [showScroll, setShowScroll] = useState(false);
    const navigate = useNavigate();

    // Mostrar botão "voltar ao topo" só quando o usuário rolar um pouco a página
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShowScroll(true);
            } else {
                setShowScroll(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Função para voltar ao topo
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Função para voltar à página anterior
    const handleBack = () => {
        navigate(-1); // Volta uma página no histórico do navegador
    };

    return (
        <div className="floating-buttons">
            {/* Botão Voltar */}
            <button className="btn-back" onClick={handleBack} aria-label="Voltar">
                <FaArrowLeft />
            </button>

            {/* Botão Scroll para o Topo */}
            {showScroll && (
                <button className="btn-top" onClick={scrollToTop} aria-label="Voltar ao topo">
                    <FaArrowUp />
                </button>
            )}
        </div>
    );
};

export default BackToTopAndBackButton;
