import React, { useState, useEffect } from "react";
import { Home, Sparkles, Music, User, Bell, Radio } from "lucide-react";
import { Track, Playlist, VibeHistoryItem, AppNotification } from "./types";
import HomeDashboard from "./components/HomeDashboard";
import GenerateVibe from "./components/GenerateVibe";
import LibraryView from "./components/LibraryView";
import ProfileView from "./components/ProfileView";
import MusicPlayer from "./components/MusicPlayer";
import ConnectedServices from "./components/ConnectedServices";
import AudioQualitySettings from "./components/AudioQualitySettings";
import PrivacySettings from "./components/PrivacySettings";
import NotificationSettings from "./components/NotificationSettings";

export default function App() {
  const [view, setView] = useState<string>("home"); // home, generate, library, profile, services, quality, privacy, notifications
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playQueue, setPlayQueue] = useState<Track[]>([]);
  const [playProgress, setPlayProgress] = useState<number>(0);
  const [trackDuration, setTrackDuration] = useState<number>(180);
  const [fullscreenPlayer, setFullscreenPlayer] = useState<boolean>(false);

  // App states
  const [vibeHistory, setVibeHistory] = useState<VibeHistoryItem[]>([]);
  const [notifications, setNotifications] = useState<AppNotification[]>([
    {
      id: "notif-1",
      title: "Midnight City Vibes",
      description: "Your 'Night Drive' playlist just got 5 new tracks from artists you follow.",
      time: "2m ago",
      category: "new_music",
      read: false,
    },
    {
      id: "notif-2",
      title: "Elena Rae liked your vibe",
      description: "Your Synthesized Tokyo Soundscapes creation is trending in Shinjuku circles!",
      time: "45m ago",
      category: "social",
      read: false,
    },
    {
      id: "notif-3",
      title: "New follower synced",
      description: "Marcus Digital started following your dynamic musical curation.",
      time: "2h ago",
      category: "social",
      read: true,
    },
    {
      id: "notif-4",
      title: "New VibeCheck is ready",
      description: "Your customized AI sonic profile has finished processing. Discover your trends.",
      time: "5h ago",
      category: "system",
      read: false,
      actionText: "View VibeCheck",
    }
  ]);

  // Initial song configuration so the user has beautiful instant playback controls!
  useEffect(() => {
    const defaultTrackValue: Track = {
      id: "recent-1",
      title: "Ambient Echoes",
      artist: "VibeSync AI",
      duration: "04:30",
      coverUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuB0B_OY_9tdrVzfccCugtMc7_CXOZy6I02IKOy1Qp3QBr6Bwcp8U68u1dPzQt20959h175qDxCRcBkcEAc0-ftqd-PDzhzkv5IoQamp9FxH4ifLiMTlrjAvBZPkqtI0mKg_XKJzasCM8RkCNOGH34jZO6zbYDSaaxuHsvd4btQJfYkKxVdsdi5aW5OyP5EphqoKIrV_fXyh_ARnH8d1_OBmydm3m3JI0QFYmdA6_4m4H2GVmlyXfL-WyJJZDi95qr2EvT2bCC_oofqY",
      genre: "Ambient Chill",
      bpm: 75,
      lyrics: [
        "Take a breath and feel the night...",
        "Ambient shadows in indigo light...",
        "Waves of synthetic pulses drift along...",
        "Joining the synths in a beautiful song...",
        "Fading like stars at the breakdown sign."
      ]
    };
    setCurrentTrack(defaultTrackValue);
    setPlayQueue([defaultTrackValue]);
    setTrackDuration(parseDuration(defaultTrackValue.duration));
  }, []);

  const parseDuration = (dur: string) => {
    if (!dur) return 180;
    const parts = dur.split(":");
    if (parts.length === 2) {
      return parseInt(parts[0]) * 60 + parseInt(parts[1]);
    }
    return 180;
  };

  // Music playback interval clock ticker loops
  useEffect(() => {
    let interval: any = null;
    if (isPlaying && currentTrack) {
      interval = setInterval(() => {
        setPlayProgress((prev) => {
          if (prev >= trackDuration) {
            handleNextTrack();
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (interval) clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentTrack, trackDuration, playQueue]);

  const handlePlayTrack = (track: Track, queue: Track[] = []) => {
    setCurrentTrack(track);
    setIsPlaying(true);
    setPlayProgress(0);
    setTrackDuration(parseDuration(track.duration));
    if (queue && queue.length > 0) {
      setPlayQueue(queue);
    } else {
      setPlayQueue([track]);
    }
  };

  const handleNextTrack = () => {
    if (playQueue.length === 0) return;
    const currentIndex = playQueue.findIndex((t) => t.id === currentTrack?.id);
    const nextIndex = currentIndex === -1 || currentIndex === playQueue.length - 1 ? 0 : currentIndex + 1;
    const nextTrack = playQueue[nextIndex];
    
    setCurrentTrack(nextTrack);
    setPlayProgress(0);
    setTrackDuration(parseDuration(nextTrack.duration));
  };

  const handlePrevTrack = () => {
    if (playQueue.length === 0) return;
    const currentIndex = playQueue.findIndex((t) => t.id === currentTrack?.id);
    const prevIndex = currentIndex <= 0 ? playQueue.length - 1 : currentIndex - 1;
    const prevTrack = playQueue[prevIndex];
    
    setCurrentTrack(prevTrack);
    setPlayProgress(0);
    setTrackDuration(parseDuration(prevTrack.duration));
  };

  const handleSeek = (secs: number) => {
    setPlayProgress(Math.floor(secs));
  };

  // Add generation run item to library list history
  const handleAddHistory = (item: VibeHistoryItem) => {
    setVibeHistory((prev) => [item, ...prev]);
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notif) => ({ ...notif, read: true }))
    );
  };

  // Notifications bell counters unread list
  const unreadCount = notifications.filter((n) => !n.read).length;

  // View state router
  const renderView = () => {
    switch (view) {
      case "home":
        return (
          <HomeDashboard
            onNavigate={setView}
            onPlayTrack={handlePlayTrack}
            currentTrack={currentTrack}
            isPlaying={isPlaying}
            notificationCount={unreadCount}
          />
        );
      case "generate":
        return (
          <GenerateVibe
            onPlayTrack={handlePlayTrack}
            onAddHistory={handleAddHistory}
            onNavigate={setView}
          />
        );
      case "library":
        return (
          <LibraryView
            onPlayTrack={handlePlayTrack}
            vibeHistory={vibeHistory}
          />
        );
      case "profile":
        return (
          <ProfileView
            onNavigate={setView}
            playlistCount={vibeHistory.length}
          />
        );
      case "services":
        return <ConnectedServices onBack={() => setView("profile")} />;
      case "quality":
        return <AudioQualitySettings onBack={() => setView("profile")} />;
      case "privacy":
        return <PrivacySettings onBack={() => setView("profile")} />;
      case "notifications":
        return (
          <NotificationSettings
            notifications={notifications}
            onMarkAllAsRead={handleMarkAllAsRead}
            onBack={() => setView("home")}
          />
        );
      default:
        return (
          <HomeDashboard
            onNavigate={setView}
            onPlayTrack={handlePlayTrack}
            currentTrack={currentTrack}
            isPlaying={isPlaying}
            notificationCount={unreadCount}
          />
        );
    }
  };

  const isSettingsSubView = ["services", "quality", "privacy"].includes(view);

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-[#e5e2e1] pb-24 relative select-none" id="applet-container">
      {/* Visual Top Glow Ambience */}
      <div className="absolute top-0 right-0 left-0 h-48 bg-gradient-to-b from-primary/10 via-transparent to-transparent pointer-events-none z-0" />

      {/* Primary Global Navigation Header Applet Bar (Only shown on top root view modes) */}
      {!isSettingsSubView && view !== "notifications" && (
        <header className="flex justify-between items-center px-6 py-4 border-b border-white/5 relative z-10 max-w-screen-md mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-black font-semibold shadow-[0_0_15px_rgba(221,183,255,0.3)] animate-pulse">
              <Radio className="w-5 h-5" />
            </div>
            <h1 className="font-display font-black text-2xl text-white tracking-tight leading-none">
              VibeSync
            </h1>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Bell trigger action for Screen 6 */}
            <button
              onClick={() => setView("notifications")}
              className="relative p-2 rounded-xl bg-[#1c1b1b] hover:bg-[#2c2b2b] text-on-surface-variant hover:text-primary cursor-pointer border border-white/5 shadow-inner transition-colors"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 text-[10px] font-bold text-[#0f0f0f] bg-primary rounded-full flex items-center justify-center border-2 border-[#0f0f0f] shadow animate-bounce">
                  {unreadCount}
                </span>
              )}
            </button>
          </div>
        </header>
      )}

      {/* Main Container screen content */}
      <div className="relative z-10">{renderView()}</div>

      {/* Active Music Player Mini Bar Panel, clicks expands to fullscreen lyrics player */}
      {currentTrack && view !== "now_playing" && (
        <MusicPlayer
          currentTrack={currentTrack}
          isPlaying={isPlaying}
          onTogglePlay={() => setIsPlaying(!isPlaying)}
          onNextTrack={handleNextTrack}
          onPrevTrack={handlePrevTrack}
          duration={trackDuration}
          progress={playProgress}
          onSeek={handleSeek}
          fullscreen={fullscreenPlayer}
          onToggleFullscreen={setFullscreenPlayer}
        />
      )}

      {/* Bottom Sticky Navigation Hub bar */}
      <nav className="fixed bottom-0 inset-x-0 bg-black/60 backdrop-blur-xl border-t border-white/5 py-3.5 z-40 max-w-sm mx-auto rounded-t-3xl shadow-[0_-5px_30px_rgba(0,0,0,0.8)]">
        <div className="flex justify-around items-center px-4">
          <button
            onClick={() => setView("home")}
            className={`flex flex-col items-center gap-1 cursor-pointer transition-colors ${
              view === "home" ? "text-primary" : "text-on-surface-variant/50 hover:text-white"
            }`}
          >
            <Home className="w-5.5 h-5.5" />
            <span className="text-[9px] font-bold tracking-wider uppercase">Home</span>
          </button>

          <button
            onClick={() => setView("generate")}
            className={`flex flex-col items-center gap-1 cursor-pointer transition-colors ${
              view === "generate" ? "text-primary" : "text-on-surface-variant/50 hover:text-white"
            }`}
          >
            <Sparkles className="w-5.5 h-5.5" />
            <span className="text-[9px] font-bold tracking-wider uppercase">Generate</span>
          </button>

          <button
            onClick={() => setView("library")}
            className={`flex flex-col items-center gap-1 cursor-pointer transition-colors ${
              view === "library" ? "text-primary" : "text-on-surface-variant/50 hover:text-white"
            }`}
          >
            <Music className="w-5.5 h-5.5" />
            <span className="text-[9px] font-bold tracking-wider uppercase">Library</span>
          </button>

          <button
            onClick={() => setView("profile")}
            className={`flex flex-col items-center gap-1 cursor-pointer transition-colors ${
              isSettingsSubView || view === "profile" ? "text-primary" : "text-on-surface-variant/50 hover:text-white"
            }`}
          >
            <User className="w-5.5 h-5.5" />
            <span className="text-[9px] font-bold tracking-wider uppercase">Profile</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
