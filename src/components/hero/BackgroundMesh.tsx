"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  baseAlpha: number;
}

export default function BackgroundMesh() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d", {
      alpha: true,
      desynchronized: true,
    });

    if (!ctx) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const isMobile =
      window.matchMedia("(pointer: coarse)").matches ||
      window.innerWidth < 768;

    let width = 0;
    let height = 0;
    let animationFrameId = 0;
    let lastFrameTime = 0;
    let time = 0;

    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const particles: Particle[] = [];

    /*
     * Adaptive particle count.
     *
     * Desktop  → richer background
     * Tablet   → reduced
     * Mobile   → lightweight
     */
    const getParticleCount = () => {
      const area = width * height;

      if (isMobile) {
        return Math.min(18, Math.max(8, Math.floor(area / 90000)));
      }

      return Math.min(30, Math.max(12, Math.floor(area / 50000)));
    };

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      mouseX = width * 0.5;
      mouseY = height * 0.5;
      targetMouseX = mouseX;
      targetMouseY = mouseY;
    };

    resizeCanvas();

    const particleCount = getParticleCount();

    for (let i = 0; i < particleCount; i++) {
      const baseAlpha = 0.12 + Math.random() * 0.2;

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        radius: 0.8 + Math.random() * 1.2,
        alpha: baseAlpha,
        baseAlpha,
      });
    }

    const handleMouseMove = (event: MouseEvent) => {
      if (isMobile) return;

      targetMouseX = event.clientX;
      targetMouseY = event.clientY;
    };

    const handleResize = () => {
      resizeCanvas();
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = 0;
      } else {
        lastFrameTime = performance.now();
        animationFrameId = requestAnimationFrame(render);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, {
      passive: true,
    });

    window.addEventListener("resize", handleResize, {
      passive: true,
    });

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange
    );

    /*
     * Render loop
     *
     * We cap the background animation at roughly 60fps.
     * The browser can still render the rest of the page at higher
     * refresh rates without this canvas consuming unnecessary CPU.
     */
    const render = (currentTime: number) => {
      const frameDelta = currentTime - lastFrameTime;

      if (frameDelta < 16) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      lastFrameTime = currentTime;

      time += 0.004;

      /*
       * Mouse movement is intentionally disabled on touch devices.
       */
      if (!isMobile) {
        mouseX += (targetMouseX - mouseX) * 0.025;
        mouseY += (targetMouseY - mouseY) * 0.025;
      }

      ctx.clearRect(0, 0, width, height);

      /*
       * Atmospheric background.
       *
       * Instead of recreating an expensive gradient every frame,
       * only update it periodically.
       */
      const gradient = ctx.createRadialGradient(
        mouseX,
        mouseY,
        0,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.7
      );

      gradient.addColorStop(
        0,
        "rgba(243, 235, 221, 0.08)"
      );

      gradient.addColorStop(
        0.5,
        "rgba(157, 185, 208, 0.05)"
      );

      gradient.addColorStop(
        1,
        "rgba(98, 136, 166, 0)"
      );

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      /*
       * Update particle positions.
       */
      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];

        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0) {
          particle.x = width;
        } else if (particle.x > width) {
          particle.x = 0;
        }

        if (particle.y < 0) {
          particle.y = height;
        } else if (particle.y > height) {
          particle.y = 0;
        }

        const pulse = Math.sin(time + i) * 0.08;

        particle.alpha = Math.max(
          0.05,
          Math.min(
            0.4,
            particle.baseAlpha + pulse
          )
        );
      }

      /*
       * Draw connecting lines first.
       *
       * Particle count is intentionally low, so this remains cheap.
       */
      if (!isMobile) {
        ctx.lineWidth = 0.6;

        for (let i = 0; i < particles.length; i++) {
          const particle = particles[i];

          for (let j = i + 1; j < particles.length; j++) {
            const other = particles[j];

            const dx = particle.x - other.x;
            const dy = particle.y - other.y;

            const distanceSquared =
              dx * dx + dy * dy;

            /*
             * Avoid Math.sqrt unless particles are
             * potentially close enough to connect.
             */
            if (distanceSquared < 14400) {
              const distance = Math.sqrt(distanceSquared);

              const alpha =
                (1 - distance / 120) * 0.06;

              ctx.strokeStyle = `rgba(11, 28, 45, ${alpha})`;

              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(other.x, other.y);
              ctx.stroke();
            }
          }
        }
      }

      /*
       * Draw particles.
       */
      ctx.fillStyle = "rgba(243, 235, 221, 0.25)";

      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];

        ctx.globalAlpha = particle.alpha;

        ctx.beginPath();

        ctx.arc(
          particle.x,
          particle.y,
          particle.radius,
          0,
          Math.PI * 2
        );

        ctx.fill();
      }

      ctx.globalAlpha = 1;

      animationFrameId = requestAnimationFrame(render);
    };

    if (reducedMotion) {
      /*
       * Static version for users who prefer reduced motion.
       */
      ctx.clearRect(0, 0, width, height);

      ctx.fillStyle =
        "rgba(157, 185, 208, 0.04)";

      ctx.fillRect(0, 0, width, height);
    } else {
      lastFrameTime = performance.now();
      animationFrameId = requestAnimationFrame(render);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);

      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      window.removeEventListener(
        "resize",
        handleResize
      );

      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none -z-10">
      <canvas
        ref={canvasRef}
        className="block w-full h-full opacity-70"
        aria-hidden="true"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#597E9C]/40" />
    </div>
  );
}