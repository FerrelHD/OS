import React, { useState } from 'react';
import {
  Image as ImageIcon,
  Heart,
  MapPin,
  Clock,
  ZoomIn,
  ZoomOut,
  X,
  ChevronLeft,
  ChevronRight,
  Info,
} from 'lucide-react';

const PHOTOS_DATA = [
  {
    id: 1,
    title: 'Golden Gate Bridge at Sunset',
    location: 'San Francisco, CA',
    date: 'Oct 3, 2026',
    category: 'Places',
    isFavorite: true,
    url: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1200&q=80',
    meta: 'Sony A7R V • 24-70mm f/2.8 • 1/250s • ISO 100',
  },
  {
    id: 2,
    title: 'Redwood Forest Mist',
    location: 'Muir Woods, CA',
    date: 'Sep 28, 2026',
    category: 'All Photos',
    isFavorite: true,
    url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80',
    meta: 'Canon EOS R5 • 35mm f/1.4 • 1/125s • ISO 200',
  },
  {
    id: 3,
    title: 'Pacific Ocean Waves',
    location: 'Big Sur, CA',
    date: 'Sep 15, 2026',
    category: 'Places',
    isFavorite: false,
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    meta: 'Nikon Z9 • 70-200mm f/4 • 1/1000s • ISO 64',
  },
  {
    id: 4,
    title: 'Yosemite Valley Dawn',
    location: 'Yosemite National Park',
    date: 'Aug 22, 2026',
    category: 'Favorites',
    isFavorite: true,
    url: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&w=1200&q=80',
    meta: 'Hasselblad X2D • 45mm f/4 • 1/60s • ISO 64',
  },
  {
    id: 5,
    title: 'San Francisco Skyline Fog',
    location: 'Twin Peaks, SF',
    date: 'Aug 10, 2026',
    category: 'Recents',
    isFavorite: false,
    url: 'https://images.unsplash.com/photo-1506146332389-18140dc7b2fb?auto=format&fit=crop&w=1200&q=80',
    meta: 'Fujifilm GFX 100S • 50mm f/3.5 • 1/500s • ISO 160',
  },
  {
    id: 6,
    title: 'Lake Tahoe Alpine Glow',
    location: 'Emerald Bay, Lake Tahoe',
    date: 'Jul 30, 2026',
    category: 'Places',
    isFavorite: true,
    url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    meta: 'Leica Q3 • 28mm f/1.7 • 1/320s • ISO 100',
  },
];

export default function PhotosApp() {
  const [activeCategory, setActiveCategory] = useState('All Photos');
  const [zoomLevel, setZoomLevel] = useState(3); // 2, 3, 4, 5 columns
  const [activePhotoIndex, setActivePhotoIndex] = useState(null);

  const filteredPhotos = PHOTOS_DATA.filter((p) => {
    if (activeCategory === 'Favorites') return p.isFavorite;
    if (activeCategory === 'Places') return p.category === 'Places';
    if (activeCategory === 'Recents') return true;
    return true;
  });

  const activePhoto = activePhotoIndex !== null ? filteredPhotos[activePhotoIndex] : null;

  return (
    <div className="flex-1 flex flex-col h-full bg-white dark:bg-[#1C1C1E] text-slate-800 dark:text-slate-100 select-none overflow-hidden relative">
      {/* Top Header */}
      <div className="h-11 px-4 bg-slate-50 dark:bg-white/[0.03] border-b border-black/10 dark:border-white/10 flex items-center justify-between text-xs">
        {/* Category Pills */}
        <div className="flex items-center space-x-1">
          {['All Photos', 'Favorites', 'Places', 'Recents'].map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setActivePhotoIndex(null);
              }}
              className={`px-3 py-1 rounded-md transition ${
                activeCategory === cat
                  ? 'bg-blue-600 text-white font-medium shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-black/5 dark:hover:bg-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Zoom Slider */}
        <div className="flex items-center space-x-2">
          <ZoomOut className="w-3.5 h-3.5 text-slate-400" />
          <input
            type="range"
            min="2"
            max="5"
            value={zoomLevel}
            onChange={(e) => setZoomLevel(parseInt(e.target.value, 10))}
            className="w-20 h-1.5 bg-black/10 dark:bg-white/20 rounded-full appearance-none accent-blue-600 cursor-pointer"
            aria-label="Photo Grid Zoom"
          />
          <ZoomIn className="w-3.5 h-3.5 text-slate-400" />
        </div>
      </div>

      {/* Photo Grid */}
      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        <div
          className="grid gap-3"
          style={{
            gridTemplateColumns: `repeat(${zoomLevel}, minmax(0, 1fr))`,
          }}
        >
          {filteredPhotos.map((photo, index) => (
            <div
              key={photo.id}
              onClick={() => setActivePhotoIndex(index)}
              className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-all hover:scale-[1.02]"
            >
              <img
                src={photo.url}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:brightness-105 transition"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2.5 text-white">
                <span className="text-xs font-semibold truncate leading-tight">{photo.title}</span>
                <span className="text-[10px] text-white/80 truncate">{photo.location}</span>
              </div>
              {photo.isFavorite && (
                <div className="absolute top-2 right-2 p-1 rounded-full bg-black/40 backdrop-blur-sm text-rose-400">
                  <Heart className="w-3 h-3 fill-current" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div
          className="absolute inset-0 z-50 bg-black/85 backdrop-blur-xl flex flex-col justify-between p-4 animate-in fade-in select-none"
          onClick={() => setActivePhotoIndex(null)}
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between text-white" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-sm">{activePhoto.title}</span>
              <span className="text-xs text-white/60">• {activePhoto.date}</span>
            </div>
            <button
              onClick={() => setActivePhotoIndex(null)}
              className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Photo Center View with Arrows */}
          <div className="flex-1 flex items-center justify-between px-2 sm:px-6">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActivePhotoIndex((prev) => (prev - 1 + filteredPhotos.length) % filteredPhotos.length);
              }}
              className="p-2 rounded-full bg-white/10 hover:bg-white/25 text-white transition"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div
              className="max-w-[85vw] max-h-[70vh] rounded-xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={activePhoto.url}
                alt={activePhoto.title}
                className="max-w-full max-h-[70vh] object-contain mx-auto"
              />
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setActivePhotoIndex((prev) => (prev + 1) % filteredPhotos.length);
              }}
              className="p-2 rounded-full bg-white/10 hover:bg-white/25 text-white transition"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Info Footer */}
          <div
            className="flex items-center justify-between text-white/70 text-xs px-2 sm:px-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center space-x-4">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-blue-400" />
                <span>{activePhoto.location}</span>
              </span>
              <span className="flex items-center gap-1 font-mono text-[11px]">
                <Info className="w-3.5 h-3.5 text-slate-400" />
                <span>{activePhoto.meta}</span>
              </span>
            </div>
            <span>
              {activePhotoIndex + 1} of {filteredPhotos.length}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
