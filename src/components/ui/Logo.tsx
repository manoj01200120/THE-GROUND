import React from "react";

interface LogoProps {
  className?: string;
  iconSize?: number;
  showText?: boolean;
  showTagline?: boolean;
  lightText?: boolean;
}

export default function Logo({
  className = "",
  iconSize = 44,
  showText = true,
  showTagline = false,
  lightText = false,
}: LogoProps) {
  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Official THE GROUND "G" Geometric Vector Mark */}
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
        aria-label="THE GROUND Logo"
      >
        <defs>
          {/* Inner circle mask for landscape */}
          <clipPath id="groundCircleClip">
            <circle cx="100" cy="100" r="82" />
          </clipPath>

          {/* Sky gradient */}
          <linearGradient id="skyGrad" x1="100" y1="18" x2="100" y2="120" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#9DB9D0" />
            <stop offset="100%" stopColor="#668BAA" />
          </linearGradient>

          {/* Ridge 1 highlight */}
          <linearGradient id="ridge1Grad" x1="60" y1="80" x2="140" y2="150" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#BACFE0" />
            <stop offset="100%" stopColor="#87A9C4" />
          </linearGradient>
        </defs>

        {/* Clip content to inner circle */}
        <g clipPath="url(#groundCircleClip)">
          {/* Sky background */}
          <rect x="0" y="0" width="200" height="200" fill="url(#skyGrad)" />

          {/* Cream Sun / Moon */}
          <circle cx="124" cy="74" r="16.5" fill="#F3EBDD" />

          {/* Layer 1: Distant Misty Ridge */}
          <path
            d="M 18 100 Q 60 74, 98 90 T 182 104 L 182 190 L 18 190 Z"
            fill="url(#ridge1Grad)"
          />

          {/* Layer 2: Mid-range Blue Hill */}
          <path
            d="M 18 116 Q 55 96, 92 116 Q 132 136, 182 108 L 182 190 L 18 190 Z"
            fill="#668BAA"
          />

          {/* Layer 3: Dark Blue Landscape Wave */}
          <path
            d="M 18 132 Q 58 114, 102 138 Q 146 156, 182 134 L 182 190 L 18 190 Z"
            fill="#315574"
          />

          {/* Layer 4: Deep Navy Foreground Valley */}
          <path
            d="M 18 148 Q 72 130, 118 156 Q 148 168, 182 150 L 182 190 L 18 190 Z"
            fill="#19334B"
          />
        </g>

        {/* Outer Stylized "G" Contour */}
        {/* Arc starts at top right (~50 deg), sweeps clockwise to 3 o'clock, then horizontal crossbar */}
        <path
          d="M 142 56 
             A 82 82 0 1 0 148 126 
             H 116"
          stroke="#0B1C2D"
          strokeWidth="11"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Crisp horizontal crossbar cap of the G */}
        <path
          d="M 148 126 H 118"
          stroke="#0B1C2D"
          strokeWidth="11"
          strokeLinecap="square"
        />
      </svg>

      {/* Typography: THE GROUND + Tagline */}
      {showText && (
        <div className="flex flex-col">
          <span
            className={`font-sans font-medium text-[15px] uppercase tracking-[0.28em] leading-tight ${
              lightText ? "text-[#F3EBDD]" : "text-[#0B1C2D]"
            }`}
          >
            THE GROUND
          </span>
          {showTagline && (
            <span
              className={`font-sans font-light text-[11px] tracking-[0.28em] mt-0.5 ${
                lightText ? "text-[#F3EBDD]/80" : "text-[#071521]/80"
              }`}
            >
              Where ideas take shape.
            </span>
          )}
        </div>
      )}
    </div>
  );
}
