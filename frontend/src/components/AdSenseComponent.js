import React, { useEffect } from "react";

const AdSenseComponent = ({ adSlot }) => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("Falha ao carregar o AdSense", e);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client="ca-pub-XXXXXXXXXX" // Substitua pelo seu código do AdSense
      data-ad-slot={adSlot} // ID do bloco de anúncios
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  );
};

export default AdSenseComponent;


/*  
Substitua ca-pub-XXXXXXXXXX pelo seu código do AdSense.
🔹 adSlot é o ID do bloco de anúncio que você criou no AdSense.

 { Inserir o Anúncio Aqui }
 <AdSenseComponent adSlot="1234567890" />
🔹 Substitua 1234567890 pelo ID do bloco de anúncio criado no AdSense.
*/