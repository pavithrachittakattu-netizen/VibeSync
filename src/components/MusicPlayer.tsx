import React, { useEffect, useRef, useState } from "react";
import { Play, Pause, SkipForward, SkipBack, Shuffle, Repeat, Volume2, VolumeX, Minimize2, ChevronDown, ListCheck, Sparkles, Music, HelpCircle, RefreshCw } from "lucide-react";
import { Track } from "../types";

interface MusicPlayerProps {
  currentTrack: Track | null;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onNextTrack: () => void;
  onPrevTrack: () => void;
  duration: number; // in seconds
  progress: number; // in seconds
  onSeek: (seconds: number) => void;
  fullscreen: boolean;
  onToggleFullscreen: (fullscreen: boolean) => void;
}

export default function MusicPlayer({
  currentTrack,
  isPlaying,
  onTogglePlay,
  onNextTrack,
  onPrevTrack,
  duration,
  progress,
  onSeek,
  fullscreen,
  onToggleFullscreen,
}: MusicPlayerProps) {
  const [volume, setVolume] = useState<number>(65);
  const [muted, setMuted] = useState<boolean>(false);
  const [shuffleActive, setShuffleActive] = useState<boolean>(false);
  const [repeatActive, setRepeatActive] = useState<boolean>(false);
  const synthRef = useRef<any>(null); // Audio synth context refs
  const [showLyrics, setShowLyrics] = useState<boolean>(true);

  // Sync lyrics lines based on current track or default
  const defaultLyrics = [
    "Neon lights are calling...",
    "In the grid we're falling...",
    "Synthetic dreams in a digital sky...",
    "We never stop, we never say goodbye..."
  ];
  
  const activeLyrics = currentTrack?.lyrics || defaultLyrics;
  
  // Calculate which lyric line is currently active
  const lyricSegmentSize = duration / activeLyrics.length;
  const activeLyricIndex = Math.min(
    Math.floor(progress / (lyricSegmentSize || 10)),
    activeLyrics.length - 1
  );

  // Format MM:SS
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // Web Audio Synth procedural ambient notes
  useEffect(() => {
    let audioCtx: AudioContext | null = null;
    let oscillator: OscillatorNode | null = null;
    let filter: BiquadFilterNode | null = null;
    let gainNode: GainNode | null = null;
    let timerId: any = null;

    if (isPlaying && currentTrack) {
      try {
        // Initialize Web Audio API context
        const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
        audioCtx = new AudioCtxClass();
        
        // Base low pad synth sound
        oscillator = audioCtx.createOscillator();
        filter = audioCtx.createBiquadFilter();
        gainNode = audioCtx.createGain();

        oscillator.type = "sawtooth";
        
        // Determine pitch frequency based on track title or bpm
        const trackHash = (currentTrack.title || "").charCodeAt(0) || 60;
        const baseFreq = 55 + (trackHash % 3) * 12; // E.g., 55Hz (A1), 67Hz, etc.
        oscillator.frequency.setValueAtTime(baseFreq, audioCtx.currentTime);

        filter.type = "lowpass";
        filter.frequency.setValueAtTime(280, audioCtx.currentTime);
        filter.Q.setValueAtTime(6, audioCtx.currentTime);

        const targetVolume = muted ? 0 : (volume / 100) * 0.08;
        gainNode.gain.setValueAtTime(targetVolume, audioCtx.currentTime);

        oscillator.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        oscillator.start();

        // Cyclic procedural melodic note triggers!
        let noteCounter = 0;
        const notes = [1, 1.2, 1.5, 1.33, 1.8, 1.6]; // Melodic ratios
        
        timerId = setInterval(() => {
          if (audioCtx && filter && gainNode && !muted) {
            // Play a soft high resonant chime
            const melodyOsc = audioCtx.createOscillator();
            const melodyGain = audioCtx.createGain();
            const resonanceFreq = baseFreq * 4 * notes[noteCounter % notes.length];
            
            melodyOsc.type = "sine";
            melodyOsc.frequency.setValueAtTime(resonanceFreq, audioCtx.currentTime);
            
            melodyGain.gain.setValueAtTime(0, audioCtx.currentTime);
            melodyGain.gain.linearRampToValueAtTime((volume / 100) * 0.03, audioCtx.currentTime + 0.05);
            melodyGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1.8);
            
            melodyOsc.connect(melodyGain);
            melodyGain.connect(audioCtx.destination);
            melodyOsc.start();
            melodyOsc.stop(audioCtx.currentTime + 2.0);
            
            // Wobble low pass filter frequency for fluid space sound!
            filter.frequency.linearRampToValueAtTime(180 + Math.random() * 200, audioCtx.currentTime + 1.5);
            
            noteCounter++;
          }
        }, 2000);

        synthRef.current = { audioCtx, oscillator, filter, gainNode, timerId };
      } catch (err) {
        console.warn("Web Audio Context could not start:", err);
      }
    }

    return () => {
      // Clean up synth nodes immediately on state toggle
      if (synthRef.current) {
        try {
          const { audioCtx, oscillator, timerId, gainNode } = synthRef.current;
          if (timerId) clearInterval(timerId);
          if (oscillator) {
            oscillator.stop();
          }
          if (audioCtx && audioCtx.state !== "closed") {
            audioCtx.close();
          }
        } catch (ex) {
          // ignore
        }
        synthRef.current = null;
      }
    };
  }, [isPlaying, currentTrack, muted]);

  // Handle immediate volume or mute changes on synthesizer gain
  useEffect(() => {
    if (synthRef.current && synthRef.current.gainNode) {
      try {
        const targetVolume = muted ? 0 : (volume / 100) * 0.08;
        synthRef.current.gainNode.gain.setValueAtTime(targetVolume, synthRef.current.audioCtx.currentTime);
      } catch (e) {
        // ignore
      }
    }
  }, [volume, muted]);

  if (!currentTrack) return null;

  // Render Fullscreen overlay screen
  if (fullscreen) {
    return (
      <div className="fixed inset-0 bg-[#0f0f0f] z-50 overflow-y-auto flex flex-col justify-between select-none animate-slide-up">
        {/* Ambient top glowing layers overlay */}
        <div className="absolute w-[280px] h-[280px] bg-primary/20 blur-[100px] rounded-full top-[10%] left-1/4 pointer-events-none" />
        <div className="absolute w-[280px] h-[280px] bg-secondary/15 blur-[100px] rounded-full bottom-[20%] right-1/4 pointer-events-none" />

        {/* Top App Header */}
        <header className="flex justify-between items-center px-6 py-4 w-full border-b border-white/5 bg-black/10 backdrop-blur-md relative z-10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onToggleFullscreen(false)}
              className="p-1 px-[10px] rounded-xl text-primary hover:bg-white/5 active:scale-90 transition-all cursor-pointer"
            >
              <ChevronDown className="w-6 h-6" />
            </button>
            <h1 className="font-display font-black text-xl text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary tracking-tight">
              VibeSync
            </h1>
          </div>
          <div className="flex items-center gap-2 text-on-surface-variant">
            <button
              onClick={() => setShowLyrics(!showLyrics)}
              className={`p-2 rounded-lg cursor-pointer ${showLyrics ? "text-primary bg-primary/10" : ""}`}
              title="Toggle Dynamic Lyrics View"
            >
              <ListCheck className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Player Canvas body center */}
        <main className="flex-1 flex flex-col items-center justify-center py-6 px-6 relative z-10 max-w-lg mx-auto w-full space-y-6">
          {/* Spinning Concentric Disk Art */}
          <div className="relative w-full aspect-square max-w-[260px] md:max-w-[300px] flex items-center justify-center mb-1 select-none">
            {/* Ambient Bloom surrounding record ring */}
            <div className={`absolute inset-2 bg-gradient-to-br from-primary to-secondary rounded-full opacity-20 blur-[30px] transition-all duration-1000 ${
              isPlaying ? "scale-105 animate-pulse" : "scale-100"
            }`} />

            {/* Simulated spinning vinyl record body */}
            <div className={`w-full aspect-square rounded-full bg-neutral-900 border-4 border-neutral-950 p-[3px] shadow-2xl relative ${
              isPlaying ? "animate-spin-slow" : ""
            }`} style={{ animationDuration: "10s" }}>
              <div className="w-full h-full rounded-full bg-black flex items-center justify-center relative border border-white/5 p-4">
                {/* Concentric subtle laser records paths */}
                <div className="absolute inset-4 rounded-full border border-white/5 opacity-40" />
                <div className="absolute inset-8 rounded-full border border-white/5 opacity-30" />
                <div className="absolute inset-12 rounded-full border border-white/5 opacity-25" />
                <div className="absolute inset-16 rounded-full border border-white/5 opacity-20" />
                
                {/* Center aesthetic labels matching current frequency style */}
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-primary via-[#ddb7ff]/40 to-secondary flex items-center justify-center p-1.5 shadow-inner">
                  <div className="w-full h-full rounded-full bg-black flex flex-col justify-center items-center text-center p-1">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#0f0f0f] border border-white/30" />
                    <span className="text-[7px] text-primary truncate max-w-[60px] mt-1 font-bold">
                      {currentTrack.genre || "SYNTH"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Track Details block */}
          <div className="text-center space-y-1">
            <h2 className="font-display font-extrabold text-xl md:text-2xl text-white tracking-tight drop-shadow">
              {currentTrack.title}
            </h2>
            <p className="text-on-surface-variant text-sm font-semibold tracking-wide text-[#cfc2d6]">
              {currentTrack.artist}
            </p>
          </div>

          {/* Scrolling matching synchronized Lyrics Container */}
          {showLyrics && (
            <div className="w-full max-w-sm h-36 bg-[#1a1a1a]/30 backdrop-blur-xl border border-white/5 rounded-2xl p-4 flex flex-col justify-center items-center text-center space-y-2.5 overflow-hidden relative shadow-inner">
              <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-[#0f0f0f]/30 to-transparent pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-[#0f0f0f]/30 to-transparent pointer-events-none" />
              
              <div className="space-y-1 text-center select-none">
                {activeLyrics.map((line, idx) => {
                  const isActive = idx === activeLyricIndex;
                  return (
                    <p
                      key={idx}
                      className={`text-xs md:text-sm font-medium transition-all duration-300 ${
                        isActive
                          ? "text-primary font-bold scale-[1.05] drop-shadow-[0_0_8px_rgba(221,183,255,0.4)]"
                          : "text-on-surface-variant/40 hover:text-on-surface-variant/70"
                      }`}
                    >
                      {line}
                    </p>
                  );
                })}
              </div>
            </div>
          )}

          {/* Progress Timeline Scrubber slider bar */}
          <div className="w-full space-y-2">
            <div
              className="relative h-1.5 w-full bg-neutral-800 rounded-full cursor-pointer overflow-hidden shadow-inner group"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickPos = (e.clientX - rect.left) / rect.width;
                onSeek(clickPos * duration);
              }}
            >
              <div
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-primary to-secondary rounded-full shadow-[0_0_8px_#ddb7ff]"
                style={{ width: `${(progress / (duration || 100)) * 100}%` }}
              />
            </div>
            
            <div className="flex justify-between text-xs font-semibold text-on-surface-variant/60 font-mono tracking-wider">
              <span>{formatTime(progress)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Direct Playback button controllers */}
          <div className="flex items-center justify-between w-full max-w-xs">
            <button
              onClick={() => setShuffleActive(!shuffleActive)}
              className={`p-1.5 hover:text-primary transition-colors cursor-pointer ${
                shuffleActive ? "text-primary drop-shadow-[0_0_8px_#ddb7ff]" : "text-on-surface-variant/60"
              }`}
            >
              <Shuffle className="w-4 h-4" />
            </button>

            <button
              onClick={onPrevTrack}
              className="p-1 px-[10px] text-white hover:text-primary active:scale-90 transition-transform cursor-pointer"
            >
              <SkipBack className="w-6 h-6 fill-current" />
            </button>

            <button
              onClick={onTogglePlay}
              className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-neutral-950 shadow-[0_8px_20px_rgba(221,183,255,0.35)] hover:scale-105 active:scale-95 transition-all cursor-pointer shrink-0"
            >
              {isPlaying ? (
                <Pause className="w-7 h-7 fill-current" />
              ) : (
                <Play className="w-7 h-7 fill-current translate-x-0.5" />
              )}
            </button>

            <button
              onClick={onNextTrack}
              className="p-1 px-[10px] text-white hover:text-primary active:scale-90 transition-transform cursor-pointer"
            >
              <SkipForward className="w-6 h-6 fill-current" />
            </button>

            <button
              onClick={() => setRepeatActive(!repeatActive)}
              className={`p-1.5 hover:text-primary transition-colors cursor-pointer ${
                repeatActive ? "text-primary drop-shadow-[0_0_8px_#ddb7ff]" : "text-on-surface-variant/60"
              }`}
            >
              <Repeat className="w-4 h-4" />
            </button>
          </div>

          {/* Volume Control Scrubber */}
          <div className="w-full flex items-center gap-3">
            <button
              onClick={() => setMuted(!muted)}
              className="text-on-surface-variant hover:text-white transition-colors cursor-pointer"
            >
              {muted || volume === 0 ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => {
                setVolume(parseInt(e.target.value));
                if (muted) setMuted(false);
              }}
              className="flex-grow h-1 bg-neutral-850 accent-primary rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Sync vibe trigger button */}
          <button
            onClick={() => onSeek(0)}
            className="px-8 py-2.5 rounded-full bg-[#1c1b1b] hover:bg-primary/10 border border-primary/20 text-primary font-display font-extrabold text-[11px] uppercase tracking-widest flex items-center gap-2 transition-all shadow-[0_0_12px_rgba(221,183,255,0.06)] active:scale-95 cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isPlaying ? "animate-spin" : ""}`} style={{ animationDuration: "6s" }} />
            Sync Sound
          </button>
        </main>
      </div>
    );
  }

  // Render Mini Player (Bottom Glass Bar anchored)
  return (
    <div
      onClick={() => onToggleFullscreen(true)}
      className="fixed bottom-24 left-5 right-5 z-40 mx-auto max-w-md group glass-card p-3 flex items-center justify-between border-primary/20 shadow-[0_4px_30px_rgba(221,183,255,0.12)] hover:border-primary/45 transition-all select-none cursor-pointer flex-shrink-0 animate-fade-in"
    >
      <div className="flex items-center gap-3 min-w-0 flex-1">
        {/* Album Art thumbnail spinner */}
        <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 relative shadow border border-white/5">
          <img
            src={currentTrack.coverUrl}
            alt={currentTrack.title}
            className={`w-full h-full object-cover ${isPlaying ? "animate-spin-slow" : ""}`}
            style={{ animationDuration: "15s" }}
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Name details */}
        <div className="flex-1 min-w-0 text-left space-y-0.5">
          <p className="font-display font-extrabold text-[13px] text-white truncate w-full group-hover:text-primary transition-colors leading-tight">
            {currentTrack.title}
          </p>
          <p className="text-[9px] text-[#cfc2d6] font-extrabold uppercase tracking-widest leading-none truncate w-full">
            VIBESYNC AI • {formatTime(progress)} / {formatTime(duration)}
          </p>
          {/* Mini progress bar segment */}
          <div className="w-full h-0.5 bg-neutral-800 rounded-full mt-1.5 overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-300"
              style={{ width: `${(progress / (duration || 100)) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Button Controls */}
      <div className="flex items-center gap-3 shrink-0 ml-3" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onPrevTrack}
          className="text-on-surface-variant hover:text-white hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          <SkipBack className="w-4 h-4 fill-current" />
        </button>

        <button
          onClick={onTogglePlay}
          className="w-9 h-9 rounded-full bg-primary text-black flex items-center justify-center shrink-0 hover:scale-[1.05] active:scale-90 transition-transform cursor-pointer shadow"
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 fill-current" />
          ) : (
            <Play className="w-4 h-4 fill-current translate-x-0.5" />
          )}
        </button>

        <button
          onClick={onNextTrack}
          className="text-on-surface-variant hover:text-white hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          <SkipForward className="w-4 h-4 fill-current" />
        </button>
      </div>
    </div>
  );
}
