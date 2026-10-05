import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  RotateCw,
  Share,
  Plus,
  X,
  Search,
  Lock,
  Globe,
  Star,
  ExternalLink,
} from 'lucide-react';

const BOOKMARKS = [
  { name: 'Apple', url: 'apple.com', color: 'bg-slate-700' },
  { name: 'Gemini AI', url: 'gemini.google.com', color: 'bg-blue-600' },
  { name: 'GitHub', url: 'github.com/macos-golden-gate', color: 'bg-slate-900' },
  { name: 'Wikipedia', url: 'wikipedia.org', color: 'bg-slate-500' },
  { name: 'YouTube', url: 'youtube.com', color: 'bg-red-600' },
];

export default function SafariApp() {
  const [tabs, setTabs] = useState([
    { id: 'tab-1', title: 'Apple — MacBook Pro', url: 'apple.com' },
  ]);
  const [activeTabId, setActiveTabId] = useState('tab-1');
  const [urlInput, setUrlInput] = useState('apple.com');

  const activeTab = tabs.find((t) => t.id === activeTabId) || tabs[0];

  const handleNavigate = (url) => {
    setUrlInput(url);
    let title = 'Web Page';
    if (url.includes('apple')) title = 'Apple — MacBook Pro';
    else if (url.includes('github')) title = 'GitHub — macos-golden-gate';
    else if (url.includes('gemini')) title = 'Google Gemini AI';
    else title = `Search: ${url}`;

    setTabs((prev) =>
      prev.map((t) => (t.id === activeTab.id ? { ...t, url, title } : t))
    );
  };

  const handleNewTab = () => {
    const newId = `tab-${Date.now()}`;
    const newTab = { id: newId, title: 'Start Page', url: 'apple.com' };
    setTabs([...tabs, newTab]);
    setActiveTabId(newId);
    setUrlInput('apple.com');
  };

  const handleCloseTab = (id, e) => {
    e.stopPropagation();
    if (tabs.length === 1) return; // Keep at least one tab
    const nextTabs = tabs.filter((t) => t.id !== id);
    setTabs(nextTabs);
    if (activeTabId === id) {
      setActiveTabId(nextTabs[0].id);
      setUrlInput(nextTabs[0].url);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-white dark:bg-[#1E1E1E] text-slate-800 dark:text-slate-100 select-none overflow-hidden">
      {/* Top Tabs Bar */}
      <div className="h-9 px-2 bg-slate-100 dark:bg-white/[0.04] border-b border-black/10 dark:border-white/10 flex items-center gap-1 overflow-x-auto custom-scrollbar">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTabId;
          return (
            <div
              key={tab.id}
              onClick={() => {
                setActiveTabId(tab.id);
                setUrlInput(tab.url);
              }}
              className={`h-7 px-3 rounded-lg flex items-center space-x-2 text-xs cursor-pointer transition select-none max-w-[180px] group ${
                isActive
                  ? 'bg-white dark:bg-[#1E1E1E] shadow-sm font-medium text-slate-900 dark:text-slate-100'
                  : 'hover:bg-black/5 dark:hover:bg-white/5 text-slate-500'
              }`}
            >
              <Globe className="w-3.5 h-3.5 flex-shrink-0 text-sky-500" />
              <span className="truncate flex-1">{tab.title}</span>
              {tabs.length > 1 && (
                <button
                  onClick={(e) => handleCloseTab(tab.id, e)}
                  className="opacity-0 group-hover:opacity-100 p-0.5 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          );
        })}

        <button
          onClick={handleNewTab}
          className="p-1 rounded-md hover:bg-black/10 dark:hover:bg-white/10 text-slate-500 transition"
          title="New Tab"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Navigation Address Bar */}
      <div className="h-11 px-3 bg-slate-50/80 dark:bg-white/[0.02] border-b border-black/10 dark:border-white/10 flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center space-x-1">
          <button className="p-1 rounded-md hover:bg-black/10 dark:hover:bg-white/10 text-slate-400">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="p-1 rounded-md hover:bg-black/10 dark:hover:bg-white/10 text-slate-400">
            <ChevronRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleNavigate(urlInput)}
            className="p-1 rounded-md hover:bg-black/10 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300"
            title="Reload"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Address Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleNavigate(urlInput);
          }}
          className="flex-1 max-w-xl relative flex items-center"
        >
          <Lock className="w-3 h-3 absolute left-3 text-slate-400" />
          <input
            type="text"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            className="w-full py-1.5 pl-8 pr-8 rounded-lg bg-black/5 dark:bg-white/10 border border-transparent focus:border-blue-500 outline-none text-xs text-center text-slate-800 dark:text-slate-200"
            placeholder="Search or enter website name"
          />
        </form>

        <button className="p-1 rounded-md hover:bg-black/10 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300">
          <Share className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Bookmarks Bar */}
      <div className="h-7 px-4 bg-slate-50/40 dark:bg-white/[0.01] border-b border-black/5 dark:border-white/5 flex items-center space-x-4 text-[11px] text-slate-600 dark:text-slate-400">
        {BOOKMARKS.map((bm) => (
          <button
            key={bm.name}
            onClick={() => handleNavigate(bm.url)}
            className="hover:text-blue-500 transition flex items-center space-x-1"
          >
            <span className={`w-2 h-2 rounded-full ${bm.color}`} />
            <span>{bm.name}</span>
          </button>
        ))}
      </div>

      {/* Web Canvas Mock Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar select-text bg-slate-50 dark:bg-[#121212]">
        {activeTab?.url.includes('apple') ? (
          /* Apple Mock Site */
          <div className="max-w-4xl mx-auto py-10 px-6 flex flex-col items-center text-center">
            <span className="text-amber-500 font-semibold text-xs tracking-wider uppercase mb-1">
              New Release
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">
              MacBook Pro
            </h1>
            <p className="text-xl sm:text-2xl font-medium text-slate-600 dark:text-slate-300 mb-6">
              Mind-blowing. Head-turning.
            </p>
            <div className="flex gap-3 mb-10">
              <button
                onClick={() => alert('Simulated purchase checkout initiated!')}
                className="px-4 py-2 rounded-full bg-blue-600 text-white font-medium text-xs hover:bg-blue-700 transition shadow"
              >
                Buy from $1,599
              </button>
              <button
                onClick={() => handleNavigate('github.com/macos-golden-gate')}
                className="px-4 py-2 rounded-full bg-black/10 dark:bg-white/10 text-slate-800 dark:text-white font-medium text-xs hover:bg-black/15 transition"
              >
                View Repository
              </button>
            </div>

            <div className="w-full rounded-2xl bg-gradient-to-tr from-slate-900 via-slate-800 to-indigo-950 p-8 text-white shadow-2xl text-left border border-white/10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="text-amber-400 font-bold text-lg mb-1">M3 Max Chip</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Up to 16-core CPU and 40-core GPU for unprecedented simulation throughput and Liquid Glass rendering.
                  </p>
                </div>
                <div>
                  <h3 className="text-sky-400 font-bold text-lg mb-1">Liquid Retina XDR</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    1000 nits sustained full-screen brightness with ProMotion technology up to 120Hz smooth animations.
                  </p>
                </div>
                <div>
                  <h3 className="text-purple-400 font-bold text-lg mb-1">macOS Golden Gate</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Ultra-modern desktop environment with built-in Google Gemini, deep spotlight math, and clean window snapping.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : activeTab?.url.includes('github') ? (
          /* GitHub Mock Site */
          <div className="max-w-4xl mx-auto py-8 px-6 text-slate-800 dark:text-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-black/10 dark:border-white/10">
              <div className="flex items-center space-x-2 text-sm">
                <span className="font-semibold text-blue-600 dark:text-blue-400">developer</span>
                <span>/</span>
                <span className="font-bold">macos-golden-gate-simulator</span>
                <span className="text-[11px] px-2 py-0.5 rounded-full border border-black/10 dark:border-white/10">
                  Public
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => alert('Starred repository!')}
                  className="flex items-center space-x-1.5 px-3 py-1 rounded-md bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/10 text-xs font-semibold hover:bg-black/10 transition"
                >
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span>Star 1.4k</span>
                </button>
              </div>
            </div>

            <div className="mt-6 p-6 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-slate-900 shadow-sm">
              <h2 className="text-lg font-bold mb-2">README.md</h2>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                A high-fidelity macOS desktop simulator built with React 18, Tailwind CSS, Lucide icons, and modern Web APIs.
              </p>
              <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg font-mono text-xs text-emerald-600 dark:text-emerald-400">
                $ npm install<br />
                $ npm run dev
              </div>
            </div>
          </div>
        ) : (
          /* Search Results */
          <div className="max-w-3xl mx-auto py-8 px-6 text-slate-800 dark:text-slate-200">
            <div className="text-xs text-slate-400 mb-4">About 4,210,000 results for "{activeTab?.url}"</div>
            <div className="space-y-6">
              <div>
                <a href="#link" className="text-blue-600 dark:text-blue-400 font-semibold text-base hover:underline">
                  macOS Golden Gate — Next Generation Web Simulation
                </a>
                <div className="text-xs text-emerald-600 dark:text-emerald-400 font-mono mt-0.5">https://macos-golden-gate.dev</div>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  Experience macOS right inside modern browsers. Fluid glass ribbons, live responsive applications, spotlight calculator, and more.
                </p>
              </div>
              <div>
                <a href="#link" className="text-blue-600 dark:text-blue-400 font-semibold text-base hover:underline">
                  Antislop Quality Standards & Guidelines
                </a>
                <div className="text-xs text-emerald-600 dark:text-emerald-400 font-mono mt-0.5">https://antislop.guide</div>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  Design principles for high craftsmanship: zero dead buttons, WCAG AA contrast ratio, full keyboard support, and clean native architecture.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
