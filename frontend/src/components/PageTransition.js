import { useLayoutEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const PageTransition = ({ children }) => {
  const location = useLocation();
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const element = containerRef.current;
    if (!element) return undefined;

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(element, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: "power1.out" });
    });

    ScrollTrigger.refresh();

    return () => mm.revert();
  }, [location.pathname]);

  return (
    <div ref={containerRef} key={location.pathname}>
      {children}
    </div>
  );
};

export default PageTransition;
