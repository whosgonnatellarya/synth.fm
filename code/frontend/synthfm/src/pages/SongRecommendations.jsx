import React from "react";
import { useLocation } from "react-router-dom";
import TwinklingStars from "../components/TwinklingStars";

export default function SongRecommendations() {
  const location = useLocation();
  const fromState = location.state?.playlist || null;
  const fromStorage = (() => {
    try {
      const raw = localStorage.getItem("lastAnalysis");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  })();

  const data = fromState || fromStorage || {};
  const songs = Array.isArray(data.recommended_songs) ? data.recommended_songs : [];
  const spotifySearchUrl = `https://open.spotify.com/search/${encodeURIComponent(`${data.genres || ""} ${data.moods || ""} ${data.keywords || ""}`.trim())}`;

  return (
    <div
      className="app-dark-ombre"
      style={{
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
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
          width: "100vw",
        }}
      >
        with love, arya
      </div>

      <div
        style={{
          color: "#F1F4FF",
          borderRadius: 24,
          width: "min(860px, 90vw)",
          margin: "4.2rem auto 1.2rem",
          padding: "30px 30px",
          maxHeight: "74vh",
          overflowY: "auto",
          boxShadow: "0 8px 40px #0008, 0 1.5px 13px #B1C1F633",
          fontFamily: "Oranienbaum, serif",
          position: "relative",
          overflowX: "hidden",
          background: "linear-gradient(135deg, #181A2B 60%, #232B4B 100%)",
          zIndex: 2,
        }}
      >
        <h2 style={{ fontSize: "2.8rem", marginBottom: 14, letterSpacing: ".05em", lineHeight: 1.1 }}>
          your recommended tracks ♡
        </h2>

        {songs.length > 0 ? (
          <div style={{ display: "grid", gap: "10px", marginBottom: 18 }}>
            {songs.map((song, index) => (
              <div
                key={`${song.title}-${song.artist}-${index}`}
                style={{
                  background: "#232B4Bcc",
                  borderRadius: 14,
                  padding: "12px 14px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "10px",
                }}
              >
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: "1.25rem", color: "#F1F4FF", lineHeight: 1.25 }}>
                    {song.title} — {song.artist}
                  </div>
                  <div style={{ fontSize: "0.95rem", color: "#B9D6FF", marginTop: 4 }}>
                    {song.reason}
                  </div>
                </div>
                <a
                  href={song.spotify_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    whiteSpace: "nowrap",
                    background: "#1DB954",
                    color: "#fff",
                    textDecoration: "none",
                    borderRadius: "999px",
                    padding: "8px 14px",
                    fontSize: "0.9rem",
                    letterSpacing: ".03em",
                  }}
                >
                  open
                </a>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ fontSize: "1.6rem", color: "#cdd6f7", marginBottom: 30 }}>
            no recommendations found yet. go back and try another repository.
          </div>
        )}

        <a
          href={spotifySearchUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-block",
            marginTop: 4,
            padding: "14px 34px",
            background: "linear-gradient(90deg, #1DB954 60%, #1db9c3 100%)",
            color: "#fff",
            borderRadius: 32,
            fontWeight: 700,
            textDecoration: "none",
            fontSize: "1.3rem",
            boxShadow: "0 2px 18px #1db95477",
            letterSpacing: ".08em",
          }}
        >
          go to spotify!
        </a>
      </div>
    </div>
  );
}
