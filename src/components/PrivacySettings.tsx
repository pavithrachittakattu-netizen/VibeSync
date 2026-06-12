import React, { useState } from "react";
import { ArrowLeft, Shield, Trash2, Heart, Award } from "lucide-react";

interface PrivacySettingsProps {
  onBack: () => void;
}

export default function PrivacySettings({ onBack }: PrivacySettingsProps) {
  const [isPrivate, setIsPrivate] = useState<boolean>(true);
  const [showActivity, setShowActivity] = useState<boolean>(false);
  const [sharePlaylists, setSharePlaylists] = useState<boolean>(true);
  const [discoverable, setDiscoverability] = useState<boolean>(false);
  const [personalizedAds, setPersonalizedAds] = useState<boolean>(true);
  const [clearing, setClearing] = useState<boolean>(false);
  const [clearedMsg, setClearedMsg] = useState<string>("Clear History");

  const handleClearHistory = () => {
    setClearing(true);
    setClearedMsg("Clearing...");
    setTimeout(() => {
      setClearedMsg("Cleared!");
      setClearing(false);
      setTimeout(() => {
        setClearedMsg("Clear History");
      }, 1500);
    }, 1200);
  };

  return (
    <div className="pb-32 px-5 space-y-6 max-w-screen-md mx-auto" id="privacy-settings-screen">
      {/* Top Header Navigation */}
      <div className="flex items-center justify-between pt-4 border-b border-white/5 pb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-1 px-2 rounded-xl text-primary hover:bg-white/5 active:scale-95 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="font-display font-bold text-xl text-white">Privacy</h2>
        </div>

        {/* User avatar right header */}
        <div className="w-9 h-9 rounded-full overflow-hidden border border-white/10 shrink-0">
          <img
            alt="Alex Rivers Avatar"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCgkAF7YTgRxHesUishW0rcwacgiWp9_dV9ts9S0nyMfo1TjdI6wO6cBSFUwfd3y3rzuyFwe_DQUYXX5YJXrc5aX-6iIlA5hLNwg0E3OIewd_uGBAWhqCR9KexC3sXwMZLyeVG8l7TVhTF9BRevxp-UgikUGYcGWnMSviSa08ZQ8ixzbY-H_1vxCXllkpjuG5hZGRcbtn3sP68JH6ybTw40vQ6QliL3HFg6sHnP3idKsVwXep4a9rOvAaxHg-4Z_ulSF98teZAYSu5d"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      {/* Profile Visibility section */}
      <section className="space-y-3">
        <h2 className="font-display text-xs font-bold text-on-surface-variant tracking-[0.1em] uppercase px-1">
          Profile Visibility
        </h2>

        <div className="glass-card p-4 space-y-4 divide-y divide-white/5 border border-white/5">
          {/* Private Profile Toggle */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5 max-w-[80%] text-left">
              <p className="font-bold text-sm text-white">Private Profile</p>
              <p className="text-xs text-on-surface-variant font-medium leading-relaxed">
                Only approved followers can see your listening track metrics or activity
              </p>
            </div>
            
            <div
              onClick={() => setIsPrivate(!isPrivate)}
              className={`w-11 h-6 rounded-full p-0.5 transition-all duration-300 shrink-0 cursor-pointer ${
                isPrivate ? "bg-primary shadow-[0_0_8px_#ddb7ff]" : "bg-[#353534]"
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-all duration-300 ${
                  isPrivate ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </div>
          </div>

          {/* Show Listening Activity Toggle */}
          <div className="flex items-center justify-between pt-4">
            <div className="space-y-0.5 max-w-[80%] text-left">
              <p className="font-bold text-sm text-white">Show Listening Activity</p>
              <p className="text-xs text-on-surface-variant font-medium leading-relaxed">
                Allow friends to discover what song you are currently sync playing
              </p>
            </div>
            
            <div
              onClick={() => setShowActivity(!showActivity)}
              className={`w-11 h-6 rounded-full p-0.5 transition-all duration-300 shrink-0 cursor-pointer ${
                showActivity ? "bg-primary shadow-[0_0_8px_#ddb7ff]" : "bg-[#353534]"
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-all duration-300 ${
                  showActivity ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Social parameters */}
      <section className="space-y-3">
        <h2 className="font-display text-xs font-bold text-on-surface-variant tracking-[0.1em] uppercase px-1">
          Social
        </h2>

        <div className="glass-card p-4 space-y-4 divide-y divide-white/5 border border-white/5">
          {/* Share Playlists Toggle */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5 max-w-[80%] text-left">
              <p className="font-bold text-sm text-white">Share Playlists</p>
              <p className="text-xs text-on-surface-variant font-medium leading-relaxed">
                Make your customized AI playlists visible to target followers automatically
              </p>
            </div>
            
            <div
              onClick={() => setSharePlaylists(!sharePlaylists)}
              className={`w-11 h-6 rounded-full p-0.5 transition-all duration-300 shrink-0 cursor-pointer ${
                sharePlaylists ? "bg-primary shadow-[0_0_8px_#ddb7ff]" : "bg-[#353534]"
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-all duration-300 ${
                  sharePlaylists ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </div>
          </div>

          {/* Discoverability Toggle */}
          <div className="flex items-center justify-between pt-4">
            <div className="space-y-0.5 max-w-[80%] text-left">
              <p className="font-bold text-sm text-white">Discoverability</p>
              <p className="text-xs text-on-surface-variant font-medium leading-relaxed">
                Allow other listeners to locate your profile by email address
              </p>
            </div>
            
            <div
              onClick={() => setDiscoverability(!discoverable)}
              className={`w-11 h-6 rounded-full p-0.5 transition-all duration-300 shrink-0 cursor-pointer ${
                discoverable ? "bg-primary shadow-[0_0_8px_#ddb7ff]" : "bg-[#353534]"
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-all duration-300 ${
                  discoverable ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Data & Ads parameter */}
      <section className="space-y-3">
        <h2 className="font-display text-xs font-bold text-on-surface-variant tracking-[0.1em] uppercase px-1">
          Data & Ads
        </h2>

        <div className="glass-card p-4 space-y-4 divide-y divide-white/5 border border-white/5">
          {/* Personalized Ads Toggle */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5 max-w-[80%] text-left">
              <p className="font-bold text-sm text-white">Personalized Ads</p>
              <p className="text-xs text-on-surface-variant font-medium leading-relaxed">
                Receive context algorithms matching listening habits with sponsored tags
              </p>
            </div>
            
            <div
              onClick={() => setPersonalizedAds(!personalizedAds)}
              className={`w-11 h-6 rounded-full p-0.5 transition-all duration-300 shrink-0 cursor-pointer ${
                personalizedAds ? "bg-primary shadow-[0_0_8px_#ddb7ff]" : "bg-[#353534]"
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-all duration-300 ${
                  personalizedAds ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </div>
          </div>

          {/* Clear Search History toggle */}
          <div className="flex items-center justify-between pt-4">
            <div className="space-y-0.5 max-w-[70%] text-left">
              <p className="font-bold text-sm text-white">Search History</p>
              <p className="text-xs text-on-surface-variant font-medium leading-relaxed">
                Expunge all indexed search prompts and vibe requests
              </p>
            </div>
            
            <button
              onClick={handleClearHistory}
              disabled={clearing}
              className="bg-neutral-800 hover:bg-primary hover:text-black hover:scale-102 active:scale-95 text-[#ddb7ff] font-display font-extrabold text-[11px] uppercase tracking-wider px-4 py-2 border border-primary/20 rounded-full transition-all shrink-0 cursor-pointer"
            >
              {clearedMsg}
            </button>
          </div>
        </div>
      </section>

      {/* Commitment trust footer */}
      <footer className="text-center pt-2 max-w-sm mx-auto leading-relaxed">
        <p className="text-xs text-on-surface-variant font-medium">
          VibeSync is committed to protecting your sonic identity. For more details, view our{" "}
          <span className="text-secondary font-semibold hover:text-primary cursor-pointer underline underline-offset-4">
            Privacy Policy
          </span>
          .
        </p>
      </footer>
    </div>
  );
}
