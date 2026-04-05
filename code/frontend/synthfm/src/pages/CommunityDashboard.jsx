import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "./PlatformPages.css";

const API_BASE = (process.env.REACT_APP_API_BASE_URL || "https://backend-coral-one-13.vercel.app").replace(/\/$/, "");

const FALLBACK_STATS = {
  total_analyses: 128,
  unique_repositories: 73,
  top_repositories: [
    { label: "facebook/react", count: 9 },
    { label: "vercel/next.js", count: 8 },
    { label: "microsoft/vscode", count: 7 },
    { label: "pallets/flask", count: 6 },
  ],
  top_genres: [
    { label: "Indie Electronic", count: 26 },
    { label: "Lo-fi", count: 23 },
    { label: "Synthwave", count: 19 },
    { label: "Chill Pop", count: 15 },
  ],
  top_moods: [
    { label: "Focused", count: 42 },
    { label: "Creative", count: 31 },
    { label: "Uplifting", count: 24 },
    { label: "Calm", count: 17 },
  ],
  most_active_creators: [
    { label: "facebook", count: 14 },
    { label: "vercel", count: 12 },
    { label: "openai", count: 10 },
    { label: "microsoft", count: 9 },
  ],
};

const chartPalette = ["#8fc2ff", "#7ef0d2", "#ffc97d", "#9fc9a8", "#95aaff", "#9be5ff"];

export default function CommunityDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    let active = true;

    const loadStats = async () => {
      try {
        const response = await fetch(`${API_BASE}/api/stats`);
        if (!response.ok) {
          throw new Error("stats request failed");
        }
        const payload = await response.json();
        if (!active) {
          return;
        }
        const hasData = (payload?.total_analyses || 0) > 0;
        setStats(hasData ? payload : FALLBACK_STATS);
        setUsingFallback(!hasData);
      } catch {
        if (!active) {
          return;
        }
        setStats(FALLBACK_STATS);
        setUsingFallback(true);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadStats();
    return () => {
      active = false;
    };
  }, []);

  const trendData = useMemo(() => {
    const moods = stats?.top_moods || [];
    return moods.map((item, index) => ({
      week: `W${index + 1}`,
      intensity: item.count,
    }));
  }, [stats]);

  if (loading || !stats) {
    return (
      <div className="platform-shell">
        <div className="platform-container">
          <section className="platform-hero">
            <div className="platform-kicker">Loading analytics</div>
            <h1>Building your live community pulse...</h1>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="platform-shell">
      <div className="platform-container">
        <div className="platform-topbar">
          <Link className="platform-pill" to="/">Back to Home</Link>
          <Link className="platform-pill" to="/developers">Developers / Integrations</Link>
        </div>

        <section className="platform-hero">
          <div className="platform-kicker">Community Analytics</div>
          <h1>Live Leaderboard + Music Trend Map</h1>
          <p>
            Track usage, discover popular repositories, and watch which coding vibes dominate the platform.
          </p>
          {usingFallback && (
            <p className="platform-note">
              Showing curated sample metrics while live usage grows.
            </p>
          )}
        </section>

        <section className="platform-grid">
          <article className="platform-card platform-span-4">
            <h3>Total Analyses</h3>
            <p className="platform-metric">{stats.total_analyses}</p>
            <p className="platform-caption">Repository-to-playlist requests processed.</p>
          </article>

          <article className="platform-card platform-span-4">
            <h3>Unique Repos</h3>
            <p className="platform-metric">{stats.unique_repositories}</p>
            <p className="platform-caption">Distinct codebases explored by the community.</p>
          </article>

          <article className="platform-card platform-span-4">
            <h3>Top Creator</h3>
            <p className="platform-metric">{stats.most_active_creators?.[0]?.label || "-"}</p>
            <p className="platform-caption">Most frequently analyzed owner this cycle.</p>
          </article>

          <article className="platform-card platform-span-8">
            <h3>Top Repositories</h3>
            <div style={{ width: "100%", height: 280 }}>
              <ResponsiveContainer>
                <BarChart data={stats.top_repositories} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(138, 190, 226, 0.18)" />
                  <XAxis dataKey="label" tick={{ fill: "#d7edf8", fontSize: 11 }} />
                  <YAxis tick={{ fill: "#d7edf8", fontSize: 11 }} allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#8fc2ff" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </article>

          <article className="platform-card platform-span-4">
            <h3>Most Active Creators</h3>
            <ul className="platform-list">
              {(stats.most_active_creators || []).map((item) => (
                <li key={item.label}>
                  <span>{item.label}</span>
                  <span>{item.count}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="platform-card platform-span-6">
            <h3>Genre Distribution</h3>
            <div style={{ width: "100%", height: 280 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={stats.top_genres} dataKey="count" nameKey="label" cx="50%" cy="50%" outerRadius={95} label>
                    {(stats.top_genres || []).map((entry, index) => (
                      <Cell key={entry.label} fill={chartPalette[index % chartPalette.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </article>

          <article className="platform-card platform-span-6">
            <h3>Mood Intensity Trend</h3>
            <div style={{ width: "100%", height: 280 }}>
              <ResponsiveContainer>
                <AreaChart data={trendData} margin={{ top: 10, right: 12, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="moodWave" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#7ef0d2" stopOpacity={0.85} />
                      <stop offset="95%" stopColor="#7ef0d2" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="4 4" stroke="rgba(155, 213, 255, 0.2)" />
                  <XAxis dataKey="week" tick={{ fill: "#d7edf8" }} />
                  <YAxis tick={{ fill: "#d7edf8" }} allowDecimals={false} />
                  <Tooltip />
                  <Area type="monotone" dataKey="intensity" stroke="#7ef0d2" strokeWidth={2.5} fill="url(#moodWave)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </article>
        </section>
      </div>
    </div>
  );
}
