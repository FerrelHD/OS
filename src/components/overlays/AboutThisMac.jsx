import React, { useState } from 'react';
import { useSystem } from '../../context/SystemContext';
import { AppleLogoIcon } from '../common/icons/AppIcons';
import { Laptop, HardDrive, CheckCircle2, ChevronRight, X } from 'lucide-react';

export default function AboutThisMac() {
  const { isAboutMacOpen, setIsAboutMacOpen } = useSystem();
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'storage'
  const [showUpdateToast, setShowUpdateToast] = useState(false);

  if (!isAboutMacOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 backdrop-blur-sm animate-in fade-in duration-150 select-none"
      onPointerDown={(e) => {
        if (e.target === e.currentTarget) setIsAboutMacOpen(false);
      }}
    >
      <div className="w-[520px] max-w-[92vw] rounded-2xl glass-modal shadow-2xl border border-white/30 dark:border-white/10 overflow-hidden flex flex-col text-slate-800 dark:text-slate-100 animate-in zoom-in-95 duration-150">
        {/* Titlebar with Traffic Lights */}
        <div className="relative h-8 px-3 flex items-center justify-between border-b border-black/10 dark:border-white/10">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsAboutMacOpen(false)}
              className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E] hover:opacity-80 transition flex items-center justify-center group"
              title="Close"
            >
              <X className="w-2 h-2 text-black/60 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123] opacity-60" />
            <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29] opacity-60" />
          </div>
          <span className="text-[12px] font-semibold text-slate-600 dark:text-slate-400">
            About This Mac
          </span>
          <div className="w-12" /> {/* Balance spacer */}
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center border-b border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 py-1.5 px-4 text-xs font-medium">
          <div className="inline-flex rounded-lg p-0.5 bg-black/10 dark:bg-white/10">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-1 rounded-md transition ${
                activeTab === 'overview'
                  ? 'bg-white dark:bg-slate-700 shadow-sm text-blue-600 dark:text-blue-400 font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('storage')}
              className={`px-4 py-1 rounded-md transition ${
                activeTab === 'storage'
                  ? 'bg-white dark:bg-slate-700 shadow-sm text-blue-600 dark:text-blue-400 font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Storage
            </button>
          </div>
        </div>

        {/* Content Area */}
        {activeTab === 'overview' ? (
          <div className="p-6 flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {/* Apple Big Graphic */}
            <div className="w-28 h-28 rounded-3xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-amber-400 p-0.5 shadow-xl flex-shrink-0 flex items-center justify-center">
              <div className="w-full h-full rounded-[22px] bg-slate-900/40 backdrop-blur-md flex items-center justify-center text-white">
                <AppleLogoIcon className="w-14 h-14" />
              </div>
            </div>

            {/* Specs Details */}
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-2xl font-bold tracking-tight">macOS Golden Gate</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">Version 15.0 Simulator</p>

              <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                <div className="flex justify-between sm:justify-start gap-4">
                  <span className="font-semibold text-slate-500 dark:text-slate-400 w-28">Mac:</span>
                  <span>MacBook Pro 16-inch, 2024</span>
                </div>
                <div className="flex justify-between sm:justify-start gap-4">
                  <span className="font-semibold text-slate-500 dark:text-slate-400 w-28">Chip:</span>
                  <span>Apple M3 Max (16-core CPU)</span>
                </div>
                <div className="flex justify-between sm:justify-start gap-4">
                  <span className="font-semibold text-slate-500 dark:text-slate-400 w-28">Memory:</span>
                  <span>36 GB Unified Memory</span>
                </div>
                <div className="flex justify-between sm:justify-start gap-4">
                  <span className="font-semibold text-slate-500 dark:text-slate-400 w-28">Startup Disk:</span>
                  <span>Macintosh HD</span>
                </div>
                <div className="flex justify-between sm:justify-start gap-4">
                  <span className="font-semibold text-slate-500 dark:text-slate-400 w-28">Serial Number:</span>
                  <span className="font-mono text-[11px]">C02GG00L0L8M</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 flex items-center gap-2.5 justify-center sm:justify-start">
                <button
                  onClick={() => setShowUpdateToast(true)}
                  className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs shadow-sm transition active:scale-95"
                >
                  Software Update...
                </button>
                <button
                  onClick={() => setActiveTab('storage')}
                  className="px-3 py-1.5 rounded-lg bg-black/10 dark:bg-white/10 hover:bg-black/15 dark:hover:bg-white/15 text-slate-800 dark:text-slate-200 font-medium text-xs transition"
                >
                  System Report...
                </button>
              </div>

              {showUpdateToast && (
                <div className="mt-3 flex items-center gap-1.5 text-[11px] text-emerald-600 dark:text-emerald-400 animate-in fade-in">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Your Mac is up to date (macOS Golden Gate 15.0)</span>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Storage Tab */
          <div className="p-6 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <HardDrive className="w-8 h-8 text-blue-500" />
              <div>
                <h3 className="text-sm font-semibold">Macintosh HD</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  378 GB available of 512 GB
                </p>
              </div>
            </div>

            {/* Storage Bar Breakdown */}
            <div className="w-full h-4 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden flex shadow-inner">
              <div className="h-full bg-blue-500" style={{ width: '22%' }} title="Apps: 64 GB" />
              <div className="h-full bg-purple-500" style={{ width: '12%' }} title="macOS: 28 GB" />
              <div className="h-full bg-amber-500" style={{ width: '8%' }} title="System Data: 18 GB" />
              <div className="h-full bg-emerald-500" style={{ width: '6%' }} title="Documents: 14 GB" />
            </div>

            {/* Legend */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-slate-600 dark:text-slate-300">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                <span>Apps (64 GB)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                <span>macOS (28 GB)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span>System (18 GB)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span>Files (14 GB)</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 dark:text-slate-400 mt-2">
              Virtual drive backed by browser memory & local storage cache.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
