
import React from "react";
import { motion } from "framer-motion";
import "./LoadingScreen.css";
import TwinklingStars from "./TwinklingStars";

const notes = ["🎵", "🎹", "🎶", "🔎", "💻"];

export default function LoadingScreen() {
  return (
    <div className="loading-screen app-dark-ombre">
      <TwinklingStars />
      <div
        style={{
          position: "absolute",
          top: "4.5vh",
          left: "50%",
          transform: "translateX(-50%)",
          color: "#b8bac3",
          fontSize: "2vw",
          letterSpacing: "0.13em",
          fontFamily: "Oranienbaum, serif",
          fontWeight: 400,
          textAlign: "center",
          opacity: 0.95,
          zIndex: 10,
          userSelect: "none",
          width: "100vw"
        }}
      >
        with love, arya
      </div>

      <div>
        {notes.map((note, i) => (
          <motion.span
            key={i}
            initial={{ y: 0, opacity: 0.5 }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              repeat: Infinity,
              duration: 1 + Math.random(),
              delay: i * 0.3,
            }}
            style={{ fontSize: "2.5rem", margin: "0 0.5rem" }}
          >
            {note}
          </motion.span>
        ))}
      </div>
      <div style={{ marginTop: "2rem", fontSize: "2.3rem", textAlign: "center" }}>
        sit tight! synth.fm is generating your playlist ;)
      </div>
    </div>
  );
}