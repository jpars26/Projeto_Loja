import React, { useEffect } from "react";

const InstagramWidget = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://static.elfsight.com/platform/platform.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return <div className="elfsight-app-2c2957ef-1f19-4bfd-94d3-3efdfb5c1b31" data-elfsight-app-lazy></div>;
};

export default InstagramWidget;