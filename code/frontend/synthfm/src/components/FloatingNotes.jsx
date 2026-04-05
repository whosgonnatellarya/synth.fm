import React from "react";
import { motion } from "framer-motion";

const NOTE_COUNT = 18;
const NOTES = Array.from({ length: NOTE_COUNT }, (_, index) => {
  const lane = ((index + 0.5) / NOTE_COUNT) * 100;
  const jitter = (Math.random() - 0.5) * 4.8;
  return {
    left: Math.min(98, Math.max(2, lane + jitter)),
    symbol: ["♫", "♪", "♩"][Math.floor(Math.random() * 3)],
    delay: Math.random() * 2.4,
    scale: Math.random() * 0.45 + 0.75,
    opacity: Math.random() * 0.25 + 0.45,
    duration: 7.5 + Math.random() * 2.8,
    drift: (Math.random() - 0.5) * 36,
  };
});

export default function FloatingNotes() {
  return (
    <>
      {NOTES.map((note, index) => (
        <motion.span
          key={index}
          initial={{
            y: "112vh",
            x: 0,
            opacity: 0,
            scale: note.scale,
          }}
          animate={{
            y: ["112vh", "-18vh"],
            x: [0, note.drift, -note.drift * 0.6],
            opacity: [0, note.opacity, note.opacity * 0.65, 0],
            scale: [note.scale * 0.9, note.scale + 0.12, note.scale],
          }}
          transition={{
            delay: note.delay,
            duration: note.duration,
            repeat: Infinity,
            repeatType: "loop",
            repeatDelay: 0.15 + Math.random() * 0.6,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            left: `${note.left}%`,
            bottom: 0,
            color: "#F1F4FF",
            pointerEvents: "none",
            fontSize: `${58 * note.scale}px`,
            zIndex: 2,
            filter: "blur(1px) drop-shadow(0 0 22px #b9d6ff80) drop-shadow(0 0 22px #fff)",
            willChange: "transform, opacity",
          }}
        >
          {note.symbol}
        </motion.span>
      ))}
    </>
  );
}