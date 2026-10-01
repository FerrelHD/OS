import React from 'react';

// Apple logo mark
export const AppleLogoIcon = ({ className = "w-4 h-4", fill = "currentColor" }) => (
  <svg className={className} viewBox="0 0 170 170" fill={fill}>
    <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.58-7.81-11.65-14.32-5.74-9.14-10.36-19.64-13.86-31.5-3.5-11.87-5.26-22.9-5.26-33.1 0-14.15 3.5-26.04 10.5-35.67 7-9.63 16.03-14.52 27.08-14.67 4.58 0 9.8 1.16 15.67 3.49 5.86 2.32 9.61 3.5 11.23 3.5 1.41 0 5.48-1.29 12.2-3.86 6.72-2.58 12.18-3.71 16.38-3.4 12.22.95 21.84 5.3 28.87 13.06-10.74 6.53-15.99 15.53-15.75 27 .24 9.14 3.73 16.85 10.47 23.14 6.74 6.29 14.86 9.87 24.36 10.74-2.22 6.84-5.02 14.07-8.4 21.68zM119.22 31.84c0-7.37 2.65-14.28 7.96-20.73 5.31-6.45 11.82-10.45 19.53-12 1.07 8.04-1.4 15.42-7.41 22.15-6.01 6.73-12.71 10.76-20.08 10.58z" />
  </svg>
);

// Finder Icon
export const FinderIcon = ({ className = "w-full h-full" }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none">
    <defs>
      <linearGradient id="finder-bg" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
        <stop stopColor="#32B5FE" />
        <stop offset="1" stopColor="#0B6DFD" />
      </linearGradient>
      <linearGradient id="finder-face" x1="20" y1="20" x2="80" y2="80" gradientUnits="userSpaceOnUse">
        <stop stopColor="#C9EDFE" />
        <stop offset="1" stopColor="#81C8FE" />
      </linearGradient>
    </defs>
    <rect width="100" height="100" rx="22" fill="url(#finder-bg)" />
    <path d="M50 20 C32 20 22 32 22 50 C22 68 32 80 50 80 C68 80 78 68 78 50 C78 32 68 20 50 20 Z" fill="url(#finder-face)" />
    {/* Blue Smile line & Eyes */}
    <path d="M50 20 L50 56 C50 62 45 66 38 66 L25 66" stroke="#043282" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <path d="M50 56 C50 62 55 66 62 66 L75 66" stroke="#043282" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <circle cx="36" cy="42" r="4.5" fill="#043282" />
    <circle cx="64" cy="42" r="4.5" fill="#043282" />
  </svg>
);

// Safari Icon
export const SafariIcon = ({ className = "w-full h-full" }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none">
    <defs>
      <linearGradient id="safari-bg" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFFFFF" />
        <stop offset="1" stopColor="#E2E8F0" />
      </linearGradient>
      <linearGradient id="safari-blue" x1="10" y1="10" x2="90" y2="90" gradientUnits="userSpaceOnUse">
        <stop stopColor="#38BDF8" />
        <stop offset="1" stopColor="#0284C7" />
      </linearGradient>
    </defs>
    <rect width="100" height="100" rx="22" fill="url(#safari-bg)" />
    <circle cx="50" cy="50" r="40" fill="url(#safari-blue)" />
    {/* Compass ticks */}
    <circle cx="50" cy="50" r="33" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeDasharray="2 6" />
    {/* Needle */}
    <g transform="rotate(45 50 50)">
      <polygon points="50,15 56,50 44,50" fill="#EF4444" />
      <polygon points="50,85 56,50 44,50" fill="#F8FAFC" />
      <circle cx="50" cy="50" r="3.5" fill="#FFFFFF" />
    </g>
  </svg>
);

// Google Gemini Sparkle Icon
export const GeminiIcon = ({ className = "w-full h-full" }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none">
    <defs>
      <linearGradient id="gemini-bg" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
        <stop stopColor="#0F172A" />
        <stop offset="1" stopColor="#1E293B" />
      </linearGradient>
      <linearGradient id="gemini-sparkle" x1="20" y1="20" x2="80" y2="80" gradientUnits="userSpaceOnUse">
        <stop stopColor="#4E82EE" />
        <stop offset="0.3" stopColor="#7F5AF0" />
        <stop offset="0.6" stopColor="#D946EF" />
        <stop offset="1" stopColor="#F59E0B" />
      </linearGradient>
    </defs>
    <rect width="100" height="100" rx="22" fill="url(#gemini-bg)" />
    <path
      d="M50 15 C50 34.33 34.33 50 15 50 C34.33 50 50 65.67 50 85 C50 65.67 65.67 50 85 50 C65.67 50 50 34.33 50 15 Z"
      fill="url(#gemini-sparkle)"
    />
    <circle cx="50" cy="50" r="6" fill="#FFFFFF" opacity="0.8" />
  </svg>
);

