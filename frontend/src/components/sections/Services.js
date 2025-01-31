import React from "react";
import { motion } from "framer-motion";

const Services = () => {
    return (
        <motion.section id='services'
            whileInView={{ opacity: 1, x: 0 }}   // Vai aparecer e mover de 0
            initial={{ opacity: 0, x: -200 }}    // Começa invisível e deslocado à esquerda
            transition={{ duration: 1 }}          // Duração de 1 segundo
        >
            <h2></h2>
           <br/>
           <br/>
           <br/>
           <br/>
           <br/>
           <br/>
           <br/>
           <br/>
           <br/>
           <br/>
           <br/>
          
           
            
        </motion.section>
    );
}

export default Services;