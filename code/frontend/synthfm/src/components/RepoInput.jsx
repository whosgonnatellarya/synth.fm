// src/components/RepoInput.jsx
import React, { useState } from "react";
import FloatingNotes from "./FloatingNotes";
import { motion } from "framer-motion";
import TwinklingStars from "./TwinklingStars";

export default function RepoInput({ onSubmit }) {
  const [repo, setRepo] = useState("");
  const [languages, setLanguages] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedRepo = repo.trim();
    if (!trimmedRepo) {
      return;
    }
    onSubmit(trimmedRepo, languages.trim());
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
          fontSize: "1.4vw",
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

      <motion.form
        onSubmit={handleSubmit}
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
            marginTop: "1px",
            fontFamily: "Oranienbaum, serif",
            color: "#F1F4FF",
            fontWeight: 400,
            fontSize: "clamp(2.6rem, 3.4vw, 4.2rem)",
            letterSpacing: "0.11em",
            textShadow: "0 4.5px 36px #AFCBEB80, 0 1.5px 13px #B1C1F666",
            marginBottom: 22,
            textAlign: "center"
          }}
        >
          enter your github repo!
        </h1>

        <div
          style={{
            fontSize: "clamp(1rem, 1.2vw, 1.35rem)",
            color: "#b8bac3",
            marginBottom: 6,
            marginTop: -10,
            fontFamily: "Oranienbaum, serif",
            letterSpacing: "0.06em"
          }}
        >
          format: owner/repo
        </div>

        <input
          type="text"
          placeholder="github repo (owner/repo)"
          value={repo}
          onChange={(event) => setRepo(event.target.value)}
          required
          style={{
            width: "min(900px, 88vw)",
            borderRadius: "30px",
            border: "1px solid #3B446D",
            background: "#0F1326",
            color: "#F1F4FF",
            fontFamily: "Oranienbaum, serif",
            fontSize: "1.7rem",
            padding: "20px 28px",
            outline: "none",
            marginTop: "30px"
          }}
        />

        <input
          type="text"
          placeholder="preferred song languages (e.g. english, hindi, spanish)"
          value={languages}
          onChange={(event) => setLanguages(event.target.value)}
          style={{
            width: "min(900px, 88vw)",
            borderRadius: "30px",
            border: "1px solid #3B446D",
            background: "#0F1326",
            color: "#F1F4FF",
            fontFamily: "Oranienbaum, serif",
            fontSize: "1.7rem",
            padding: "20px 28px",
            outline: "none",
            marginTop: "14px"
          }}
        />

        <motion.button
          type="submit"
          disabled={!repo.trim()}
          whileHover={{ scale: 1.05, boxShadow: "0 0 18px #7d89ff99" }}
          style={{
            fontFamily: "Oranienbaum, serif",
            fontSize: "clamp(1.35rem, 1.5vw, 1.8rem)",
            padding: "12px 64px",
            borderRadius: "34px",
            background: repo.trim() ? "#414976" : "#4B5A56",
            color: "#fff",
            fontWeight: 500,
            border: "none",
            cursor: repo.trim() ? "pointer" : "not-allowed",
            outline: "none",
            letterSpacing: "0.08em",
            boxShadow: "0 8px 22px #2a304966",
            marginTop: 16
          }}
        >
          enter
        </motion.button>
      </motion.form>
    </div>
  );
}