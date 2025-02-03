import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation(); // Detecta mudanças na rota

  useEffect(() => {
    window.scrollTo(0, 0); // Faz o scroll para o topo sempre que a rota mudar
  }, [pathname]);

  return null;
};

export default ScrollToTop;
