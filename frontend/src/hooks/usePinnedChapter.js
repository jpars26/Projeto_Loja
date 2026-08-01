import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const usePinnedChapter = (itemCount, { stepDistance = 400 } = {}) => {
  const sectionRef = useRef(null);
  const itemRefs = useRef([]);
  itemRefs.current = Array.from({ length: itemCount }, (_, i) => itemRefs.current[i] ?? null);

  useEffect(() => {
    const section = sectionRef.current;
    const items = itemRefs.current;
    if (!section || items.some((item) => !item)) return undefined;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(items, { opacity: 0, y: 24 });
        gsap.set(items[0], { opacity: 1, y: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: `+=${stepDistance * (itemCount - 1)}`,
            pin: true,
            scrub: 1,
          },
        });

        items.forEach((item, index) => {
          if (index === 0) return;
          tl.to(items[index - 1], { opacity: 0, y: -24, duration: 0.3 }, index - 1);
          tl.fromTo(item, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.3 }, index - 1);
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(items, { opacity: 1, y: 0 });
      });
    }, section);

    return () => ctx.revert();
  }, [itemCount, stepDistance]);

  const setItemRef = (index) => (node) => {
    itemRefs.current[index] = node;
  };

  return { sectionRef, setItemRef };
};
