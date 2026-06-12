import React, { useState } from "react";
import { ArrowLeft, Radio, Music, Play, Layers, Youtube, Cloud, Info } from "lucide-react";

interface ConnectedServicesProps {
  onBack: () => void;
}

export default function ConnectedServices({ onBack }: ConnectedServicesProps) {
  const [spotifyConnected, setSpotifyConnected] = useState<boolean>(true);
  const [appleConnected, setAppleConnected] = useState<boolean>(false);
  const [youtubeConnected, setYoutubeConnected] = useState<boolean>(false);
  const [tidalConnected, setTidalConnected] = useState<boolean>(false);
  const [soundcloudConnected, setSoundCloudConnected] = useState<boolean>(false);

  return (
    <div className="pb-32 px-5 space-y-6 max-w-screen-md mx-auto" id="connected-services-screen">
      {/* Top Header */}
      <div className="flex items-center gap-4 pt-4 border-b border-white/5 pb-4">
        <button
          onClick={onBack}
          className="p-1 px-2 rounded-xl text-primary hover:bg-white/5 active:scale-95 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="font-display font-bold text-xl text-white">Connected Services</h2>
      </div>

      {/* Active connections section */}
      <section className="space-y-3">
        <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-[#cfc2d6]">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-tertiary shadow-[0_0_8px_#4edea3]"></span>
            Active Connections
          </span>
          <span className="text-tertiary font-extrabold uppercase">
            {spotifyConnected ? "1 Connected" : "0 Connected"}
          </span>
        </div>

        {/* Spotify list item */}
        <div className="glass-card p-4 flex items-center justify-between group transition-all duration-300 border-t border-white/10">
          <div className="flex items-center gap-4 min-w-0">
            <div className="w-12 h-12 rounded-xl bg-[#1DB954]/15 flex items-center justify-center shrink-0">
              <Radio className="w-7 h-7 text-[#1DB954]" />
            </div>
            <div className="min-w-0 space-y-0.5">
              <h3 className="font-display font-bold text-base text-white">Spotify</h3>
              <p className="text-xs text-on-surface-variant truncate w-full">
                Sync your playlists and liked songs
              </p>
            </div>
          </div>
          
          <div className="flex flex-col items-end gap-1.5 shrink-0">
            <div
              onClick={() => setSpotifyConnected(!spotifyConnected)}
              className={`w-11 h-6 rounded-full p-0.5 transition-all duration-300 cursor-pointer ${
                spotifyConnected ? "bg-primary" : "bg-[#353534]"
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-all duration-300 ${
                  spotifyConnected ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </div>
            <span className={`text-[9px] font-bold uppercase tracking-widest ${spotifyConnected ? "text-primary" : "text-on-surface-variant"}`}>
              {spotifyConnected ? "CONNECTED" : "OFFLINE"}
            </span>
          </div>
        </div>
      </section>

      {/* Available Connections section */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#cfc2d6] pb-1">
          <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_#ddb7ff]"></span>
          Available Services
        </div>

        <div className="space-y-3">
          {/* Apple Music */}
          <div className="glass-card p-4 flex items-center justify-between hover:bg-white/5 transition-colors border border-white/5">
            <div className="flex items-center gap-4 min-w-0">
              <div className="w-12 h-12 rounded-xl bg-[#FA243C]/10 flex items-center justify-center shrink-0">
                <Music className="w-6 h-6 text-[#FA243C]" />
              </div>
              <div className="min-w-0 space-y-0.5">
                <h3 className="font-display font-bold text-base text-white">Apple Music</h3>
                <p className="text-xs text-on-surface-variant truncate w-full">
                  Import your entire Apple library
                </p>
              </div>
            </div>
            
            <button
              onClick={() => setAppleConnected(!appleConnected)}
              className={`px-4 py-1.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                appleConnected ? "bg-[#FA243C]/20 text-[#FA243C] border border-[#FA243C]" : "bg-neutral-800 text-primary hover:bg-primary hover:text-black"
              }`}
            >
              {appleConnected ? "CONNECTED" : "Connect"}
            </button>
          </div>

          {/* YouTube Music */}
          <div className="glass-card p-4 flex items-center justify-between hover:bg-white/5 transition-colors border border-white/5">
            <div className="flex items-center gap-4 min-w-0">
              <div className="w-12 h-12 rounded-xl bg-[#FF0000]/10 flex items-center justify-center shrink-0">
                <Youtube className="w-7 h-7 text-[#FF0000]" />
              </div>
              <div className="min-w-0 space-y-0.5">
                <h3 className="font-display font-bold text-base text-white">YouTube Music</h3>
                <p className="text-xs text-on-surface-variant truncate w-full">
                  Access your video-based favorites
                </p>
              </div>
            </div>
            
            <button
              onClick={() => setYoutubeConnected(!youtubeConnected)}
              className={`px-4 py-1.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                youtubeConnected ? "bg-red-500/20 text-[#FF0000] border border-red-500/35" : "bg-neutral-800 text-primary hover:bg-primary hover:text-black"
              }`}
            >
              {youtubeConnected ? "CONNECTED" : "Connect"}
            </button>
          </div>

          {/* Tidal */}
          <div className="glass-card p-4 flex items-center justify-between hover:bg-white/5 transition-colors border border-white/5">
            <div className="flex items-center gap-4 min-w-0">
              <div className="w-12 h-12 rounded-xl bg-cyan-400/10 flex items-center justify-center shrink-0">
                <Layers className="w-6 h-6 text-cyan-400" />
              </div>
              <div className="min-w-0 space-y-0.5">
                <h3 className="font-display font-bold text-base text-white">Tidal</h3>
                <p className="text-xs text-on-surface-variant truncate w-full">
                  High-fidelity audio sync
                </p>
              </div>
            </div>
            
            <button
              onClick={() => setTidalConnected(!tidalConnected)}
              className={`px-4 py-1.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                tidalConnected ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/30" : "bg-neutral-800 text-primary hover:bg-primary hover:text-black"
              }`}
            >
              {tidalConnected ? "CONNECTED" : "Connect"}
            </button>
          </div>

          {/* SoundCloud */}
          <div className="glass-card p-4 flex items-center justify-between hover:bg-white/5 transition-colors border border-white/5">
            <div className="flex items-center gap-4 min-w-0">
              <div className="w-12 h-12 rounded-xl bg-[#FF5500]/10 flex items-center justify-center shrink-0">
                <Cloud className="w-6 h-6 text-[#FF5500]" />
              </div>
              <div className="min-w-0 space-y-0.5">
                <h3 className="font-display font-bold text-base text-white">SoundCloud</h3>
                <p className="text-xs text-on-surface-variant truncate w-full">
                  Sync independent artist tracks
                </p>
              </div>
            </div>
            
            <button
              onClick={() => setSoundCloudConnected(!soundcloudConnected)}
              className={`px-4 py-1.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                soundcloudConnected ? "bg-orange-500/10 text-orange-500 border border-orange-500/30" : "bg-neutral-800 text-primary hover:bg-primary hover:text-black"
              }`}
            >
              {soundcloudConnected ? "CONNECTED" : "Connect"}
            </button>
          </div>
        </div>
      </section>

      {/* Support help panel */}
      <div className="glass-card p-5 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20 flex gap-4">
        <Info className="w-6 h-6 text-secondary shrink-0" />
        <div className="space-y-1.5 text-left">
          <p className="text-sm font-semibold text-white">Don't see your service?</p>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            We are constantly adding new music providers and streaming connections. Request an engineering integration below.
          </p>
          <button className="text-secondary font-bold text-xs hover:underline mt-1 bg-transparent border-none cursor-pointer">
            Request Integration
          </button>
        </div>
      </div>
    </div>
  );
}
