import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowUp, FaArrowLeft } from 'react-icons/fa'; // Ícones para o botão

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
        <div className="fixed bottom-5 left-1/2 z-40 flex -translate-x-1/2 gap-3 sm:bottom-6 sm:left-auto sm:right-24 sm:translate-x-0">
            {/* Botão Voltar */}
            <button
                onClick={handleBack}
                aria-label="Voltar"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-hairline bg-surface text-ink shadow transition-colors hover:border-accent hover:text-accent"
            >
                <FaArrowLeft />
            </button>

            {/* Botão Scroll para o Topo */}
            {showScroll && (
                <button
                    onClick={scrollToTop}
                    aria-label="Voltar ao topo"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-hairline bg-surface text-ink shadow transition-colors hover:border-accent hover:text-accent"
                >
                    <FaArrowUp />
                </button>
            )}
        </div>
    );
};

export default BackToTopAndBackButton;
