import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function useGSAP(callback, scopeRef, deps = []) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      callback({ gsap, ScrollTrigger });
    }, scopeRef?.current || undefined);

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      ctx.revert();
    };
    // deps intentionally controlled by caller
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
