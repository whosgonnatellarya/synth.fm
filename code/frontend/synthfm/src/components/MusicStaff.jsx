import React from "react";
import { motion } from "framer-motion";

// Large and high staff, perfect proportions
const WIDTH = 1800;
const HEIGHT = 440;
const LINES = 5;
const DISTANCE = 70;
const START_Y = 130; // This brings staff up!
const STAFF_Y = Array.from({length: LINES}, (_, i) => START_Y + i * DISTANCE);

function sCurve(y) {
  return `M-180 ${y} 
    C ${WIDTH*0.15} ${y-60}, ${WIDTH*0.45} ${y+80}, ${WIDTH*0.73} ${y+10} 
    S ${WIDTH+110} ${y+60}, ${WIDTH+50} ${y+16}`;
}

// Notes shimmer together, 3rd & 4th are lower
const NOTES = [
  { x: WIDTH*0.06,  y: STAFF_Y[0], symbol: "♫" },
  { x: WIDTH*0.23,  y: STAFF_Y[1], symbol: "♪" },
  { x: WIDTH*0.41,  y: STAFF_Y[2] + 27, symbol: "♩" },
  { x: WIDTH*0.61,  y: STAFF_Y[3] + 30, symbol: "♫" },
  { x: WIDTH*0.78,  y: STAFF_Y[4], symbol: "♪" }
];

export default function MusicStaff() {
  return (
    <svg
      width="100vw"
      height={HEIGHT}
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      style={{
        display: "block",
        maxWidth: "100vw",
        minWidth: 320,
        marginLeft: 0,
        paddingLeft: 0,
        overflow: "visible",
      }}
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="fadeout" x1={WIDTH*0.65} y1="0" x2={WIDTH+200} y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#D7DBE1" stopOpacity="1"/>
          <stop offset="100%" stopColor="#D7DBE1" stopOpacity="0"/>
        </linearGradient>
      </defs>
      {STAFF_Y.map((y, i) => (
        <motion.path
          key={i}
          d={sCurve(y)}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{
            delay: 0.7 + i*0.4,
            duration: 1.9,
            ease: "easeOut"
          }}
          stroke="url(#fadeout)"
          strokeWidth={7}
          strokeLinecap="round"
          fill="none"
          style={{
            filter: "blur(0.44px)",
            opacity: 0.87 - 0.03 * i
          }}
        />
      ))}
      {NOTES.map((note, i) => (
        <motion.text
          key={i}
          x={note.x}
          y={note.y+8}
          fontFamily="inherit"
          fontSize={58}
          fill="#F1F4FF"
          style={{
            filter: `drop-shadow(0 0 8px #d7dbe1ee) drop-shadow(0 0 26px #B9D6FF88) drop-shadow(0 0 18px #fff)`,
            textShadow:
              "0 0 26px #B9D6FF99, 0 2px 14px #fff, 0 0 28px #fff"
          }}
          initial={{ opacity: 0.72 }}
          animate={{
            opacity: [0.68, 1, 0.64, 1, 0.68]
          }}
          transition={{
            repeat: Infinity,
            duration: 2.6,
            ease: "easeInOut"
          }}
        >
          {note.symbol}
        </motion.text>
      ))}
    </svg>
  );
}