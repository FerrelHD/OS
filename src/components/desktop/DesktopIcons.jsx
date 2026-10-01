import React, { useState } from 'react';
import { useFileSystem } from '../../context/FileSystemContext';
import { useWindow } from '../../context/WindowContext';
import { FinderIcon, NotesIcon } from '../common/icons/AppIcons';
import { HardDrive, Folder, FileText } from 'lucide-react';

export default function DesktopIcons() {
  const { fs, getChildren } = useFileSystem();
  const { openWindow } = useWindow();
  const [selectedId, setSelectedId] = useState(null);

  const desktopFiles = getChildren('desktop');

  const handleOpenItem = (item) => {
    if (item.type === 'folder' || item.id === 'root') {
      openWindow('finder', { initialFolder: item.id });
    } else if (item.fileType === 'text') {
      openWindow('notes', { activeFileId: item.id });
    } else {
      openWindow('finder');
    }
  };

  return (
    <div
      onClick={() => setSelectedId(null)}
      className="absolute left-4 top-4 grid grid-flow-col grid-rows-6 gap-y-4 gap-x-6 w-max z-10 pointer-events-auto"
    >
      {/* Macintosh HD */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setSelectedId('root');
        }}
        onDoubleClick={() => openWindow('finder', { initialFolder: 'root' })}
        className="flex flex-col items-center w-20 group focus:outline-none"
      >
        <div className="w-14 h-14 rounded-2xl group-hover:scale-105 transition-transform drop-shadow-lg flex items-center justify-center bg-gradient-to-b from-slate-200 to-slate-400 border border-white/40">
          <HardDrive className="w-8 h-8 text-slate-700" />
        </div>
        <span
          className={`mt-1.5 text-xs font-medium text-center text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] px-1.5 py-0.5 rounded transition ${
            selectedId === 'root' ? 'bg-blue-600/90' : 'group-hover:bg-black/20'
          }`}
        >
          Macintosh HD
        </span>
      </button>

      {/* Documents Shortcut */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setSelectedId('documents');
        }}
        onDoubleClick={() => openWindow('finder', { initialFolder: 'documents' })}
        className="flex flex-col items-center w-20 group focus:outline-none"
      >
        <div className="w-14 h-14 rounded-2xl group-hover:scale-105 transition-transform drop-shadow-lg flex items-center justify-center bg-blue-500/90 border border-blue-400">
          <Folder className="w-8 h-8 text-blue-100" />
        </div>
        <span
          className={`mt-1.5 text-xs font-medium text-center text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] px-1.5 py-0.5 rounded transition ${
            selectedId === 'documents' ? 'bg-blue-600/90' : 'group-hover:bg-black/20'
          }`}
        >
          Documents
        </span>
      </button>

      {/* Dynamic Desktop Files from VFS */}
      {desktopFiles.map((file) => (
        <button
          key={file.id}
          onClick={(e) => {
            e.stopPropagation();
            setSelectedId(file.id);
          }}
          onDoubleClick={() => handleOpenItem(file)}
          className="flex flex-col items-center w-20 group focus:outline-none"
        >
          <div className="w-14 h-14 rounded-2xl group-hover:scale-105 transition-transform drop-shadow-lg flex items-center justify-center bg-white/90 dark:bg-slate-800/90 border border-white/40 dark:border-white/10">
            {file.fileType === 'text' ? (
              <FileText className="w-8 h-8 text-amber-500" />
            ) : (
              <Folder className="w-8 h-8 text-blue-500" />
            )}
          </div>
          <span
            className={`mt-1.5 text-xs font-medium text-center text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] px-1.5 py-0.5 rounded transition line-clamp-2 max-w-[80px] ${
              selectedId === file.id ? 'bg-blue-600/90' : 'group-hover:bg-black/20'
            }`}
          >
            {file.name}
          </span>
        </button>
      ))}
    </div>
  );
}
