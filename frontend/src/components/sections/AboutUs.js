import React from 'react';
import { motion } from 'framer-motion';  // Importando o Framer Motion
import Footer from '../Footer';
import CustomerGallery from './CustomerGallery'; // Importe o CustomerGallery aqui
const AboutUs = () => {
  return (
    <motion.section id="about-us" 
        initial={{ opacity: 0 }}   // Estado inicial (invisível)
        animate={{ opacity: 1 }}   // Estado final (totalmente visível)
        transition={{ duration: 1 }} // Duração da animação
    >
        <h2>Sobre nós</h2>
        <p>
            Somos uma loja especializada em aluguel de roupas de festa para formaturas e casamentos. 
            Oferecemos qualidade, elegância e conforto para você brilhar no seu evento!
        </p>
        <CustomerGallery /> {/* ✅ Adicione o CustomerGallery aqui */}  
        <Footer /> {/* ✅ Adicione o Footer aqui */}  
        
    </motion.section>
    
    
     
  );
}

export default AboutUs;