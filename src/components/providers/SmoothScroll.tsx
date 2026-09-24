"use client";

import { ReactNode, useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScroll({
  children,
}: {
  children: ReactNode;
}) {
  useEffect(() => {
    // Respect user's reduced-motion preference
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    if (reducedMotion.matches) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const isTouchDevice =
      window.matchMedia("(pointer: coarse)").matches ||
      "ontouchstart" in window;

    const lenis = new Lenis({
      duration: isTouchDevice ? 0.8 : 1.0,
      easing: (t) => 1 - Math.pow(1 - t, 4),

      orientation: "vertical",
      gestureOrientation: "vertical",

      smoothWheel: true,

      // Keep touch scrolling natural.
      syncTouch: false,

      // Lighter touch behavior.
      touchMultiplier: 1,

      // Prevent excessive wheel smoothing.
      wheelMultiplier: 1,

      autoRaf: false,
    });

    const handleScroll = () => {
      ScrollTrigger.update();
    };

    lenis.on("scroll", handleScroll);

    const update = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);

    // Let GSAP recover naturally from frame drops.
    gsap.ticker.lagSmoothing(500, 33);

    // Refresh ScrollTrigger once everything is ready.
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      gsap.ticker.remove(update);

      lenis.off("scroll", handleScroll);
      lenis.destroy();

      // Don't destroy ScrollTriggers belonging to other components.
      ScrollTrigger.refresh();
    };
  }, []);

  return <>{children}</>;
}