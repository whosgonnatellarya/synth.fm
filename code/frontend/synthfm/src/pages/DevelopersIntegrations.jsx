import React from "react";
import { Link } from "react-router-dom";
import "./PlatformPages.css";

const apiBase = (process.env.REACT_APP_API_BASE_URL || "https://backend-coral-one-13.vercel.app").replace(/\/$/, "");

export default function DevelopersIntegrations() {
  return (
    <div className="platform-shell">
      <div className="platform-container">
        <div className="platform-topbar">
          <Link className="platform-pill" to="/">Back to Home</Link>
          <Link className="platform-pill" to="/stats">Open Community Stats</Link>
        </div>

        <section className="platform-hero">
          <div className="platform-kicker">Platform API</div>
          <h1>synth.fm for Developers</h1>
          <p>
            Integrate repo-to-playlist intelligence directly in your own apps.
            The public endpoint accepts a repository URL and returns summary, vibe tags,
            and a curated recommendation set.
          </p>
        </section>

        <section className="platform-grid">
          <article className="platform-card platform-span-6">
            <h3>Endpoint</h3>
            <p className="platform-caption">POST /api/playlist</p>
            <div className="platform-code">{`${apiBase}/api/playlist`}</div>
            <div className="platform-link-row">
              <a className="platform-cta" href={`${apiBase}/docs`} target="_blank" rel="noreferrer">
                Open Swagger UI
              </a>
              <a className="platform-cta" href={`${apiBase}/openapi.json`} target="_blank" rel="noreferrer">
                View OpenAPI JSON
              </a>
            </div>
          </article>

          <article className="platform-card platform-span-6">
            <h3>Request JSON</h3>
            <pre className="platform-code">{`{
  "repo_url": "https://github.com/vercel/next.js",
  "languages": ["english", "instrumental"]
}`}</pre>
            <p className="platform-caption">languages is optional and helps bias recommendations.</p>
          </article>

          <article className="platform-card platform-span-12">
            <h3>Example Response Shape</h3>
            <pre className="platform-code">{`{
  "repo_url": "https://github.com/vercel/next.js",
  "summary": "...",
  "genres": "Indie Electronic, Lo-fi",
  "moods": "Focused, Uplifting",
  "keywords": "next.js, ui, javascript",
  "playlist_url": "",
  "recommended_songs": [
    {
      "title": "Midnight City",
      "artist": "M83",
      "reason": "genre match, mood match",
      "spotify_url": "https://open.spotify.com/search/..."
    }
  ]
}`}</pre>
          </article>

          <article className="platform-card platform-span-6">
            <h3>cURL Quickstart</h3>
            <pre className="platform-code">{`curl -X POST "${apiBase}/api/playlist" \\
  -H "Content-Type: application/json" \\
  -d '{
    "repo_url": "https://github.com/facebook/react",
    "languages": ["english"]
  }'`}</pre>
          </article>

          <article className="platform-card platform-span-6">
            <h3>What You Get</h3>
            <ul className="platform-list">
              <li><span>Repository narrative summary</span><span className="platform-chip">AI-ready</span></li>
              <li><span>Genre + mood inference</span><span className="platform-chip">Music profile</span></li>
              <li><span>Track recommendations with reasons</span><span className="platform-chip">Explainable</span></li>
              <li><span>OpenAPI schema + Swagger docs</span><span className="platform-chip">Production</span></li>
            </ul>
          </article>
        </section>
      </div>
    </div>
  );
}
