import React, { useState } from "react";
import FloatingNotes from "./FloatingNotes";
import { motion } from "framer-motion";
import TwinklingStars from "./TwinklingStars";

export default function SpotifyOAuthScreen({ onSpotifyLogin }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = () => {
    setIsSubmitting(true);
    onSpotifyLogin();
  };

  return (
    <div
      className="app-dark-ombre"
      style={{
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden"
      }}
    >
      <TwinklingStars />
      <FloatingNotes />

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

      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        style={{
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <h1
          style={{
            marginTop: '1px',
            fontFamily: "Oranienbaum, serif",
            color: "#F1F4FF",
            fontWeight: 400,
            fontSize: "4.7vw",
            letterSpacing: "0.11em",
            textShadow: "0 4.5px 36px #AFCBEB80, 0 1.5px 13px #B1C1F666",
            marginBottom: 8,
            textAlign: "center"
          }}
        >
          sign in to spotify
        </h1>

        <div
          style={{
            fontFamily: "Oranienbaum, serif",
            fontSize: "1.7vw",
            color: "#b8bac3",
            marginBottom: 22,
            textAlign: "center"
          }}
        >
          to save your playlist!
        </div>

        <motion.button
          onClick={handleLogin}
          disabled={isSubmitting}
          whileHover={{ scale: 1.05, boxShadow: "0 0 18px #1db95477" }}
          style={{
            fontFamily: "Oranienbaum, serif",
            fontSize: "2.2vw",
            padding: "22px 95px",
            borderRadius: "38px",
            background: isSubmitting ? "#4B5A56" : "#177242",
            color: "#fff",
            fontWeight: 500,
            border: "none",
            marginTop: 86,
            cursor: isSubmitting ? "not-allowed" : "pointer",
            outline: "none",
            letterSpacing: "0.07em",
            boxShadow: "0 2px 10px #0e5a3280"
          }}
        >
          {isSubmitting ? "redirecting..." : "sign in"}
        </motion.button>
      </motion.div>
    </div>
  );
}