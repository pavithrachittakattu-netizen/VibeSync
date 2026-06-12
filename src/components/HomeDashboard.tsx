import React, { useState } from "react";
import { Sparkles, Play, Pause, Bell, Flame, Disc, Radio } from "lucide-react";
import { Track, Playlist } from "../types";

interface HomeDashboardProps {
  onNavigate: (view: string) => void;
  onPlayTrack: (track: Track, queue: Track[]) => void;
  currentTrack: Track | null;
  isPlaying: boolean;
  notificationCount: number;
}

export default function HomeDashboard({
  onNavigate,
  onPlayTrack,
  currentTrack,
  isPlaying,
  notificationCount,
}: HomeDashboardProps) {
  const [moodValue, setMoodValue] = useState<number>(45);
  const [syncing, setSyncing] = useState<boolean>(false);
  const [syncMessage, setSyncMessage] = useState<string>("Sync My Vibe");

  // Trending Playlists
  const trendingPlaylists = [
    {
      id: "trend-1",
      title: "Cyber Midnight",
      coverUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCzFByflelLw4j125DQOADWhqxQa9DR4zp-wuXI_SSnyi4eMBoWH6BxXNkYthqgj3ER8jWHGiNasimyKCwo53NfV_4Ve3uQ3iZIVTc1VforKt8IgqAZzQomnJ4nJSg1lHyhHAcdeoaaCz3W5OBq2rzTnNKrgqL7iwZHqwQdPLD5kMKkwI0JvwGFYO_ZVQTCPE1ChQK88yCDYqnERnLxl-8QdASLkxLFgY_RDEkAChSrqSYMz6vT9LBwAZLtwDvhWext-_iRilXc9R8K",
      tracks: [
        { id: "cm-1", title: "Cyber Midnight", artist: "VibeSync AI", duration: "03:20", coverUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBWZ0ypZ9T5YZBCQs5cgPICMj0m7rs7PD9JOzWzypKq3qcGxXUQNzgQTfl7moNnjdLWhytJ4nW0F0YasEC7hPOYObf7VxE-MzSGTSY4vgVnE1IpztmNrNssazh_8VZx-4gAu4_KuwlSqjdQZVtmjWJR0Cg1xGtA-_5_CNSLzDaXyliHPFZedlCLaSb5spP5j5dVtOu7mRoWpJdDE85pSJW9JUNm8EK1IzQIrIquzCHM5yk-gKeRO-8LxCPSYz5KIcGl2dnyhxaHvHbg", genre: "Synthwave" },
        { id: "cm-2", title: "Midnight Resonance", artist: "Cyberpunk Duo", duration: "03:40", coverUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBWZ0ypZ9T5YZBCQs5cgPICMj0m7rs7PD9JOzWzypKq3qcGxXUQNzgQTfl7moNnjdLWhytJ4nW0F0YasEC7hPOYObf7VxE-MzSGTSY4vgVnE1IpztmNrNssazh_8VZx-4gAu4_KuwlSqjdQZVtmjWJR0Cg1xGtA-_5_CNSLzDaXyliHPFZedlCLaSb5spP5j5dVtOu7mRoWpJdDE85pSJW9JUNm8EK1IzQIrIquzCHM5yk-gKeRO-8LxCPSYz5KIcGl2dnyhxaHvHbg", genre: "Synthwave" }
      ]
    },
    {
      id: "trend-2",
      title: "Neon Solitude",
      coverUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuA_6eTwOqtjMeasaePBc9kIC7Tf55RCEAq7HW31okgflnqbVh61saCimNprNpr0zGTxVVeldnxCbLzafqsx7BJxgX-_7dV23IUHgxNjPyd_bxAOZ7ebLX4kqDOGq693rTfbi1ASFE4QeImmgvNKk58eIoLjfiOFhosZ-cv6RtcfsnSTFFxpBH5iGGjem2WdmWn3AicNqMtJDT1o3FGgHSAWc2-HxKAr-H46HeTu5H7VrdT2A5c5V5mPimLREH62ZWO3m6eKftBdp_fr",
      tracks: [
        { id: "ns-1", title: "Neon Solitude", artist: "Synthetic Dreams", duration: "03:54", coverUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBWZ0ypZ9T5YZBCQs5cgPICMj0m7rs7PD9JOzWzypKq3qcGxXUQNzgQTfl7moNnjdLWhytJ4nW0F0YasEC7hPOYObf7VxE-MzSGTSY4vgVnE1IpztmNrNssazh_8VZx-4gAu4_KuwlSqjdQZVtmjWJR0Cg1xGtA-_5_CNSLzDaXyliHPFZedlCLaSb5spP5j5dVtOu7mRoWpJdDE85pSJW9JUNm8EK1IzQIrIquzCHM5yk-gKeRO-8LxCPSYz5KIcGl2dnyhxaHvHbg", genre: "Chillwave" }
      ]
    },
    {
      id: "trend-3",
      title: "Glass Beats",
      coverUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDF8MxbgbZDxZllK0QjtS_Xj4GqmBetQe016hk-NM6TbuYihlyUVPq_Y6ElMv7rSiUw7SiDuW2DOHJ1M9UWyb76AzaOit7oZuu4XcmjTIf5U91aq4zOjJt-nwQejXlTLSd41ncHhzjYxYZIGzmCi2qmjkRvII5w_XtGwMZ-cV0rdC4v1ZeLWk5yW50ZnAFgdoOrZnDS3etmWF6dXiMQNstcgdt9KMBE7oKxWVXJ9BVMHEpCrPfcKnxlNHCnIolIdyWOWfVe2pU3YqnZ",
      tracks: [
        { id: "gb-1", title: "Glass Beats", artist: "VibeSync AI", duration: "02:50", coverUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBWZ0ypZ9T5YZBCQs5cgPICMj0m7rs7PD9JOzWzypKq3qcGxXUQNzgQTfl7moNnjdLWhytJ4nW0F0YasEC7hPOYObf7VxE-MzSGTSY4vgVnE1IpztmNrNssazh_8VZx-4gAu4_KuwlSqjdQZVtmjWJR0Cg1xGtA-_5_CNSLzDaXyliHPFZedlCLaSb5spP5j5dVtOu7mRoWpJdDE85pSJW9JUNm8EK1IzQIrIquzCHM5yk-gKeRO-8LxCPSYz5KIcGl2dnyhxaHvHbg", genre: "Minimal" }
      ]
    }
  ];

  // Bento tracks (Recent Generations)
  const bentoTracks: Track[] = [
    {
      id: "recent-1",
      title: "Ambient Echoes",
      artist: "VibeSync AI",
      duration: "04:30",
      coverUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuB0B_OY_9tdrVzfccCugtMc7_CXOZy6I02IKOy1Qp3QBr6Bwcp8U68u1dPzQt20959h175qDxCRcBkcEAc0-ftqd-PDzhzkv5IoQamp9FxH4ifLiMTlrjAvBZPkqtI0mKg_XKJzasCM8RkCNOGH34jZO6zbYDSaaxuHsvd4btQJfYkKxVdsdi5aW5OyP5EphqoKIrV_fXyh_ARnH8d1_OBmydm3m3JI0QFYmdA6_4m4H2GVmlyXfL-WyJJZDi95qr2EvT2bCC_oofqY",
      genre: "Ambient Chill",
      bpm: 75
    },
    {
      id: "recent-2",
      title: "Lofi Drift",
      artist: "Lofi Beats",
      duration: "03:15",
      coverUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuB7jHujySEIouIw2ZTt8fWP-iPwvHhpFsIKHCJeQoQh9ZhnD4A0CutNdfART0jFC49t5duYGr_pIy2Tts9_8dgi49BpVxGg8d6QvZlvBlbd0-zqTWRnppGo9nP3Evh_IB2Z6aYEWV8rTBw301smQhpXevkhHR0rKLnd5Wp-5E7e4sp73Fk0CtsbEuDYwbZif3o1iBrXXDX_ew6JFu0i4-xffth2gLLosvIb89oCrb7bxViOPFYvjbjmqbF2x8FvU6xYHXxmY7NWtgj-",
      genre: "Lofi Hiphop",
      bpm: 82
    },
    {
      id: "recent-3",
      title: "Liquid Bass",
      artist: "Subsonic Wave",
      duration: "04:02",
      coverUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDEv3IFR2jlwQ_I0WPkyuEmFMeDLbMgn9TWLwfVcZJnAJqVMfRQk4JZYrwRC2RX-8Yq0xgdR8LzXFkXd1KYMA_Ss7g1nqmJEmwM65REoNYHMybSiS_wU12ONHV7X-ydZ5i9vvdXlGfTd7l__T4TwY8EpMgaYeKZyAFzH4zl1V8OTRb8lHz3HKDnnWg-rQd5GFLcLkiLM2wQ6mLR3SW6pf1_M0TjOR7OEknPhV6w6qETcnCXV9E0-hMSVP4QLDcqsTK59jLk2lS2LO4n",
      genre: "Liquid D&B",
      bpm: 172
    },
    {
      id: "recent-4",
      title: "Glitch Soul",
      artist: "Shattered Anthems",
      duration: "02:48",
      coverUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDEc1OXCM8ciqJr_h2PdDQnjhDALGmUtvMAVqr3u3eBlARLB4lW_zJsxTbj5tSUSwBJpu4LIQ9xHR9rFbQ_yL1hherqHMFE_xZqrsZUkd6nx5df4rd1Xi68NpVSzgVX1sdSbdQNkwON5lTY4giHEkTzvRHRYh-D1ilH-HHN_e2q9q_YeYmdWzgU7IMhh2O7K_C8I8hw2Z3emTefexzA1c_ylT3Te5lZlp7StKE_mI7zK-nDUikgp-sxdMedEV1MA8F5KtV_saxbWp-E",
      genre: "Glitch Hop",
      bpm: 110
    },
    {
      id: "recent-5",
      title: "Urban Pulse",
      artist: "Neon Architect",
      duration: "03:36",
      coverUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCOJUqAQKE9ILwMdp6sPozBOMTj9Nm-dnXvAaf4iL-KGhbx0TDE2MNHMPzvoP6ltWqWs2lNbcOSUV14ghqwTypQQ3wXiEhsfRCnVFHH7LK4peZQ8cy7cuxLJn8HrovHLOeD_P9IzgdJxbEbxPzr85qVucyzhMaFxzBFhy1BOkjdYFTwyEgK_EDIDjphlhy1GQxg_zdd0bN5T9rhffWZHjRPX2Psxvgitl7yWWcAYnAfT3to1Vw9aDPeZyaHLrF011IiUq6t0QCVVvfh",
      genre: "Electro House",
      bpm: 124
    }
  ];

  // Quick Vibe Synchronization simulation
  const handleVibeSync = () => {
    setSyncing(true);
    setSyncMessage("Syncing frequencies...");
    setTimeout(() => {
      setSyncMessage("Synced!");
      setTimeout(() => {
        // Automatically make a generated playlist based on mood value
        const moodType = moodValue < 30 ? "Chill Calm Vibes" : moodValue > 70 ? "High Energy Rave" : "Midtempo Focus House";
        const dummyTrack: Track = {
          id: `sym-mood-${Date.now()}`,
          title: `Mood Frequency ${moodValue}Hz`,
          artist: "VibeSync Pulsar",
          duration: "03:15",
          coverUrl: bentoTracks[0].coverUrl,
          genre: moodValue < 30 ? "Ambient" : moodValue > 70 ? "Acid Electro" : "Deep House",
          bpm: Math.round(70 + (moodValue * 1.5))
        };
        onPlayTrack(dummyTrack, [dummyTrack]);
        setSyncing(false);
        setSyncMessage("Sync My Vibe");
        onNavigate("now_playing");
      }, 1000);
    }, 1500);
  };

  const handlePlaylistClick = (playlist: typeof trendingPlaylists[0]) => {
    // Generate active queue from tracks
    const convertedTracks: Track[] = playlist.tracks.map(t => ({
      ...t,
      coverUrl: playlist.coverUrl
    }));
    if (convertedTracks.length > 0) {
      onPlayTrack(convertedTracks[0], convertedTracks);
    }
  };

  return (
    <div className="pb-32 px-5 space-y-8 max-w-screen-md mx-auto" id="home-dashboard">
      {/* Personalized Greeting */}
      <section className="pt-6">
        <div className="space-y-1">
          <h2 className="font-display font-bold text-3xl tracking-tight text-white">
            Evening, Alex.
          </h2>
          <p className="text-on-surface-variant font-medium text-sm md:text-base">
            Your current frequency is trending toward{" "}
            <span className="text-secondary font-semibold">
              {currentTrack?.genre || "Deep House"}
            </span>
            .
          </p>
        </div>
      </section>

      {/* Quick Generate Mood Slider */}
      <section className="glass-card p-6 neon-glow-purple border-t border-white/10">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-display text-lg font-bold text-primary flex items-center gap-2">
            <Radio className="w-5 h-5 text-secondary animate-pulse" />
            Quick Generate
          </h3>
          <Sparkles className="w-5 h-5 text-secondary" />
        </div>
        
        <div className="space-y-5">
          <div className="flex justify-between text-xs font-bold text-on-surface-variant uppercase tracking-wider">
            <span className={moodValue < 40 ? "text-primary drop-shadow-md" : ""}>Chill</span>
            <span className={moodValue >= 40 && moodValue <= 70 ? "text-secondary drop-shadow-md" : ""}>Balanced</span>
            <span className={moodValue > 70 ? "text-tertiary drop-shadow-md" : ""}>Electric</span>
          </div>

          <input
            className="w-full h-1.5 bg-neutral-800 rounded-full appearance-none cursor-pointer accent-primary slider-thumb"
            type="range"
            min="0"
            max="100"
            value={moodValue}
            onChange={(e) => setMoodValue(parseInt(e.target.value))}
          />

          <button
            onClick={handleVibeSync}
            disabled={syncing}
            className="w-full py-3.5 bg-gradient-to-r from-primary to-secondary text-on-primary font-display font-extrabold text-sm rounded-full shadow-[0_0_20px_rgba(221,183,255,0.3)] hover:shadow-[0_0_25px_rgba(221,183,255,0.45)] hover:scale-[1.02] active:scale-95 transition-all text-center tracking-wider uppercase cursor-pointer"
          >
            {syncMessage}
          </button>
        </div>
      </section>

      {/* Trending Vibes (Horizontal Scroll) */}
      <section className="space-y-4">
        <div className="flex justify-between items-end">
          <h3 className="font-display font-extrabold text-xl text-white">
            Trending Vibes
          </h3>
          <button
            onClick={() => onNavigate("library")}
            className="text-primary font-bold text-xs border-b border-primary/30 pb-0.5 hover:text-secondary transition-colors"
          >
            View All
          </button>
        </div>

        <div className="flex gap-5 overflow-x-auto hide-scrollbar -mx-5 px-5 py-2">
          {trendingPlaylists.map((pl) => (
            <div
              key={pl.id}
              onClick={() => handlePlaylistClick(pl)}
              className="min-w-[190px] w-[190px] cursor-pointer group select-none"
            >
              <div className="relative aspect-square rounded-2xl overflow-hidden mb-2 ring-1 ring-white/10 group-hover:ring-primary/50 transition-all shadow-md group-hover:shadow-[0_0_15px_rgba(100,50,250,0.3)]">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src={pl.coverUrl}
                  alt={pl.title}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex items-end p-4">
                  <span className="text-white font-display font-bold text-sm tracking-tight truncate w-full">
                    {pl.title}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Generations (Bento Grid Layout) */}
      <section className="space-y-4">
        <h3 className="font-display font-extrabold text-xl text-white">
          Recent Generations
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Main Large Card Ambient Echoes */}
          <div
            onClick={() => onPlayTrack(bentoTracks[0], bentoTracks)}
            className="col-span-2 row-span-2 glass-card p-4 flex flex-col justify-between group hover:border-primary/40 hover:scale-[1.01] transition-all duration-300 cursor-pointer shadow-lg"
          >
            <div className="aspect-video w-full rounded-xl overflow-hidden relative mb-4 shadow-sm">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                src={bentoTracks[0].coverUrl}
                alt="Ambient Echoes"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-14 h-14 rounded-full bg-primary/95 text-on-primary flex items-center justify-center shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  {currentTrack?.id === bentoTracks[0].id && isPlaying ? (
                    <Pause className="w-6 h-6 fill-current" />
                  ) : (
                    <Play className="w-6 h-6 fill-current translate-x-0.5" />
                  )}
                </div>
              </div>
            </div>
            
            <div className="space-y-1">
              <p className="font-display font-bold text-lg text-white group-hover:text-primary transition-colors">
                Ambient Echoes
              </p>
              <p className="text-on-surface-variant font-bold text-[11px] uppercase tracking-wider">
                42 Tracks • Created 2h ago
              </p>
            </div>
          </div>

          {/* Grid Cards 2-5 */}
          {bentoTracks.slice(1).map((track) => (
            <div
              key={track.id}
              onClick={() => onPlayTrack(track, bentoTracks)}
              className="glass-card p-3 group hover:border-primary/45 hover:scale-[1.02] transition-all duration-300 cursor-pointer relative flex flex-col justify-between shadow-md"
            >
              <div className="aspect-square w-full rounded-xl bg-neutral-900 mb-2 overflow-hidden relative">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src={track.coverUrl}
                  alt={track.title}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <div className="w-9 h-9 rounded-full bg-secondary text-black flex items-center justify-center shadow-md">
                    {currentTrack?.id === track.id && isPlaying ? (
                      <Pause className="w-4 h-4 fill-current" />
                    ) : (
                      <Play className="w-4 h-4 fill-current translate-x-0.5" />
                    )}
                  </div>
                </div>
              </div>
              <p className="font-display font-extrabold text-[13px] text-white tracking-tight truncate w-full mt-1">
                {track.title}
              </p>
              <p className="text-[10px] text-on-surface-variant uppercase font-bold tracking-wider truncate w-full">
                {track.genre}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
