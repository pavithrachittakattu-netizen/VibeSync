export interface Track {
  id: string;
  title: string;
  artist: string;
  duration: string; // MM:SS
  coverUrl: string;
  lyrics?: string[];
  genre?: string;
  bpm?: number;
}

export interface Playlist {
  id: string;
  title: string;
  description: string;
  trackCount: number;
  tracks: Track[];
  coverUrl: string;
  createdTime: string;
  frequency?: string;
}

export interface VibeHistoryItem {
  id: string;
  vibePrompt: string;
  title: string;
  category: string; // e.g. "Late Night Focus", "Summer Energy"
  time: string;
  tracks: Track[];
  coverUrl: string;
}

export interface AppNotification {
  id: string;
  title: string;
  description: string;
  time: string;
  category: 'new_music' | 'social' | 'system';
  read: boolean;
  actionText?: string;
}
