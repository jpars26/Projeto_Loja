import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const useReveal = ({ y = 24, duration = 0.6, start = "top 85%" } = {}) => {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          element,
          { opacity: 0, y },
          {
            opacity: 1,
            y: 0,
            duration,
            ease: "power2.out",
            scrollTrigger: {
              trigger: element,
              start,
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(element, { opacity: 1, y: 0 });
      });
    }, element);

    return () => ctx.revert();
  }, [y, duration, start]);

  return ref;
};
