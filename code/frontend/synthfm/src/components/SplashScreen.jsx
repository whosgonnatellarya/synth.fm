import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import MusicStaff from "./MusicStaff";
import TwinklingStars from "./TwinklingStars";

export default function SplashScreen({ onNext }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.1, ease: "easeOut" }}
      style={{
        minHeight: "100vh",
        color: "#D7DBE1",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        position: "relative",
        overflow: "hidden",
      }}
      className="app-dark-ombre"
    >
      <TwinklingStars />

      <div
        style={{
          position: "absolute",
          right: "24px",
          top: "22px",
          zIndex: 12,
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
          justifyContent: "flex-end",
          maxWidth: "90vw",
        }}
      >
        <Link
          to="/developers"
          style={{
            textDecoration: "none",
            fontFamily: "Oranienbaum, serif",
            color: "#dbe6ff",
            border: "1px solid #4c5c92",
            padding: "8px 16px",
            borderRadius: "999px",
            fontSize: "0.95rem",
            background: "rgba(26, 34, 66, 0.65)",
            backdropFilter: "blur(4px)",
            letterSpacing: "0.04em",
          }}
        >
          Developers / Integrations
        </Link>
        <Link
          to="/stats"
          style={{
            textDecoration: "none",
            fontFamily: "Oranienbaum, serif",
            color: "#f5f8ff",
            border: "1px solid #6f85cf",
            padding: "8px 16px",
            borderRadius: "999px",
            fontSize: "0.95rem",
            background: "rgba(56, 74, 130, 0.7)",
            letterSpacing: "0.04em",
          }}
        >
          Community Stats
        </Link>
      </div>
     
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
          textShadow: "none",
          opacity: 0.95,
          zIndex: 10,
          userSelect: "none",
          width: "100vw"
        }}
      >
        with love, arya
      </div>

      {/* All other content, moved UP with less marginTop! */}
      <div
        style={{
          width: "100%",
          marginTop: "8vh", // pulled everything higher! (adjust 8-12vh as you prefer)
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <MusicStaff />
        <div style={{ height: "5vw" }} /> {/* fine-tune vertical space here */}
        <motion.h1
          style={{
            fontFamily: "Oranienbaum, serif",
            fontWeight: 400,
            fontSize: "6vw",
            letterSpacing: "0.11em",
            margin: "0 0 24px 0",
            color: "#F1F4FF",
            textShadow: `
              0 4.5px 36px #AFCBEB80,
              0 1.5px 13px #B1C1F666,
              0 0.5px 6px #C4D5FF44
            `,
            opacity: 0.97,
            textAlign: "center"
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 1.2 }}
        >
          synth.fm
        </motion.h1>
        <motion.button
          initial={{ opacity: 0, y: 5, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: [0.98, 1.01, 1] }}
          transition={{ delay: 3.2, duration: 0.6 }}
          onClick={onNext}
          style={{
            fontFamily: "Oranienbaum, serif", 
            fontSize: "1.7vw",
            padding: "12px 70px",
            borderRadius: "32px",
            background: "#414976",
            color: "#F1F4FF",
            fontWeight: 400,
            border: "none",
            boxShadow: "0 2px 10px #2a304966",
            marginTop: 8,
            marginLeft: "4px",
            cursor: "pointer",
            outline: "none",
            letterSpacing: "0.07em"
          }}
        >
          ready? let's jam!
        </motion.button>
      </div>
    </motion.div>
  );
}