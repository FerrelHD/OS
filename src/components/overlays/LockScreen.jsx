import React, { useState, useEffect, useRef } from 'react';
import { useSystem } from '../../context/SystemContext';
import { ArrowRight, User, KeyRound, RotateCcw } from 'lucide-react';

export default function LockScreen() {
  const { isLocked, setIsLocked, currentWallpaper } = useSystem();
  const [password, setPassword] = useState('');
  const [timeStr, setTimeStr] = useState('');
  const [dateStr, setDateStr] = useState('');
  const [isUnlocking, setIsUnlocking] = useState(false);
  const inputRef = useRef(null);

  // Time & Date update
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
      );
      setDateStr(
        now.toLocaleDateString('en-US', {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Auto focus input on lock
  useEffect(() => {
    if (isLocked) {
      setPassword('');
      setIsUnlocking(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isLocked]);

  const handleUnlock = (e) => {
    if (e) e.preventDefault();
    setIsUnlocking(true);
    setTimeout(() => {
      setIsLocked(false);
      setIsUnlocking(false);
      setPassword('');
    }, 250);
  };

  if (!isLocked) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col justify-between items-center py-16 px-6 select-none transition-all duration-300 ${
        isUnlocking ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
      style={{
        background: currentWallpaper.gradient,
      }}
    >
      {/* Blurred overlay backdrop */}
      <div className="absolute inset-0 bg-black/35 backdrop-blur-2xl -z-10" />

      {/* Top Header: Big Clock & Date */}
      <div className="flex flex-col items-center text-center mt-6 text-white drop-shadow-lg">
        <h1 className="text-7xl sm:text-8xl font-light tracking-tighter font-sans">
          {timeStr}
        </h1>
        <p className="text-base sm:text-lg font-medium opacity-90 mt-2">
          {dateStr}
        </p>
      </div>

      {/* Middle Section: User Avatar & Password Login */}
      <div className="flex flex-col items-center">
        {/* Avatar Circle */}
        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-400 p-1 shadow-2xl border border-white/30 flex items-center justify-center mb-3">
          <div className="w-full h-full rounded-full bg-slate-900/40 flex items-center justify-center text-white">
            <User className="w-12 h-12" />
          </div>
        </div>

        <h2 className="text-xl font-semibold text-white drop-shadow mb-4">
          Ferrel
        </h2>

        {/* Password Form */}
        <form onSubmit={handleUnlock} className="relative flex items-center w-64">
          <KeyRound className="w-4 h-4 absolute left-3 text-white/50" />
          <input
            ref={inputRef}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
            className="w-full py-2 pl-9 pr-10 rounded-full bg-white/20 hover:bg-white/25 focus:bg-white/30 border border-white/30 focus:border-white/60 text-white placeholder-white/50 text-sm focus:outline-none transition shadow-inner"
            aria-label="Lock screen password input"
          />
          <button
            type="submit"
            className="absolute right-1.5 p-1 rounded-full bg-white/30 hover:bg-white/50 text-white transition active:scale-95"
            title="Unlock Session"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="text-[11px] text-white/60 mt-2.5 font-medium">
          Press Return or Click Unlock to enter
        </p>
      </div>

      {/* Bottom Actions: Cancel / Sleep / Restart */}
      <div className="flex items-center space-x-6 text-xs text-white/70">
        <button
          onClick={handleUnlock}
          className="hover:text-white transition px-3 py-1 rounded-md bg-white/10 hover:bg-white/20 border border-white/10"
        >
          Quick Unlock
        </button>
        <button
          onClick={() => window.location.reload()}
          className="flex items-center space-x-1.5 hover:text-white transition px-3 py-1 rounded-md bg-white/10 hover:bg-white/20 border border-white/10"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Restart</span>
        </button>
      </div>
    </div>
  );
}
