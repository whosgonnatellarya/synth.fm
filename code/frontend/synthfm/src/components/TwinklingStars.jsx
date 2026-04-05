import React from "react";

const stars = Array.from({ length: 42 }, (_, index) => {
  const left = (index * 37) % 100;
  const top = (index * 53) % 100;
  const size = 1 + (index % 3);
  const duration = 2.4 + (index % 6) * 0.55;
  const delay = (index % 7) * 0.45;
  const opacity = 0.25 + (index % 4) * 0.12;
  return { left, top, size, duration, delay, opacity };
});

export default function TwinklingStars() {
  return (
    <div className="twinkling-stars" aria-hidden="true">
      {stars.map((star, index) => (
        <span
          key={index}
          className="star"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDuration: `${star.duration}s`,
            animationDelay: `${star.delay}s`,
            opacity: star.opacity,
          }}
        />
      ))}
    </div>
  );
}
