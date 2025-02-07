import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function AdSenseReload() {
  const location = useLocation();

  useEffect(() => {
    if (window.adsbygoogle) {
      window.adsbygoogle.push({});
    }
  }, [location.pathname]);

  return null;
}