// Apple Music Icon
export const MusicIcon = ({ className = "w-full h-full" }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none">
    <defs>
      <linearGradient id="music-bg" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FC3C44" />
        <stop offset="1" stopColor="#FA2D48" />
      </linearGradient>
    </defs>
    <rect width="100" height="100" rx="22" fill="url(#music-bg)" />
    <path
      d="M66 26 L42 32 C39 33 37 35 37 38 L37 63 C35 61 31 60 28 61 C23 62 19 66 19 71 C19 76 23 80 28 80 C34 80 38 75 38 70 L38 46 L64 40 L64 57 C62 55 58 54 55 55 C50 56 46 60 46 65 C46 70 50 74 55 74 C61 74 65 69 65 64 L65 30 C65 27 67 26 66 26 Z"
      fill="#FFFFFF"
    />
  </svg>
);

// Photos Icon
export const PhotosIcon = ({ className = "w-full h-full" }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none">
    <rect width="100" height="100" rx="22" fill="#FFFFFF" />
    <g transform="translate(50, 50)">
      <ellipse cx="0" cy="-20" rx="9" ry="17" fill="#FBBF24" opacity="0.9" />
      <ellipse cx="14" cy="-14" rx="9" ry="17" transform="rotate(45)" fill="#F97316" opacity="0.9" />
      <ellipse cx="20" cy="0" rx="9" ry="17" transform="rotate(90)" fill="#EF4444" opacity="0.9" />
      <ellipse cx="14" cy="14" rx="9" ry="17" transform="rotate(135)" fill="#EC4899" opacity="0.9" />
      <ellipse cx="0" cy="20" rx="9" ry="17" transform="rotate(180)" fill="#8B5CF6" opacity="0.9" />
      <ellipse cx="-14" cy="14" rx="9" ry="17" transform="rotate(225)" fill="#3B82F6" opacity="0.9" />
      <ellipse cx="-20" cy="0" rx="9" ry="17" transform="rotate(270)" fill="#10B981" opacity="0.9" />
      <ellipse cx="-14" cy="-14" rx="9" ry="17" transform="rotate(315)" fill="#84CC16" opacity="0.9" />
    </g>
  </svg>
);

// Messages Icon
export const MessagesIcon = ({ className = "w-full h-full" }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none">
    <defs>
      <linearGradient id="msg-bg" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
        <stop stopColor="#34D399" />
        <stop offset="1" stopColor="#059669" />
      </linearGradient>
    </defs>
    <rect width="100" height="100" rx="22" fill="url(#msg-bg)" />
    <path
      d="M75 48 C75 34 63.8 23 50 23 C36.2 23 25 34 25 48 C25 56 29 63 35 68 C35 72 33 76 30 79 C35 79 40 76 43 73 C45.2 73.7 47.6 74 50 74 C63.8 74 75 63 75 48 Z"
      fill="#FFFFFF"
    />
  </svg>
);

// Notes Icon
export const NotesIcon = ({ className = "w-full h-full" }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none">
    <rect width="100" height="100" rx="22" fill="#FEF08A" />
    <rect x="0" y="0" width="100" height="24" rx="22" fill="#EAB308" />
    <rect x="0" y="14" width="100" height="10" fill="#EAB308" />
    {/* Ruled lines */}
    <line x1="16" y1="40" x2="84" y2="40" stroke="#CBD5E1" strokeWidth="2" />
    <line x1="16" y1="56" x2="84" y2="56" stroke="#CBD5E1" strokeWidth="2" />
    <line x1="16" y1="72" x2="84" y2="72" stroke="#CBD5E1" strokeWidth="2" />
  </svg>
);

// Terminal Icon
export const TerminalIcon = ({ className = "w-full h-full" }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none">
    <rect width="100" height="100" rx="22" fill="#0F172A" />
    <rect x="2" y="2" width="96" height="96" rx="20" stroke="#334155" strokeWidth="2" />
    {/* Prompt symbols */}
    <path d="M24 32 L40 46 L24 60" stroke="#38BDF8" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="48" y1="62" x2="74" y2="62" stroke="#4ADE80" strokeWidth="6" strokeLinecap="round" />
  </svg>
);

// Calculator Icon
export const CalculatorIcon = ({ className = "w-full h-full" }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none">
    <rect width="100" height="100" rx="22" fill="#334155" />
    {/* Buttons */}
    <rect x="18" y="16" width="64" height="20" rx="6" fill="#1E293B" />
    <circle cx="28" cy="50" r="8" fill="#475569" />
    <circle cx="50" cy="50" r="8" fill="#475569" />
    <circle cx="72" cy="50" r="8" fill="#F59E0B" />
    <circle cx="28" cy="72" r="8" fill="#64748B" />
    <circle cx="50" cy="72" r="8" fill="#64748B" />
    <circle cx="72" cy="72" r="8" fill="#F59E0B" />
  </svg>
);

// Settings Icon
export const SettingsIcon = ({ className = "w-full h-full" }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none">
    <rect width="100" height="100" rx="22" fill="#64748B" />
    <circle cx="50" cy="50" r="30" fill="#94A3B8" />
    <circle cx="50" cy="50" r="14" fill="#64748B" />
  </svg>
);
