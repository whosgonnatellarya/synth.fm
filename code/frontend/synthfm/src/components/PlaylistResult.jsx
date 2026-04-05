
import React from "react";
import { useNavigate } from "react-router-dom";
import TwinklingStars from "./TwinklingStars";


export default function PlaylistResult({ playlist }) {
  const navigate = useNavigate();

  const mock = {
    summary: "Synth.fm analyzed your repo and generated a custom playlist! This playlist is tailored to your code's vibe, using OpenAI to summarize your project and match it with the perfect genres and moods.",
    genres: "Synthwave, Indie, Chill",
    moods: "Energetic, Creative, Focused",
    keywords: "coding, synth, beats, focus, chill",
    playlist_url: "https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M",
    recommended_songs: [
      { title: "Midnight City", artist: "M83", reason: "genre match", spotify_url: "https://open.spotify.com/search/midnight%20city%20m83" }
    ]
  };
  const data = playlist || mock;
  const lower = (value) => (value || "").toLowerCase();
  const vibeLine = `this repo feels ${lower(data.moods)} with a ${lower(data.genres)} energy.`;
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
        overflow: "hidden"
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
          width: "100vw"
        }}
      >
        with love, arya
      </div>

      <div style={{
        color: "#F1F4FF",
        borderRadius: 24,
        width: "min(620px, 84vw)",
        margin: "2rem auto",
        padding: 30,
        boxShadow: "0 8px 40px #0008, 0 1.5px 13px #B1C1F633",
        fontFamily: 'Oranienbaum, serif',
        position: 'relative',
        overflow: 'hidden',
        background: "linear-gradient(135deg, #181A2B 60%, #232B4B 100%)"
      }}>
        <div style={{
          position: 'absolute',
          top: -60,
          right: -60,
          width: 180,
          height: 180,
          background: 'radial-gradient(circle, #1DB95444 0%, #232B4B00 80%)',
          zIndex: 0,
          filter: 'blur(8px)'
        }} />
        <h2 style={{fontSize: '3.2rem', marginBottom: 22, letterSpacing: '.05em', lineHeight: 1.1, zIndex: 2, position: 'relative'}}>your synth.fm playlist ♡</h2>
        <div style={{
          background: '#232B4Bcc',
          borderRadius: 16,
          padding: '1.2rem 1.4rem',
          marginBottom: 22,
          boxShadow: '0 2px 18px #1db95422',
          zIndex: 2,
          position: 'relative',
          fontFamily: 'Oranienbaum, serif',
        }}>
          <div style={{fontSize: '1.55rem', marginBottom: 12, fontWeight: 500, color: '#B9D6FF', letterSpacing: '.04em'}}>details:</div>
          <div style={{fontSize: '1.05rem', color: '#F1F4FF', marginBottom: 8, lineHeight: 1.5}}>{vibeLine}</div>
          <div style={{fontSize: '1.05rem', color: '#F1F4FF', marginBottom: 12, lineHeight: 1.5}}>{lower(data.summary)}</div>
          <div style={{marginTop: 10, fontSize: '1.25rem', lineHeight: 1.55}}>
            <b>genres:</b> <span style={{color:'#1DB954'}}>{lower(data.genres)}</span><br/>
            <b>moods:</b> <span style={{color:'#B9D6FF'}}>{lower(data.moods)}</span><br/>
            <b>keywords:</b> <span style={{color:'#F1F4FF'}}>{lower(data.keywords)}</span>
          </div>
        </div>

        {Array.isArray(data.recommended_songs) && data.recommended_songs.length > 0 ? (
          <button
            onClick={() => navigate("/songs", { state: { playlist: data } })}
            style={{
            display: 'inline-block',
            marginTop: 8,
            padding: '14px 34px',
            background: 'linear-gradient(90deg, #1DB954 60%, #1db9c3 100%)',
            color: '#fff',
            borderRadius: 32,
            fontWeight: 700,
            fontFamily: 'Oranienbaum, serif',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1.35rem',
            boxShadow: '0 2px 18px #1db95477',
            letterSpacing: '.08em',
            transition: 'background 0.2s',
          }}
          >
            see now! 🎧
          </button>
        ) : (
          <div style={{
            display: 'inline-block',
            marginTop: 8,
            padding: '14px 34px',
            background: '#3b4460',
            color: '#d7dff8',
            borderRadius: 32,
            fontSize: '1.2rem',
            letterSpacing: '.05em',
          }}>
            songs coming soon
          </div>
        )}
      </div>
    </div>
  );
}
