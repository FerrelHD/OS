import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useSystem } from '../../context/SystemContext';
import { useWindow } from '../../context/WindowContext';
import { useFileSystem } from '../../context/FileSystemContext';
import { APPS, getAppIcon } from '../../constants/appRegistry';
import { Search, Calculator, FileText, Folder, Laptop, Moon, Sun, Lock, RotateCcw, X, CornerDownLeft } from 'lucide-react';

// Safe math calculation helper
function safeCalculate(expr) {
  const clean = expr.trim();
  if (!clean || !/^[0-9+\-*/().\s^%]+$/.test(clean)) return null;
  // Must contain at least one digit and one operator to count as a math query
  if (!/\d/.test(clean) || !/[+\-*/^%]/.test(clean)) return null;

  try {
    const sanitized = clean.replace(/\^/g, '**');
    // Safe evaluation restricted to mathematical arithmetic
    // eslint-disable-next-line no-new-func
    const result = Function(`"use strict"; return (${sanitized});`)();
    if (typeof result === 'number' && !Number.isNaN(result) && Number.isFinite(result)) {
      return result;
    }
  } catch {
    return null;
  }
  return null;
}

export default function Spotlight() {
  const {
    isSpotlightOpen,
    setIsSpotlightOpen,
    setIsAboutMacOpen,
    setIsLocked,
    toggleTheme,
    theme,
  } = useSystem();

  const { openWindow } = useWindow();
  const { fs } = useFileSystem();

  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  // Auto focus input when opened
  useEffect(() => {
    if (isSpotlightOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isSpotlightOpen]);

  // Compute search results
  const results = useMemo(() => {
    const list = [];
    const trimmed = query.trim().toLowerCase();

    // 1. Math calculation result
    if (trimmed) {
      const calcResult = safeCalculate(trimmed);
      if (calcResult !== null) {
        list.push({
          id: 'calc-result',
          category: 'Calculation',
          title: `${calcResult}`,
          subtitle: `Math calculation for "${trimmed}" — Press Enter to copy`,
          icon: Calculator,
          action: () => {
            navigator.clipboard?.writeText(String(calcResult));
            openWindow('calculator');
            setIsSpotlightOpen(false);
          },
        });
      }
    }

    // 2. Applications
    APPS.forEach((app) => {
      if (!trimmed || app.name.toLowerCase().includes(trimmed) || app.id.toLowerCase().includes(trimmed)) {
        list.push({
          id: `app-${app.id}`,
          category: 'Applications',
          title: app.name,
          subtitle: `Application — Open ${app.name}`,
          icon: app.icon,
          isCustomIcon: true,
          action: () => {
            openWindow(app.id);
            setIsSpotlightOpen(false);
          },
        });
      }
    });

    // 3. System Actions
    const systemActions = [
      {
        id: 'action-about',
        name: 'About This Mac',
        subtitle: 'System Information & Specifications',
        icon: Laptop,
        action: () => {
          setIsAboutMacOpen(true);
          setIsSpotlightOpen(false);
        },
      },
      {
        id: 'action-lock',
        name: 'Lock Screen',
        subtitle: 'Secure and lock current session',
        icon: Lock,
        action: () => {
          setIsLocked(true);
          setIsSpotlightOpen(false);
        },
      },
      {
        id: 'action-theme',
        name: `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`,
        subtitle: 'Toggle macOS interface appearance',
        icon: theme === 'dark' ? Sun : Moon,
        action: () => {
          toggleTheme();
          setIsSpotlightOpen(false);
        },
      },
      {
        id: 'action-restart',
        name: 'Restart System',
        subtitle: 'Simulate system reboot',
        icon: RotateCcw,
        action: () => {
          window.location.reload();
        },
      },
    ];

    systemActions.forEach((act) => {
      if (!trimmed || act.name.toLowerCase().includes(trimmed) || act.subtitle.toLowerCase().includes(trimmed)) {
        list.push({
          id: act.id,
          category: 'System',
          title: act.name,
          subtitle: act.subtitle,
          icon: act.icon,
          action: act.action,
        });
      }
    });

    // 4. Virtual File System (documents & folders)
    if (fs) {
      Object.values(fs).forEach((node) => {
        if (node.id === 'root' || node.id === 'users' || node.id === 'admin') return;
        if (!trimmed || node.name.toLowerCase().includes(trimmed)) {
          list.push({
            id: `fs-${node.id}`,
            category: node.type === 'folder' ? 'Folders' : 'Documents',
            title: node.name,
            subtitle: `${node.type === 'folder' ? 'Folder' : node.fileType?.toUpperCase() || 'File'} • ${node.size || 'Virtual Node'}`,
            icon: node.type === 'folder' ? Folder : FileText,
            action: () => {
              if (node.type === 'file' && (node.name.endsWith('.txt') || node.name.endsWith('.md'))) {
                openWindow('notes');
              } else {
                openWindow('finder');
              }
              setIsSpotlightOpen(false);
            },
          });
        }
      });
    }

    return list.slice(0, 10);
  }, [query, theme, fs, openWindow, setIsAboutMacOpen, setIsLocked, setIsSpotlightOpen, toggleTheme]);

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (results.length > 0 ? (prev + 1) % results.length : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (results.length > 0 ? (prev - 1 + results.length) % results.length : 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (results[selectedIndex]) {
        results[selectedIndex].action();
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setIsSpotlightOpen(false);
    }
  };

  if (!isSpotlightOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-center items-start pt-[14vh] bg-black/25 backdrop-blur-sm animate-in fade-in duration-150"
      onPointerDown={(e) => {
        if (e.target === e.currentTarget) setIsSpotlightOpen(false);
      }}
    >
      <div className="w-[600px] max-w-[92vw] rounded-2xl glass-modal shadow-2xl border border-white/30 dark:border-white/10 overflow-hidden flex flex-col animate-in zoom-in-95 duration-150">
        {/* Search Header */}
        <div className="relative flex items-center px-4 py-3 border-b border-black/10 dark:border-white/10">
          <Search className="w-5 h-5 text-slate-400 dark:text-slate-300 mr-3 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Spotlight Search"
            className="w-full bg-transparent text-lg font-normal text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none"
            aria-label="Spotlight Search Input"
          />
          {query ? (
            <button
              onClick={() => {
                setQuery('');
                setSelectedIndex(0);
                inputRef.current?.focus();
              }}
              className="p-1 hover:bg-black/10 dark:hover:bg-white/10 rounded-full transition text-slate-500 dark:text-slate-400"
              title="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <span className="text-[11px] font-medium text-slate-400 bg-black/5 dark:bg-white/10 px-2 py-0.5 rounded">
              esc
            </span>
          )}
        </div>

        {/* Results List */}
        <div className="max-h-[380px] overflow-y-auto py-2 px-1.5 focus:outline-none custom-scrollbar">
          {results.length > 0 ? (
            results.map((item, index) => {
              const isSelected = index === selectedIndex;
              const IconComp = item.icon;

              return (
                <div
                  key={item.id}
                  onClick={() => item.action()}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`flex items-center px-3 py-2 rounded-xl cursor-pointer transition select-none ${
                    isSelected
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-800 dark:text-slate-200 hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && item.action()}
                >
                  <div className="w-9 h-9 flex items-center justify-center mr-3 flex-shrink-0">
                    {item.isCustomIcon ? (
                      <div className="w-7 h-7 drop-shadow-sm">
                        <IconComp />
                      </div>
                    ) : (
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                          isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200'
                        }`}
                      >
                        <IconComp className="w-4 h-4" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold truncate leading-tight">
                        {item.title}
                      </span>
                      <span
                        className={`text-[11px] ml-2 font-medium capitalize ${
                          isSelected ? 'text-white/80' : 'text-slate-400 dark:text-slate-400'
                        }`}
                      >
                        {item.category}
                      </span>
                    </div>
                    <p
                      className={`text-xs truncate leading-tight mt-0.5 ${
                        isSelected ? 'text-white/80' : 'text-slate-500 dark:text-slate-400'
                      }`}
                    >
                      {item.subtitle}
                    </p>
                  </div>

                  {isSelected && (
                    <div className="ml-2 flex items-center text-white/90">
                      <CornerDownLeft className="w-4 h-4" />
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="py-8 text-center text-slate-400 dark:text-slate-400 text-sm">
              No results found for "{query}"
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 border-t border-black/10 dark:border-white/10 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 bg-black/5 dark:bg-white/5">
          <span>Navigate with <strong className="font-semibold text-slate-700 dark:text-slate-300">↑ ↓</strong></span>
          <span>Open with <strong className="font-semibold text-slate-700 dark:text-slate-300">Return ↵</strong></span>
        </div>
      </div>
    </div>
  );
}
