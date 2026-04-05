import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";

export default function SpotifyCallback() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const spotifyCode = params.get("code");

    if (!spotifyCode) {
      setError("Spotify sign-in failed. Please try again.");
      return;
    }

    localStorage.setItem("spotifyCode", spotifyCode);
    localStorage.removeItem("githubRepo");
    navigate("/repo", { replace: true });
  }, [navigate]);

  if (!error) return <LoadingScreen />;
  if (error) return <div>{error}</div>;
  return null;
}