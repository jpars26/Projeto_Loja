// ProductCard.js

import { useOnScreen } from "../hooks/useOnScreen"; // ajuste o caminho conforme sua estrutura

const ProductCard = ({ product, index }) => {
  const [ref, isVisible] = useOnScreen({
    threshold: 0.2, // ajuste conforme necessário
  });

  // Define o delay incremental com base no índice do card
  const delayStyle = {
    transitionDelay: isVisible ? `${index * 0.2}s` : "0s",
  };

  return (
    <div 
      ref={ref} 
      style={delayStyle}
      className={`product-card ${isVisible ? "animate" : "hidden"}`}
    >
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.price}</p>
    </div>
  );
};

export default ProductCard;
