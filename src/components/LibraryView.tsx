import React, { useState } from "react";
import { Search, Radio, Disc, Calendar, ArrowRight, Music, Heart, LayoutGrid, List } from "lucide-react";
import { Track, Playlist, VibeHistoryItem } from "../types";

interface LibraryViewProps {
  onPlayTrack: (track: Track, queue: Track[]) => void;
  vibeHistory: VibeHistoryItem[];
}

export default function LibraryView({ onPlayTrack, vibeHistory }: LibraryViewProps) {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [layoutStyle, setLayoutGrid] = useState<boolean>(true); // Grid vs list view toggle

  // Visual custom saved playlists
  const savedPlaylists = [
    {
      id: "lib-1",
      title: "Neon Pulse",
      trackCount: 24,
      desc: "Cyberpunk & synthwave soundtrack",
      coverUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCzFByflelLw4j125DQOADWhqxQa9DR4zp-wuXI_SSnyi4eMBoWH6BxXNkYthqgj3ER8jWHGiNasimyKCwo53NfV_4Ve3uQ3iZIVTc1VforKt8IgqAZzQomnJ4nJSg1lHyhHAcdeoaaCz3W5OBq2rzTnNKrgqL7iwZHqwQdPLD5kMKkwI0JvwGFYO_ZVQTCPE1ChQK88yCDYqnERnLxl-8QdASLkxLFgY_RDEkAChSrqSYMz6vT9LBwAZLtwDvhWext-_iRilXc9R8K",
      tracks: [
        { id: "np-1", title: "Neon Pulse Mainline", artist: "VibeSync AI", duration: "03:45", genre: "Synthwave" },
        { id: "np-2", title: "Midnight Pulse", artist: "The Glitch Mob", duration: "04:12", genre: "Synthwave" }
      ]
    },
    {
      id: "lib-2",
      title: "Deep Flow",
      trackCount: 18,
      desc: "Warm late night organic deep house",
      coverUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuA_6eTwOqtjMeasaePBc9kIC7Tf55RCEAq7HW31okgflnqbVh61saCimNprNpr0zGTxVVeldnxCbLzafqsx7BJxgX-_7dV23IUHgxNjPyd_bxAOZ7ebLX4kqDOGq693rTfbi1ASFE4QeImmgvNKk58eIoLjfiOFhosZ-cv6RtcfsnSTFFxpBH5iGGjem2WdmWn3AicNqMtJDT1o3FGgHSAWc2-HxKAr-H46HeTu5H7VrdT2A5c5V5mPimLREH62ZWO3m6eKftBdp_fr",
      tracks: [
        { id: "df-1", title: "Obsidian Flow", artist: "Lorn", duration: "03:45", genre: "Deep House" },
        { id: "df-2", title: "Deep Ambient Waves", artist: "Liquid Dreams", duration: "04:40", genre: "Ambient" }
      ]
    },
    {
      id: "lib-3",
      title: "Obsidian Beats",
      trackCount: 42,
      desc: "Rhythmic basslines and driving synths",
      coverUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDF8MxbgbZDxZllK0QjtS_Xj4GqmBetQe016hk-NM6TbuYihlyUVPq_Y6ElMv7rSiUw7SiDuW2DOHJ1M9UWyb76AzaOit7oZuu4XcmjTIf5U91aq4zOjJt-nwQejXlTLSd41ncHhzjYxYZIGzmCi2qmjkRvII5w_XtGwMZ-cV0rdC4v1ZeLWk5yW50ZnAFgdoOrZnDS3etmWF6dXiMQNstcgdt9KMBE7oKxWVXJ9BVMHEpCrPfcKnxlNHCnIolIdyWOWfVe2pU3YqnZ",
      tracks: [
        { id: "ob-1", title: "Obsidian Beats", artist: "Shattered Anthems", duration: "03:10", genre: "Techno" }
      ]
    },
    {
      id: "lib-4",
      title: "Vapor Clouds",
      trackCount: 12,
      desc: "Glitchy vocals under soft melodies",
      coverUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuB0B_OY_9tdrVzfccCugtMc7_CXOZy6I02IKOy1Qp3QBr6Bwcp8U68u1dPzQt20959h175qDxCRcBkcEAc0-ftqd-PDzhzkv5IoQamp9FxH4ifLiMTlrjAvBZPkqtI0mKg_XKJzasCM8RkCNOGH34jZO6zbYDSaaxuHsvd4btQJfYkKxVdsdi5aW5OyP5EphqoKIrV_fXyh_ARnH8d1_OBmydm3m3JI0QFYmdA6_4m4H2GVmlyXfL-WyJJZDi95qr2EvT2bCC_oofqY",
      tracks: [
        { id: "vc-1", title: "Vapor Clouds Intro", artist: "Vaporized Synth", duration: "04:05", genre: "Glitch wave" }
      ]
    }
  ];

  const handlePlaylistClick = (pl: typeof savedPlaylists[0] | VibeHistoryItem) => {
    const finalTracks = pl.tracks.map(t => ({
      ...t,
      coverUrl: pl.coverUrl
    }));
    if (finalTracks.length > 0) {
      onPlayTrack(finalTracks[0], finalTracks);
    }
  };

  const filteredPlaylists = savedPlaylists.filter(pl =>
    pl.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pb-32 px-5 space-y-7 max-w-screen-md mx-auto" id="library-view-screen">
      {/* Search Input bar */}
      <section className="relative">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-on-surface-variant">
          <Search className="w-5 h-5 text-[#988d9f]" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search your library..."
          className="w-full pl-12 pr-4 py-3 bg-neutral-900 border border-white/5 rounded-full text-white text-sm placeholder-on-surface-variant/50 focus:border-primary/50 focus:outline-none transition-all"
        />
      </section>

      {/* Top Genres blocks */}
      <section className="space-y-3">
        <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-[#cfc2d6]">
          <span>Top Genres</span>
          <span className="text-secondary select-none">View All</span>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="glass-card p-5 flex flex-col justify-center items-center text-center space-y-2 border-l-4 border-[#ddb7ff] group cursor-pointer hover:bg-white/5 transition-all">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-1">
              <Radio className="w-6 h-6 animate-pulse" />
            </div>
            <span className="font-display font-bold text-white text-sm group-hover:text-primary transition-colors">
              Synthwave
            </span>
            <span className="text-[10px] uppercase font-bold text-on-surface-variant">
              Active Vibe
            </span>
          </div>

          <div className="glass-card p-5 flex flex-col justify-center items-center text-center space-y-2 border-l-4 border-[#4cd7f6] group cursor-pointer hover:bg-white/5 transition-all">
            <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary mb-1">
              <Disc className="w-6 h-6 animate-spin-slow" />
            </div>
            <span className="font-display font-bold text-white text-sm group-hover:text-secondary transition-colors">
              Deep House
            </span>
            <span className="text-[10px] uppercase font-bold text-on-surface-variant">
              Trending Frequency
            </span>
          </div>
        </div>
      </section>

      {/* Playlists layout Section */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-display font-extrabold text-white text-lg">
            Saved Playlists
          </h3>
          <div className="flex gap-2 text-on-surface-variant">
            <button
              onClick={() => setLayoutGrid(true)}
              className={`p-1.5 rounded-lg cursor-pointer ${layoutStyle ? "bg-[#1c1b1b] text-primary" : "hover:text-white"}`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setLayoutGrid(false)}
              className={`p-1.5 rounded-lg cursor-pointer ${!layoutStyle ? "bg-[#1c1b1b] text-primary" : "hover:text-white"}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {layoutStyle ? (
          <div className="grid grid-cols-2 gap-4">
            {filteredPlaylists.map((pl) => (
              <div
                key={pl.id}
                onClick={() => handlePlaylistClick(pl)}
                className="glass-card p-3 flex flex-col space-y-3 hover:border-primary/40 transition-all cursor-pointer group"
              >
                <div className="aspect-square w-full rounded-2xl overflow-hidden relative shadow-md">
                  <img
                    src={pl.coverUrl}
                    alt={pl.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-[9px] font-bold text-white">
                    {pl.trackCount} Tracks
                  </div>
                </div>
                <div>
                  <h4 className="font-display font-extrabold text-sm text-white truncate w-full group-hover:text-primary transition-colors">
                    {pl.title}
                  </h4>
                  <p className="text-[10px] text-on-surface-variant truncate w-full mt-0.5">
                    {pl.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredPlaylists.map((pl) => (
              <div
                key={pl.id}
                onClick={() => handlePlaylistClick(pl)}
                className="glass-card p-3 flex items-center justify-between hover:border-secondary/40 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0">
                    <img
                      src={pl.coverUrl}
                      alt={pl.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-display font-bold text-sm text-white truncate w-full group-hover:text-secondary transition-colors">
                      {pl.title}
                    </h4>
                    <p className="text-[10px] text-[#988d9f] font-bold uppercase tracking-wider">
                      {pl.trackCount} Tracks • {pl.desc.slice(0, 20)}...
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Mood History chronological vertical timeline */}
      <section className="space-y-4">
        <div className="flex justify-between items-center pb-1 border-b border-white/5">
          <h3 className="font-display font-extrabold text-white text-lg">
            Mood History
          </h3>
          <Calendar className="w-4 h-4 text-primary" />
        </div>

        {vibeHistory.length === 0 ? (
          <p className="text-sm text-on-surface-variant text-center py-4">
            No dynamic vibe synchronizations created yet. Use the "Generate" page to compose some magic.
          </p>
        ) : (
          <div className="relative pl-6 space-y-6 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-gradient-to-b before:from-primary before:via-secondary before:to-transparent">
            {vibeHistory.map((item) => (
              <div
                key={item.id}
                onClick={() => handlePlaylistClick(item)}
                className="relative cursor-pointer group select-none"
              >
                {/* Visual timeline bullet */}
                <div className="absolute -left-[20px] top-1.5 w-3.5 h-3.5 rounded-full bg-black border-2 border-primary group-hover:bg-[#ddb7ff] group-hover:border-white shadow-[0_0_10px_rgba(221,183,255,0.7)] z-10 transition-colors" />
                
                <div className="glass-card p-4 hover:border-primary/30 transition-all flex justify-between items-center gap-3">
                  <div className="min-w-0 space-y-1">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#cfc2d6]">
                      {item.time}
                    </p>
                    <h4 className="font-display font-extrabold text-sm text-white truncate w-full group-hover:text-primary transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-xs text-on-surface-variant truncate w-full">
                      Prompt: "{item.vibePrompt}"
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0">
                    <img
                      src={item.coverUrl}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
