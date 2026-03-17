"use client";

import React, { useRef, useEffect, useState } from "react";

interface BentoCardProps {
  title: string;
  description: string;
  label: string;
}

interface ProjectBentoProps {
  items: BentoCardProps[];
}

// Throttle function to limit updates (improves performance)
function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): T {
  let inThrottle: boolean;
  return function (this: any, ...args: any[]) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  } as T;
}

const BentoCard = ({
  item,
  layoutClass,
  glowColorRgb,
}: {
  item: BentoCardProps;
  layoutClass: string;
  glowColorRgb: string; // e.g. "219, 39, 119" for pink-600
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      // Relative position inside the card (percentage)
      const relX = ((mouseX - rect.left) / rect.width) * 100;
      const relY = ((mouseY - rect.top) / rect.height) * 100;

      const x = Math.min(100, Math.max(0, relX));
      const y = Math.min(100, Math.max(0, relY));

      // Distance from mouse to card center
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distance = Math.hypot(mouseX - centerX, mouseY - centerY);

      // Intensity based on distance (adjust radius as needed)
      const radius = 300;
      const intensity = Math.max(0, 1 - distance / radius);

      card.style.setProperty("--glow-x", `${x}%`);
      card.style.setProperty("--glow-y", `${y}%`);
      card.style.setProperty("--glow-intensity", intensity.toString());
    };

    const throttledMove = throttle(handleMouseMove, 16);
    window.addEventListener("mousemove", throttledMove);
    return () => window.removeEventListener("mousemove", throttledMove);
  }, []);

  // Update the color variable when glowColorRgb changes
  useEffect(() => {
    if (cardRef.current) {
      cardRef.current.style.setProperty("--glow-color", glowColorRgb);
    }
  }, [glowColorRgb]);

  return (
    <div
      ref={cardRef}
      className={`group relative flex flex-col justify-between p-5 rounded-[24px] bg-card text-card-foreground border border-grey-100 overflow-hidden transition-all duration-500 ease-out hover:shadow-lg dark:hover:shadow-[0_8px_30px_rgba(132,0,255,0.2)] ${layoutClass}`}
      style={{
        "--glow-x": "50%",
        "--glow-y": "50%",
        "--glow-intensity": "0",
        "--glow-color": glowColorRgb,
      } as React.CSSProperties}
    >
      {/* Border glow layer (identical to MagicBento) */}
      <div
        className="absolute inset-0 rounded-[24px] pointer-events-none"
        style={{
          padding: "2px",
          background: `radial-gradient(300px circle at var(--glow-x) var(--glow-y), rgba(var(--glow-color), calc(var(--glow-intensity) * 0.8)) 0%, rgba(var(--glow-color), calc(var(--glow-intensity) * 0.4)) 30%, transparent 60%)`,
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          zIndex: 1,
        }}
      />

      {/* Inner content */}
      <div className="relative z-10 flex justify-between items-start">
        <span className="text-[10px] font-mono uppercase tracking-[0.2em] opacity-40 group-hover:opacity-100 transition-opacity">
          {item.label}
        </span>
      </div>

      <div className="relative z-10 flex flex-col mt-auto">
        <h3 className="font-medium text-base lg:text-lg m-0 mb-1 leading-tight opacity-60 group-hover:opacity-100 transition-opacity">
          {item.title}
        </h3>
        <p className="text-[13px] leading-relaxed opacity-50 group-hover:opacity-80 line-clamp-2 transition-opacity">
          {item.description}
        </p>
      </div>
    </div>
  );
};

export default function ProjectBento({ items }: ProjectBentoProps) {
  // Color switching state
  const [glowColorRgb, setGlowColorRgb] = useState("219, 39, 119"); // pink-600

  useEffect(() => {
    const interval = setInterval(() => {
      setGlowColorRgb((prev) =>
        prev === "219, 39, 119" ? "34, 211, 238" : "219, 39, 119"
      );
    }, 3000); // switch every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-full mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[minmax(120px,1fr)] lg:auto-rows-[160px]">
        {items.map((item, index) => {
          let layoutClass = "col-span-1 row-span-1";

          if (index === 2) {
            // Tall but narrow (1 column wide, 2 rows high)
            layoutClass =
              "sm:col-span-1 sm:row-span-2 lg:col-span-1 lg:row-span-2";
          } else if (index === 3) {
            // Fill remaining bottom space
            layoutClass =
              "sm:col-span-2 sm:row-span-1 lg:col-span-3 lg:row-span-1";
          }

          return (
            <BentoCard
              key={index}
              item={item}
              layoutClass={layoutClass}
              glowColorRgb={glowColorRgb}
            />
          );
        })}
      </div>
    </div>
  );
}