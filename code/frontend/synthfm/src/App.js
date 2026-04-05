
import React from "react";
import SplashScreen from "./components/SplashScreen";
import SpotifyOAuthScreen from "./components/SpotifyOAuthScreen";
import { Route, Routes, useNavigate } from "react-router-dom";
import SpotifyCallback from "./pages/SpotifyCallback";
import RepoInput from "./components/RepoInput";
import AnalysisResult from "./pages/AnalysisResult";
import SongRecommendations from "./pages/SongRecommendations";
import DevelopersIntegrations from "./pages/DevelopersIntegrations";
import CommunityDashboard from "./pages/CommunityDashboard";


function App() {
  const navigate = useNavigate();
  const defaultApiBase = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
    ? "http://127.0.0.1:8000"
    : "https://backend-coral-one-13.vercel.app";
  const apiBase = (process.env.REACT_APP_API_BASE_URL || defaultApiBase).replace(/\/$/, "");

  const handleSpotifyLogin = () => {
    const frontendOrigin = encodeURIComponent(window.location.origin);
    window.location.href = `${apiBase}/login?frontend_origin=${frontendOrigin}`;
  };

  const handleSplashNext = () => {
    navigate("/oauth");
  };

  const handleRepoSubmit = (repo, preferredLanguages) => {
    localStorage.setItem("githubRepo", repo);
    localStorage.setItem("preferredLanguages", preferredLanguages || "");
    navigate("/results");
  };

  return (
    <Routes>
      {/* SplashScreen is the landing page */}
      <Route path="/" element={<SplashScreen onNext={handleSplashNext} />} />
      {/* Spotify OAuth page */}
      <Route path="/oauth" element={<SpotifyOAuthScreen onSpotifyLogin={handleSpotifyLogin} />} />
      {/* Callback page captures Spotify code and routes to repo entry */}
      <Route path="/callback" element={<SpotifyCallback />} />
      {/* Repo entry step after Spotify auth */}
      <Route path="/repo" element={<RepoInput onSubmit={handleRepoSubmit} />} />
      {/* Final results screen */}
      <Route path="/results" element={<AnalysisResult />} />
      {/* Song recommendations screen */}
      <Route path="/songs" element={<SongRecommendations />} />
      {/* Public API documentation and integration page */}
      <Route path="/developers" element={<DevelopersIntegrations />} />
      {/* Community analytics and leaderboard */}
      <Route path="/stats" element={<CommunityDashboard />} />
    </Routes>
  );
}

export default App;