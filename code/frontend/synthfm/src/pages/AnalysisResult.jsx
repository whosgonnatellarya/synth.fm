import React, { useEffect, useRef, useState } from "react";
import LoadingScreen from "../components/LoadingScreen";
import PlaylistResult from "../components/PlaylistResult";
import TwinklingStars from "../components/TwinklingStars";

export default function AnalysisResult() {
  const [loading, setLoading] = useState(true);
  const [playlist, setPlaylist] = useState(null);
  const [error, setError] = useState(null);
  const hasRequested = useRef(false);

  useEffect(() => {
    if (hasRequested.current) {
      return;
    }
    hasRequested.current = true;

    const spotifyCode = localStorage.getItem("spotifyCode") || "";
    const repo = localStorage.getItem("githubRepo");
    const preferredLanguages = localStorage.getItem("preferredLanguages") || "";
    const apiBaseFromEnv = (process.env.REACT_APP_API_BASE_URL || "").replace(/\/$/, "");
    const productionDefaultApi = "https://backend-coral-one-13.vercel.app";
    const fallbackApiBases = [
      productionDefaultApi,
      `http://${window.location.hostname || "localhost"}:8000`,
      "http://localhost:8000",
      "http://127.0.0.1:8000",
    ];
    const apiBases = apiBaseFromEnv ? [apiBaseFromEnv] : fallbackApiBases;

    if (!repo) {
      setError("Missing repository. Please start again.");
      setLoading(false);
      return;
    }

    const params = new URLSearchParams({ repo, languages: preferredLanguages });
    if (spotifyCode) {
      params.set("code", spotifyCode);
    }

    const fetchPlaylist = async () => {
      const uniqueApiBases = [...new Set(apiBases.filter(Boolean))];
      let lastError = null;

      const fetchWithTimeout = async (url, timeoutMs) => {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), timeoutMs);
        try {
          return await fetch(url, { signal: controller.signal });
        } finally {
          clearTimeout(timeout);
        }
      };

      for (const baseUrl of uniqueApiBases) {
        try {
          const res = await fetchWithTimeout(`${baseUrl}/analyze?${params.toString()}`, 180000);
          if (res.ok) {
            const data = await res.json();
            localStorage.setItem("lastAnalysis", JSON.stringify(data));
            setPlaylist(data);
            setLoading(false);
            return;
          }

          let detail = "Failed to generate playlist. Please try again.";
          try {
            const payload = await res.json();
            if (payload?.detail) {
              detail = payload.detail;
            }
          } catch {
            const text = await res.text();
            if (text) {
              detail = text;
            }
          }

          lastError = new Error(detail);
          break;
        } catch (err) {
          if (err?.name === "AbortError") {
            lastError = new Error("Request timed out while generating playlist. Please try again.");
          } else {
            lastError = err;
          }
        }
      }

      const message = lastError?.message || "Failed to generate playlist. Please try again.";
      if (lastError?.message === "Failed to fetch") {
        setError("Could not reach backend. Check REACT_APP_API_BASE_URL and make sure API is running.");
      } else {
        setError(message);
      }
      setLoading(false);
    };

    fetchPlaylist();
  }, []);

  if (loading) return <LoadingScreen />;
  if (error) {
    return (
      <div
        className="app-dark-ombre"
        style={{
          minHeight: "100vh",
          width: "100vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#F1F4FF",
          position: "relative",
          overflow: "hidden",
          textAlign: "center",
          padding: "2rem",
          fontFamily: "Oranienbaum, serif",
        }}
      >
        <TwinklingStars />
        <div style={{ maxWidth: "900px", zIndex: 2 }}>
          <div style={{ fontSize: "2.6rem", marginBottom: "1.2rem" }}>playlist generation failed</div>
          <div style={{ fontSize: "1.8rem", color: "#cdd6f7", marginBottom: "1.8rem", lineHeight: 1.5 }}>{error}</div>
          <button
            onClick={() => window.location.reload()}
            style={{
              fontFamily: "Oranienbaum, serif",
              fontSize: "1.6rem",
              padding: "14px 48px",
              borderRadius: "32px",
              border: "none",
              cursor: "pointer",
              background: "#414976",
              color: "#F1F4FF",
            }}
          >
            try again
          </button>
        </div>
      </div>
    );
  }

  return <PlaylistResult playlist={playlist} />;
}
