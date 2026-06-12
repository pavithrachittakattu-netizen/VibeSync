import React, { useState } from "react";
import { ArrowLeft, Wifi, Download, Check, HelpCircle } from "lucide-react";

interface AudioQualitySettingsProps {
  onBack: () => void;
}

export default function AudioQualitySettings({ onBack }: AudioQualitySettingsProps) {
  const [streamTier, setStreamTier] = useState<string>("high"); // "standard" | "high" | "lossless"
  const [downloadTier, setDownloadTier] = useState<string>("high"); // "standard" | "high" | "lossless"
  const [cellularDownload, setCellularDownload] = useState<boolean>(true);

  return (
    <div className="pb-32 px-5 space-y-6 max-w-screen-md mx-auto animate-fade-in" id="audio-quality-settings-screen">
      {/* Top Navigation Header */}
      <div className="flex items-center justify-between pt-4 border-b border-white/5 pb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-1 px-2 rounded-xl text-primary hover:bg-white/5 active:scale-95 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="font-display font-bold text-xl text-white">Audio Quality</h2>
        </div>
        
        {/* User avatar right header */}
        <div className="w-9 h-9 rounded-full overflow-hidden border border-white/10 shrink-0">
          <img
            alt="Alex Avatar"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCgkAF7YTgRxHesUishW0rcwacgiWp9_dV9ts9S0nyMfo1TjdI6wO6cBSFUwfd3y3rzuyFwe_DQUYXX5YJXrc5aX-6iIlA5hLNwg0E3OIewd_uGBAWhqCR9KexC3sXwMZLyeVG8l7TVhTF9BRevxp-UgikUGYcGWnMSviSa08ZQ8ixzbY-H_1vxCXllkpjuG5hZGRcbtn3sP68JH6ybTw40vQ6QliL3HFg6sHnP3idKsVwXep4a9rOvAaxHg-4Z_ulSF98teZAYSu5d"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      {/* Streaming quality */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#cfc2d6] pb-1">
          <Wifi className="w-4 h-4 text-primary" />
          <span>Streaming Quality</span>
        </div>

        <div className="space-y-2">
          {/* Standard */}
          <div
            onClick={() => setStreamTier("standard")}
            className={`glass-card p-4 flex items-center justify-between cursor-pointer transition-all border ${
              streamTier === "standard"
                ? "border-primary bg-primary/5 relative before:absolute before:left-0 before:top-1/4 before:bottom-1/4 before:w-1 before:bg-primary before:rounded"
                : "border-white/5 hover:border-white/15"
            }`}
          >
            <div className="space-y-0.5">
              <p className="font-bold text-sm text-white">Standard</p>
              <p className="text-xs text-on-surface-variant font-medium">Data saver (96kbps)</p>
            </div>
            <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
              streamTier === "standard" ? "border-primary text-primary" : "border-[#4d4354]"
            }`}>
              {streamTier === "standard" && <div className="w-2.5 h-2.5 bg-primary rounded-full" />}
            </div>
          </div>

          {/* High */}
          <div
            onClick={() => setStreamTier("high")}
            className={`glass-card p-4 flex items-center justify-between cursor-pointer transition-all border ${
              streamTier === "high"
                ? "border-primary bg-primary/5 relative before:absolute before:left-0 before:top-1/4 before:bottom-1/4 before:w-1 before:bg-primary before:rounded"
                : "border-white/5 hover:border-white/15"
            }`}
          >
            <div className="space-y-0.5">
              <p className="font-bold text-sm text-white">High Quality</p>
              <p className="text-xs text-on-surface-variant font-medium">Crystal clear (320kbps)</p>
            </div>
            <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
              streamTier === "high" ? "border-primary text-primary" : "border-[#4d4354]"
            }`}>
              {streamTier === "high" && <div className="w-2.5 h-2.5 bg-primary rounded-full" />}
            </div>
          </div>

          {/* Lossless */}
          <div
            onClick={() => setStreamTier("lossless")}
            className={`glass-card p-4 flex items-center justify-between cursor-pointer transition-all border ${
              streamTier === "lossless"
                ? "border-primary bg-primary/5 relative before:absolute before:left-0 before:top-1/4 before:bottom-1/4 before:w-1 before:bg-primary before:rounded"
                : "border-white/5 hover:border-white/15"
            }`}
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <p className="font-bold text-sm text-white">Lossless</p>
                <span className="bg-[#4cd7f6]/20 text-secondary font-bold text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded leading-none shrink-0 border border-secondary/20">
                  Hi-Fi
                </span>
              </div>
              <p className="text-xs text-on-surface-variant font-medium">Studio grade (24-bit/48kHz)</p>
            </div>
            <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
              streamTier === "lossless" ? "border-primary text-primary" : "border-[#4d4354]"
            }`}>
              {streamTier === "lossless" && <div className="w-2.5 h-2.5 bg-primary rounded-full" />}
            </div>
          </div>
        </div>
      </section>

      {/* Download quality */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#cfc2d6] pb-1">
          <Download className="w-4 h-4 text-secondary" />
          <span>Download Quality</span>
        </div>

        <div className="space-y-2">
          {/* Standard */}
          <div
            onClick={() => setDownloadTier("standard")}
            className={`glass-card p-4 flex items-center justify-between cursor-pointer transition-all border ${
              downloadTier === "standard"
                ? "border-primary bg-primary/5 relative before:absolute before:left-0 before:top-1/4 before:bottom-1/4 before:w-1 before:bg-primary before:rounded"
                : "border-white/5 hover:border-white/15"
            }`}
          >
            <div className="space-y-0.5">
              <p className="font-bold text-sm text-white">Standard</p>
              <p className="text-xs text-on-surface-variant font-medium">Saves disk space</p>
            </div>
            <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
              downloadTier === "standard" ? "border-primary text-primary" : "border-[#4d4354]"
            }`}>
              {downloadTier === "standard" && <div className="w-2.5 h-2.5 bg-primary rounded-full" />}
            </div>
          </div>

          {/* High */}
          <div
            onClick={() => setDownloadTier("high")}
            className={`glass-card p-4 flex items-center justify-between cursor-pointer transition-all border ${
              downloadTier === "high"
                ? "border-primary bg-primary/5 relative before:absolute before:left-0 before:top-1/4 before:bottom-1/4 before:w-1 before:bg-primary before:rounded"
                : "border-white/5 hover:border-white/15"
            }`}
          >
            <div className="space-y-0.5">
              <p className="font-bold text-sm text-white">High Quality</p>
              <p className="text-xs text-on-surface-variant font-medium">Recommended for daily use</p>
            </div>
            <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
              downloadTier === "high" ? "border-primary text-primary" : "border-[#4d4354]"
            }`}>
              {downloadTier === "high" && <div className="w-2.5 h-2.5 bg-primary rounded-full" />}
            </div>
          </div>

          {/* Lossless */}
          <div
            onClick={() => setDownloadTier("lossless")}
            className={`glass-card p-4 flex items-center justify-between cursor-pointer transition-all border ${
              downloadTier === "lossless"
                ? "border-primary bg-primary/5 relative before:absolute before:left-0 before:top-1/4 before:bottom-1/4 before:w-1 before:bg-primary before:rounded"
                : "border-white/5 hover:border-white/15"
            }`}
          >
            <div className="space-y-0.5">
              <p className="font-bold text-sm text-white">Lossless</p>
              <p className="text-xs text-on-surface-variant font-medium">Best for audiophile setups</p>
            </div>
            <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
              downloadTier === "lossless" ? "border-primary text-primary" : "border-[#4d4354]"
            }`}>
              {downloadTier === "lossless" && <div className="w-2.5 h-2.5 bg-primary rounded-full" />}
            </div>
          </div>
        </div>
      </section>

      {/* Cellular downloads toggler */}
      <section className="glass-card p-4 flex items-center justify-between border border-white/5 shadow">
        <div className="space-y-1">
          <p className="font-bold text-sm text-white">Download over Cellular</p>
          <p className="text-xs text-on-surface-variant font-medium">May increase mobile data usage charges</p>
        </div>
        
        <div
          onClick={() => setCellularDownload(!cellularDownload)}
          className={`w-11 h-6 rounded-full p-0.5 transition-all duration-300 cursor-pointer ${
            cellularDownload ? "bg-primary" : "bg-[#353534]"
          }`}
        >
          <div
            className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-all duration-300 ${
              cellularDownload ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </div>
      </section>

      {/* Dynamic Visual Accent Banner */}
      <div className="relative w-full h-28 rounded-3xl overflow-hidden mt-6 bg-gradient-to-r from-secondary-dark/15 to-primary-dark/20 border border-white/5 flex flex-col justify-center items-center text-center p-3 select-none">
        <p className="text-secondary font-display font-extrabold text-lg uppercase tracking-wider filter drop-shadow-[0_0_8px_#4cd7f6]">
          Sonic Fidelity
        </p>
        <p className="text-on-surface-variant text-[11px] leading-relaxed max-w-[280px]">
          Experience music as the artist intended with VibeSync High-Fidelity.
        </p>
      </div>
    </div>
  );
}
