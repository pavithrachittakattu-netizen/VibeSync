import React from "react";
import { User, Moon, ChevronRight, Link2, Sliders, Shield, BellRing, LogOut, Disc, Heart } from "lucide-react";
import { Track } from "../types";

interface ProfileViewProps {
  onNavigate: (view: string) => void;
  playlistCount: number;
}

export default function ProfileView({ onNavigate, playlistCount }: ProfileViewProps) {
  return (
    <div className="pb-32 px-5 space-y-7 max-w-screen-md mx-auto" id="profile-view-screen">
      {/* Profile Header section */}
      <section className="flex flex-col items-center text-center space-y-3 pt-4 select-none">
        <div className="relative">
          <div className="w-28 h-28 rounded-full p-[3px] bg-gradient-to-tr from-primary via-secondary to-tertiary shadow-[0_0_15px_rgba(200,100,250,0.15)]">
            <div className="w-full h-full rounded-full overflow-hidden border-[3px] border-[#0f0f0f]">
              <img
                alt="Alex Rivers Avatar"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCgkAF7YTgRxHesUishW0rcwacgiWp9_dV9ts9S0nyMfo1TjdI6wO6cBSFUwfd3y3rzuyFwe_DQUYXX5YJXrc5aX-6iIlA5hLNwg0E3OIewd_uGBAWhqCR9KexC3sXwMZLyeVG8l7TVhTF9BRevxp-UgikUGYcGWnMSviSa08ZQ8ixzbY-H_1vxCXllkpjuG5hZGRcbtn3sP68JH6ybTw40vQ6QliL3HFg6sHnP3idKsVwXep4a9rOvAaxHg-4Z_ulSF98teZAYSu5d"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 bg-primary text-black font-display font-extrabold text-[10px] uppercase px-3 py-1 rounded-full shadow-[0_0_10px_rgba(221,183,255,0.7)] tracking-wider">
            PRO
          </div>
        </div>
        <div className="space-y-0.5">
          <h2 className="font-display font-bold text-2xl text-white">Alex Rivers</h2>
          <p className="text-on-surface-variant text-xs font-bold uppercase tracking-widest text-[#988d9f]">
            Curating since 2022
          </p>
        </div>
      </section>

      {/* Stats Bento Cards */}
      <section className="grid grid-cols-2 gap-4">
        <div className="glass-card p-4 flex flex-col justify-center items-center text-center space-y-1.5 neon-glow-purple">
          <span className="text-secondary font-display font-extrabold text-2xl md:text-3xl">428</span>
          <span className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider text-[#cfc2d6]">
            Hours Listened
          </span>
        </div>
        
        <div className="glass-card p-4 flex flex-col justify-center items-center text-center space-y-1.5 neon-glow-purple">
          <span className="text-primary font-display font-extrabold text-2xl md:text-3xl">
            {1200 + playlistCount}
          </span>
          <span className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider text-[#cfc2d6]">
            Vibes Generated
          </span>
        </div>

        <div className="col-span-2 glass-card p-4 flex justify-between items-center px-6 border-l-4 border-l-tertiary">
          <span className="text-on-surface-variant font-bold text-xs uppercase tracking-wider text-[#cfc2d6]">
            Top Genre
          </span>
          <span className="text-tertiary font-display font-extrabold text-base md:text-lg">
            Deep House
          </span>
        </div>
      </section>

      {/* Listening Personality Card feature */}
      <section className="space-y-3">
        <h3 className="font-display font-bold text-lg text-white">
          Listening Personality
        </h3>
        
        <div className="glass-card p-5 relative overflow-hidden group select-none border border-white/5">
          <div className="absolute top-2 right-2 p-3 text-primary/10 group-hover:text-primary/20 group-hover:scale-110 transition-all duration-300">
            <Moon className="w-16 h-16 fill-current" />
          </div>
          
          <div className="relative z-10 space-y-2 max-w-[85%]">
            <h4 className="text-primary font-display font-extrabold text-xl">The Night Owl</h4>
            <p className="text-on-surface-variant text-sm leading-relaxed">
              Your energy peaks when the sun goes down. You thrive on deep basslines and atmospheric synths that define the midnight hour.
            </p>
          </div>

          <div className="mt-4 flex gap-2 relative z-10">
            <span className="bg-neutral-900 text-secondary font-bold text-[10px] tracking-wider uppercase px-3 py-1.5 rounded-full border border-secondary/20">
              ATMOSPHERIC
            </span>
            <span className="bg-neutral-900 text-primary font-bold text-[10px] tracking-wider uppercase px-3 py-1.5 rounded-full border border-primary/20">
              RHYTHMIC
            </span>
          </div>
        </div>
      </section>

      {/* Recent Activity lists */}
      <section className="space-y-3">
        <h3 className="font-display font-bold text-lg text-white">Recent Activity</h3>
        
        <div className="space-y-2.5">
          <div className="flex items-center gap-4 p-3 glass-card hover:bg-white/5 transition-all cursor-pointer group">
            <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 shadow-md">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDcG0pa3HKKVBFbQY_RJuqOZLE_ZgF33A3r6AJWm8Vmkgthq3PM77hcwZraMdtzZO6VPpcaUoHbSUSZ-3I0XphxcoMlqBdpdiO9yBH_vE7qw6_YG7NKAmTiqk5XQOGgyhXej8rgl3GRvgjdqg0GNTtKmwJnxZQuUDciLTn-NCRJIAEAbqgEBJdjvqEhQEMWnxr9dI5QzAwyR95XtKhAnqYLEhTTBORayCHYymzyQrIUWU0QrZd_ao91reGTw97czawFRmRO41361rM8"
                alt="Midnight Pulse"
                className="w-full h-full object-cover group-hover:scale-105 transition-all"
                referrerPolicy="no-referrer"
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <h5 className="text-white font-extrabold text-sm truncate group-hover:text-primary transition-colors">
                Midnight Pulse
              </h5>
              <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider">
                Generated 2h ago • 14 tracks
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-on-surface-variant group-hover:text-primary transition-transform group-hover:translate-x-1" />
          </div>

          <div className="flex items-center gap-4 p-3 glass-card hover:bg-white/5 transition-all cursor-pointer group border-l-2 border-l-primary/45">
            <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 shadow-md">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCqr1GDHX5P4Djy-SLO_fletyU2fa0A8Bk6mkV-BdesmXP7bcPX587cmKgXv-SfOsrz8puAwaVOFk5M4LffZ6nffrd9CTyNt_s5voeSXyuOMPrIH5kqQyzIOOKFDHscnSLJib26yYaDaEAdx-CtRuOViWxYwk3qgg8vx9PGmnukX0Ctb5fwiDypV2ktPDYyfCjMdrEUKHmAVE5pZK3Kh3fEVspHLZckW2-S6y_aV-1w11gJPBBaz7stQol0K26a-00kww7ctuALOdi2"
                alt="Cyber Drift"
                className="w-full h-full object-cover group-hover:scale-105 transition-all"
                referrerPolicy="no-referrer"
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <h5 className="text-white font-extrabold text-sm truncate group-hover:text-secondary transition-colors">
                Cyber Drift
              </h5>
              <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider">
                Generated yesterday • 22 tracks
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-on-surface-variant group-hover:text-secondary transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </section>

      {/* Settings list with clickable detailed navigation */}
      <section className="space-y-3">
        <h3 className="font-display font-bold text-lg text-white">Settings</h3>
        
        <div className="bg-[#1c1b1b] rounded-2xl divide-y divide-white/5 overflow-hidden">
          <button
            onClick={() => onNavigate("services")}
            className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-all text-left group cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <Link2 className="w-5 h-5 text-secondary group-hover:scale-110 transition-all" />
              <span className="text-sm font-bold text-white group-hover:text-secondary transition-colors">Connected Services</span>
            </div>
            <ChevronRight className="w-5 h-5 text-on-surface-variant group-hover:text-white" />
          </button>
          
          <button
            onClick={() => onNavigate("quality")}
            className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-all text-left group cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <Sliders className="w-5 h-5 text-primary group-hover:scale-110 transition-all" />
              <span className="text-sm font-bold text-white group-hover:text-primary transition-colors">Audio Quality</span>
            </div>
            <span className="text-primary font-bold text-xs bg-primary/10 px-2 py-0.5 rounded mr-1">Lossless</span>
          </button>

          <button
            onClick={() => onNavigate("privacy")}
            className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-all text-left group cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <Shield className="w-5 h-5 text-tertiary group-hover:scale-110 transition-all" />
              <span className="text-sm font-bold text-white group-hover:text-tertiary transition-colors">Privacy</span>
            </div>
            <ChevronRight className="w-5 h-5 text-on-surface-variant group-hover:text-white" />
          </button>

          <button
            onClick={() => onNavigate("notifications")}
            className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-all text-left group cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <BellRing className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-all" />
              <span className="text-sm font-bold text-white group-hover:text-purple-400 transition-colors">Notifications</span>
            </div>
            <ChevronRight className="w-5 h-5 text-on-surface-variant group-hover:text-white" />
          </button>
        </div>
      </section>

      {/* Log Out button and Version tracker */}
      <section className="pt-2 select-none">
        <button className="w-full py-4 rounded-2xl bg-neutral-900 hover:bg-red-500/10 border border-red-500/20 text-red-400 font-display font-extrabold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 shadow">
          <LogOut className="w-4 h-4" />
          Log Out
        </button>
        <p className="text-center text-on-surface-variant/30 text-[9px] uppercase tracking-[0.25em] mt-6">
          VIBESYNC V2.4.0 • MIDNIGHT EDITION
        </p>
      </section>
    </div>
  );
}
