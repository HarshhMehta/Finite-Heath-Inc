import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap/all";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const useLenisGsap = (containerRef: React.RefObject<HTMLDivElement>) => {
  const lenisRef = useRef<Lenis>();

  useEffect(() => {
    if (!containerRef.current) return;

    // Mobile detection
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

    lenisRef.current = new Lenis({
      wrapper: containerRef.current,
      content: containerRef.current?.firstChild as HTMLDivElement,
      // Mobile-specific configurations
      touchMultiplier: isMobile ? 2 : 1,
      wheelMultiplier: isMobile ? 0.5 : 1,
      infinite: false,
      // Reduce smoothness on mobile for better performance
      lerp: isMobile ? 0.8 : 0.1,
      // Duration for mobile
      duration: isMobile ? 0.8 : 1.2,
      // Easing
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    // Enhanced RAF loop with better mobile handling
    let rafId: number;
    const update = (time: number) => {
      lenisRef.current?.raf(time);
      rafId = requestAnimationFrame(update);
    };

    // Start the RAF loop
    rafId = requestAnimationFrame(update);

    // Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
    lenisRef.current?.on("scroll", ScrollTrigger.update);

    // Mobile-specific fixes
    if (isMobile) {
      // Prevent default touch behavior on the container
      const container = containerRef.current;
      
      const preventDefaultTouch = (e: TouchEvent) => {
        // Only prevent default if we're not scrolling
        if (e.touches.length > 1) {
          e.preventDefault();
        }
      };

      container.addEventListener("touchstart", preventDefaultTouch, { passive: false });
      container.addEventListener("touchmove", preventDefaultTouch, { passive: false });

      // Add CSS fixes for mobile
      container.style.touchAction = "pan-y";
      container.style.overflowY = "auto";
      // TypeScript-safe way to add webkit property
      (container.style as any).webkitOverflowScrolling = "touch";

      return () => {
        lenisRef.current?.destroy();
        cancelAnimationFrame(rafId);
        container.removeEventListener("touchstart", preventDefaultTouch);
        container.removeEventListener("touchmove", preventDefaultTouch);
      };
    }

    return () => {
      lenisRef.current?.destroy();
      cancelAnimationFrame(rafId);
    };
  }, [containerRef]);

  return lenisRef;
};
