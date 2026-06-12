import React, { useState } from "react";
import { Sparkles, Play, Plus, Heart, Music, AlertCircle, Loader } from "lucide-react";
import { Track, Playlist, VibeHistoryItem } from "../types";

interface GenerateVibeProps {
  onPlayTrack: (track: Track, queue: Track[]) => void;
  onAddHistory: (item: VibeHistoryItem) => void;
  onNavigate: (view: string) => void;
}

export default function GenerateVibe({
  onPlayTrack,
  onAddHistory,
  onNavigate,
}: GenerateVibeProps) {
  const [prompt, setPrompt] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedVibe, setGeneratedVibe] = useState<any | null>(null);
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);

  const presets = ["Chill", "Hype", "Focus", "Dark", "Euphoric", "Melancholy"];

  const handlePresetSelect = (preset: string) => {
    setSelectedPreset(preset);
    let extraText = "";
    if (preset === "Dark") extraText = "Atmospheric late night retro cyberpunk beats";
    else if (preset === "Chill") extraText = "Smooth chill ambient lo-fi bedroom tones";
    else if (preset === "Focus") extraText = "Deep сосредоточенный rhythmic house synthesizer loops";
    else if (preset === "Hype") extraText = "Energetic high-intensity electric festival dance music";
    else if (preset === "Euphoric") extraText = "Warm uplifting euphoric deep house melodic rhythms";
    else if (preset === "Melancholy") extraText = "Sorrowful nostalgic synthesizers with ocean rain soundtracks";
    
    setPrompt(extraText);
  };

  const handleGenerateMagic = async () => {
    const finalPrompt = prompt.trim() || (selectedPreset ? `${selectedPreset} aesthetic music` : "Late night drives through Tokyo neon lights...");
    setLoading(true);
    setError(null);
    setGeneratedVibe(null);

    try {
      const response = await fetch("/api/generate-vibe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: finalPrompt,
          presetCategory: selectedPreset || "Ambient",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to communicate with VibeSync synthesis engine.");
      }

      const data = await response.json();
      setGeneratedVibe(data);

      // Add to history list in App
      const trackCoverMapping = "https://lh3.googleusercontent.com/aida-public/AB6AXuB0B_OY_9tdrVzfccCugtMc7_CXOZy6I02IKOy1Qp3QBr6Bwcp8U68u1dPzQt20959h175qDxCRcBkcEAc0-ftqd-PDzhzkv5IoQamp9FxH4ifLiMTlrjAvBZPkqtI0mKg_XKJzasCM8RkCNOGH34jZO6zbYDSaaxuHsvd4btQJfYkKxVdsdi5aW5OyP5EphqoKIrV_fXyh_ARnH8d1_OBmydm3m3JI0QFYmdA6_4m4H2GVmlyXfL-WyJJZDi95qr2EvT2bCC_oofqY";
      
      const tracksWithCovers: Track[] = data.tracks.map((t: any) => ({
        ...t,
        coverUrl: trackCoverMapping,
        lyrics: data.lyrics,
      }));

      const historyItem: VibeHistoryItem = {
        id: `vibe-${Date.now()}`,
        vibePrompt: finalPrompt,
        title: data.title,
        category: data.frequency,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + " Today",
        tracks: tracksWithCovers,
        coverUrl: trackCoverMapping,
      };
      
      onAddHistory(historyItem);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unexpected error occurred during sound generation.");
    } finally {
      setLoading(false);
    }
  };

  const syncGeneratedPlaylist = () => {
    if (!generatedVibe) return;
    
    const trackCoverMapping = "https://lh3.googleusercontent.com/aida-public/AB6AXuB0B_OY_9tdrVzfccCugtMc7_CXOZy6I02IKOy1Qp3QBr6Bwcp8U68u1dPzQt20959h175qDxCRcBkcEAc0-ftqd-PDzhzkv5IoQamp9FxH4ifLiMTlrjAvBZPkqtI0mKg_XKJzasCM8RkCNOGH34jZO6zbYDSaaxuHsvd4btQJfYkKxVdsdi5aW5OyP5EphqoKIrV_fXyh_ARnH8d1_OBmydm3m3JI0QFYmdA6_4m4H2GVmlyXfL-WyJJZDi95qr2EvT2bCC_oofqY";
    
    const preparedTracks: Track[] = generatedVibe.tracks.map((t: any) => ({
      ...t,
      coverUrl: trackCoverMapping,
      lyrics: generatedVibe.lyrics,
    }));

    if (preparedTracks.length > 0) {
      onPlayTrack(preparedTracks[0], preparedTracks);
      onNavigate("now_playing");
    }
  };

  const demoPhrases = [
    "Late night drives through Tokyo neon lights...",
    "Sitting by a wet coffee window in Paris evening...",
    "Midnight high energy techno arcade session...",
    "Stargazing under heavy space dust aurora clouds..."
  ];

  return (
    <div className="pb-32 px-5 space-y-6 max-w-screen-md mx-auto" id="generate-vibe-screen">
      {/* Title block */}
      <section className="text-center pt-4 space-y-2">
        <h2 className="font-display font-extrabold text-2xl md:text-3xl tracking-tight text-white">
          What's the vibe?
        </h2>
        <p className="text-on-surface-variant font-bold text-xs uppercase tracking-widest text-[#988d9f]">
          Describe your mood or activity
        </p>
      </section>

      {/* Main glass box prompt zone */}
      <section className="space-y-4">
        <div className="relative glass-card p-4 border border-white/10 shadow-[0_0_20px_rgba(221,183,255,0.06)] focus-within:border-primary/50 transition-all duration-300">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Late night drives through Tokyo neon lights..."
            className="w-full h-36 bg-transparent text-white font-medium text-base placeholder-on-surface-variant/40 resize-none border-none outline-none focus:ring-0 leading-relaxed"
          />
          
          <div className="flex justify-between items-center text-[10px] text-on-surface-variant/50 font-bold mt-2 uppercase tracking-wide">
            <span>AI Music Synthesis Prompt</span>
            <span className="text-primary">{prompt.length} chars</span>
          </div>
        </div>

        {/* Input Suggestion helper tags */}
        <div className="flex flex-wrap gap-2 justify-center py-1">
          {presets.map((preset) => (
            <button
              key={preset}
              onClick={() => handlePresetSelect(preset)}
              className={`px-4 py-2 text-xs font-bold uppercase rounded-full border transition-all duration-300 cursor-pointer ${
                selectedPreset === preset
                  ? "bg-primary border-primary text-black scale-[1.04]"
                  : "bg-[#1c1b1b] border-white/5 text-on-surface-variant hover:border-primary/50"
              }`}
            >
              {preset}
            </button>
          ))}
        </div>

        {/* Big Generate magic launcher */}
        <button
          onClick={handleGenerateMagic}
          disabled={loading}
          className="w-full py-4 bg-gradient-to-r from-primary via-secondary to-tertiary text-neutral-950 font-display font-extrabold text-sm md:text-base rounded-full shadow-[0_0_25px_rgba(221,183,255,0.3)] hover:scale-[1.01] active:scale-95 transition-all text-center tracking-wide uppercase flex items-center justify-center gap-2 cursor-pointer"
        >
          {loading ? (
            <>
              <Loader className="w-5 h-5 animate-spin" />
              Synthesizing Chitchat & Waves...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 fill-current" />
              Generate Magic
            </>
          )}
        </button>
      </section>

      {/* Loading animation state detail */}
      {loading && (
        <div className="glass-card p-6 text-center space-y-3 animate-pulse">
          <Loader className="w-8 h-8 text-primary animate-spin mx-auto" />
          <p className="text-sm font-semibold text-white">Contacting VibeSync Neural Composer...</p>
          <div className="text-xs text-on-surface-variant space-y-1">
            <p>• Generating 5 dynamic synchronized chord tracks...</p>
            <p>• Designing customized ambient frequency waveforms...</p>
            <p>• Authoring procedural lyrics stream...</p>
          </div>
        </div>
      )}

      {/* Error display */}
      {error && (
        <div className="glass-card p-4 border-red-500/30 bg-red-500/5 flex items-center gap-3 text-red-200 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0 text-red-400" />
          <p>{error}</p>
        </div>
      )}

      {/* Success generated playlist output display box */}
      {generatedVibe && (
        <div className="glass-card p-5 border border-primary/20 space-y-5 animate-fade-in">
          <div className="border-b border-white/5 pb-4 space-y-2">
            <div className="flex justify-between items-start">
              <h3 className="font-display font-bold text-xl text-primary drop-shadow-md">
                {generatedVibe.title}
              </h3>
              <span className="px-2.5 py-1 text-[10px] font-bold text-secondary-dark bg-secondary/20 rounded-full">
                AI GEN
              </span>
            </div>
            <p className="text-xs font-bold text-secondary uppercase tracking-widest leading-none">
              Frequency: {generatedVibe.frequency}
            </p>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              {generatedVibe.description}
            </p>
          </div>

          {/* Tracklist layout */}
          <div className="space-y-2.5">
            {generatedVibe.tracks.map((track: any, index: number) => (
              <div
                key={track.id}
                className="flex items-center justify-between p-3 rounded-xl bg-black/20 hover:bg-white/5 transition-colors group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center text-primary font-display font-extrabold text-sm border border-primary/20">
                    {index + 1}
                  </div>
                  <div className="min-w-0">
                    <p className="text-white font-bold text-sm truncate group-hover:text-secondary transition-colors">
                      {track.title}
                    </p>
                    <p className="text-xs text-[#988d9f] truncate">
                      {track.artist}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-on-surface-variant">
                    {track.duration}
                  </span>
                  <Heart className="w-4 h-4 text-on-surface-variant hover:text-red-500 cursor-pointer transition-colors" />
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={syncGeneratedPlaylist}
            className="w-full py-3.5 bg-gradient-to-r from-secondary to-primary text-black font-display font-extrabold text-sm rounded-xl hover:scale-[1.01] active:scale-95 transition-all text-center uppercase tracking-wider cursor-pointer"
          >
            Sync Vibe & Start Playing
          </button>
        </div>
      )}
    </div>
  );
}
