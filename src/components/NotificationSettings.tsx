import React, { useState } from "react";
import { ArrowLeft, Bell, Music, CheckCheck, Users, Info, Cpu, Sparkles } from "lucide-react";
import { AppNotification } from "../types";

interface NotificationSettingsProps {
  notifications: AppNotification[];
  onMarkAllAsRead: () => void;
  onBack: () => void;
}

export default function NotificationSettings({
  notifications,
  onMarkAllAsRead,
  onBack,
}: NotificationSettingsProps) {
  const [filter, setFilter] = useState<string>("All"); // "All" | "New Music" | "Social" | "System"

  const filterChips = ["All", "New Music", "Social", "System"];

  // Filter list
  const filteredNotifications = notifications.filter((notif) => {
    if (filter === "All") return true;
    if (filter === "New Music" && notif.category === "new_music") return true;
    if (filter === "Social" && notif.category === "social") return true;
    if (filter === "System" && notif.category === "system") return true;
    return false;
  });

  return (
    <div className="pb-32 px-5 space-y-6 max-w-screen-md mx-auto" id="notification-screen">
      {/* Top Header Block */}
      <div className="flex items-center justify-between pt-4 border-b border-white/5 pb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-1 px-2 rounded-xl text-primary hover:bg-white/5 active:scale-95 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="font-display font-bold text-xl text-white">Notifications</h2>
        </div>

        <div className="w-9 h-9 rounded-full overflow-hidden border border-white/10 shrink-0">
          <img
            alt="Alex Rivers Avatar"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCgkAF7YTgRxHesUishW0rcwacgiWp9_dV9ts9S0nyMfo1TjdI6wO6cBSFUwfd3y3rzuyFwe_DQUYXX5YJXrc5aX-6iIlA5hLNwg0E3OIewd_uGBAWhqCR9KexC3sXwMZLyeVG8l7TVhTF9BRevxp-UgikUGYcGWnMSviSa08ZQ8ixzbY-H_1vxCXllkpjuG5hZGRcbtn3sP68JH6ybTw40vQ6QliL3HFg6sHnP3idKsVwXep4a9rOvAaxHg-4Z_ulSF98teZAYSu5d"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      {/* Screen Subtitle Header & Mark all action */}
      <div className="flex justify-between items-end">
        <div className="text-left">
          <p className="text-[10px] font-bold text-secondary uppercase tracking-widest leading-none mb-1">
            Activity
          </p>
          <h3 className="font-display font-bold text-2xl text-white">Inbox Updates</h3>
        </div>
        
        <button
          onClick={onMarkAllAsRead}
          className="text-xs font-bold text-primary underline underline-offset-4 hover:text-secondary cursor-pointer select-none transition-colors"
        >
          Mark all as read
        </button>
      </div>

      {/* Category Horizontal Filter Chips */}
      <div className="flex gap-2 overflow-x-auto hide-scrollbar -mx-5 px-5 py-1">
        {filterChips.map((chip) => (
          <button
            key={chip}
            onClick={() => setFilter(chip)}
            className={`px-4 py-1.5 rounded-full font-bold text-xs whitespace-nowrap transition-all duration-300 border cursor-pointer ${
              filter === chip
                ? "bg-primary border-primary text-black scale-[1.03] shadow"
                : "bg-neutral-900 border-white/5 text-on-surface-variant hover:border-primary/50"
            }`}
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Notification List organized by segments */}
      <div className="space-y-6 text-left">
        {filteredNotifications.length === 0 ? (
          <div className="glass-card p-6 text-center text-sm text-on-surface-variant">
            No notifications in this category.
          </div>
        ) : (
          <div className="space-y-4">
            {filteredNotifications.map((notif) => {
              // Decide category color & icons
              let iconElement = <Bell className="w-5 h-5 text-primary" />;
              let sideBarColor = "bg-primary";
              if (notif.category === "new_music") {
                iconElement = <Music className="w-5 h-5 text-primary" />;
                sideBarColor = "bg-primary";
              } else if (notif.category === "social") {
                iconElement = <Users className="w-5 h-5 text-secondary" />;
                sideBarColor = "bg-secondary";
              } else if (notif.category === "system") {
                iconElement = <Cpu className="w-5 h-5 text-tertiary" />;
                sideBarColor = "bg-tertiary";
              }

              return (
                <div
                  key={notif.id}
                  className={`glass-card p-4 flex gap-4 relative overflow-hidden transition-all duration-300 border ${
                    !notif.read ? "border-white/10" : "border-white/5 opacity-60"
                  }`}
                >
                  {/* Left relative highlight bar for unread states */}
                  {!notif.read && (
                    <div className={`absolute left-0 top-0 bottom-0 w-1 ${sideBarColor}`} />
                  )}

                  {/* Left Circle Icon avatar */}
                  <div className={`w-11 h-11 rounded-full shrink-0 flex items-center justify-center p-2.5 bg-neutral-900`}>
                    {iconElement}
                  </div>

                  {/* Body Content */}
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="font-display font-extrabold text-sm md:text-base text-white truncate">
                        {notif.title}
                      </h4>
                      <span className="text-[10px] font-bold text-on-surface-variant/40 shrink-0">
                        {notif.time}
                      </span>
                    </div>
                    <p className="text-xs text-on-surface-variant font-medium leading-relaxed">
                      {notif.description}
                    </p>
                    {/* Optional interactive action button */}
                    {notif.actionText && (
                      <button className="mt-3 px-4 py-1.5 bg-gradient-to-r from-primary to-secondary text-neutral-950 font-display font-extrabold text-[10px] rounded-lg cursor-pointer flex items-center gap-1 uppercase tracking-wider">
                        <Sparkles className="w-3 h-3 fill-current shrink-0" />
                        {notif.actionText}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
