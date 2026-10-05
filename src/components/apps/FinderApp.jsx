import React, { useState, useMemo } from 'react';
import { useFileSystem } from '../../context/FileSystemContext';
import { useWindow } from '../../context/WindowContext';
import {
  Folder,
  FileText,
  FileCode,
  Image,
  File,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  List,
  FolderPlus,
  FilePlus,
  Trash2,
  Search,
  HardDrive,
  Download,
  FileSpreadsheet,
  Clock,
} from 'lucide-react';

const SIDEBAR_FAVORITES = [
  { id: 'desktop', name: 'Desktop', icon: LayoutGrid },
  { id: 'documents', name: 'Documents', icon: FileText },
  { id: 'downloads', name: 'Downloads', icon: Download },
  { id: 'pictures', name: 'Pictures', icon: Image },
  { id: 'projects', name: 'Projects', icon: FileCode },
];

export default function FinderApp() {
  const { fs, getChildren, createNode, deleteNode, renameNode } = useFileSystem();
  const { openWindow } = useWindow();

  const [currentFolderId, setCurrentFolderId] = useState('desktop');
  const [history, setHistory] = useState(['desktop']);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');

  const navigateTo = (folderId) => {
    if (!fs[folderId] || fs[folderId].type !== 'folder') return;
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(folderId);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setCurrentFolderId(folderId);
    setSelectedId(null);
    setEditingId(null);
  };

  const handleBack = () => {
    if (historyIndex > 0) {
      const prevIndex = historyIndex - 1;
      setHistoryIndex(prevIndex);
      setCurrentFolderId(history[prevIndex]);
      setSelectedId(null);
    }
  };

  const handleForward = () => {
    if (historyIndex < history.length - 1) {
      const nextIndex = historyIndex + 1;
      setHistoryIndex(nextIndex);
      setCurrentFolderId(history[nextIndex]);
      setSelectedId(null);
    }
  };

  const currentFolder = fs[currentFolderId] || fs.desktop;
  const items = getChildren(currentFolderId);

  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return items;
    return items.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
    );
  }, [items, searchQuery]);

  const handleItemDoubleClick = (item) => {
    if (item.type === 'folder') {
      navigateTo(item.id);
    } else {
      // If text/doc file, open in Notes
      if (item.name.endsWith('.txt') || item.name.endsWith('.md')) {
        openWindow('notes');
      } else if (item.name.endsWith('.jpg') || item.name.endsWith('.png')) {
        openWindow('photos');
      }
    }
  };

  const handleCreateFolder = () => {
    const name = `New Folder ${Math.floor(Math.random() * 100)}`;
    const newId = createNode(currentFolderId, name, 'folder');
    setSelectedId(newId);
  };

  const handleCreateFile = () => {
    const name = `Untitled_${Math.floor(Math.random() * 100)}.txt`;
    const newId = createNode(
      currentFolderId,
      name,
      'file',
      'This is a newly created text document in macOS simulator.',
      'text'
    );
    setSelectedId(newId);
  };

  const handleDelete = () => {
    if (selectedId) {
      deleteNode(selectedId);
      setSelectedId(null);
      setEditingId(null);
    }
  };

  const startRename = (item) => {
    setEditingId(item.id);
    setEditName(item.name);
  };

  const saveRename = () => {
    if (editingId && editName.trim()) {
      renameNode(editingId, editName.trim());
    }
    setEditingId(null);
  };

  const getFileIcon = (item) => {
    if (item.type === 'folder') return <Folder className="w-full h-full text-sky-500 fill-sky-400/30" />;
    if (item.name.endsWith('.txt') || item.name.endsWith('.md'))
      return <FileText className="w-full h-full text-slate-500" />;
    if (item.name.endsWith('.pdf'))
      return <FileSpreadsheet className="w-full h-full text-red-500" />;
    if (item.name.endsWith('.jpg') || item.name.endsWith('.png'))
      return <Image className="w-full h-full text-emerald-500" />;
    return <File className="w-full h-full text-slate-400" />;
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-white dark:bg-[#1E1E1E] text-slate-800 dark:text-slate-100 select-none overflow-hidden">
      {/* Top Toolbar */}
      <div className="h-11 px-3 bg-slate-100/80 dark:bg-white/5 border-b border-black/10 dark:border-white/10 flex items-center justify-between text-xs gap-2">
        {/* Navigation History */}
        <div className="flex items-center space-x-1">
          <button
            onClick={handleBack}
            disabled={historyIndex === 0}
            className="p-1 rounded-md hover:bg-black/10 dark:hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none transition"
            title="Back"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleForward}
            disabled={historyIndex === history.length - 1}
            className="p-1 rounded-md hover:bg-black/10 dark:hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none transition"
            title="Forward"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <span className="font-semibold text-sm ml-2">{currentFolder?.name || 'Folder'}</span>
        </div>

        {/* View Switcher & Action Controls */}
        <div className="flex items-center space-x-2">
          {/* View Mode Toggle */}
          <div className="flex rounded-md p-0.5 bg-black/5 dark:bg-white/10">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1 rounded ${viewMode === 'grid' ? 'bg-white dark:bg-slate-700 shadow-sm text-blue-600' : 'text-slate-600 dark:text-slate-300'}`}
              title="Icon Grid View"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1 rounded ${viewMode === 'list' ? 'bg-white dark:bg-slate-700 shadow-sm text-blue-600' : 'text-slate-600 dark:text-slate-300'}`}
              title="List View"
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* New Actions */}
          <button
            onClick={handleCreateFolder}
            className="flex items-center space-x-1 px-2 py-1 rounded bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/15 transition text-slate-700 dark:text-slate-200"
            title="New Folder"
          >
            <FolderPlus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Folder</span>
          </button>
          <button
            onClick={handleCreateFile}
            className="flex items-center space-x-1 px-2 py-1 rounded bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/15 transition text-slate-700 dark:text-slate-200"
            title="New Text File"
          >
            <FilePlus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">File</span>
          </button>
          <button
            onClick={handleDelete}
            disabled={!selectedId}
            className="p-1 rounded bg-black/5 dark:bg-white/10 hover:bg-red-500 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition text-slate-600 dark:text-slate-400"
            title="Delete Selected"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>

          {/* Search Box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search"
              className="py-1 pl-7 pr-2 rounded-md bg-black/5 dark:bg-white/10 border border-transparent focus:border-blue-500 text-xs w-28 sm:w-36 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Main Dual-Pane Section */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <aside className="w-44 sm:w-48 bg-slate-50/90 dark:bg-white/[0.03] border-r border-black/10 dark:border-white/10 p-2 flex flex-col gap-4 flex-shrink-0 text-xs">
          <div>
            <div className="px-2 py-1 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
              Favorites
            </div>
            <div className="space-y-0.5">
              {SIDEBAR_FAVORITES.map((fav) => {
                const FavIcon = fav.icon;
                const isActive = currentFolderId === fav.id;
                return (
                  <button
                    key={fav.id}
                    onClick={() => navigateTo(fav.id)}
                    className={`w-full flex items-center space-x-2 px-2.5 py-1.5 rounded-lg text-left transition ${
                      isActive
                        ? 'bg-blue-600 text-white font-medium shadow-sm'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-black/5 dark:hover:bg-white/5'
                    }`}
                  >
                    <FavIcon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-blue-500'}`} />
                    <span className="truncate">{fav.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <div className="px-2 py-1 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
              Locations
            </div>
            <button
              onClick={() => navigateTo('root')}
              className={`w-full flex items-center space-x-2 px-2.5 py-1.5 rounded-lg text-left transition ${
                currentFolderId === 'root'
                  ? 'bg-blue-600 text-white font-medium shadow-sm'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-black/5 dark:hover:bg-white/5'
              }`}
            >
              <HardDrive className={`w-3.5 h-3.5 ${currentFolderId === 'root' ? 'text-white' : 'text-slate-500'}`} />
              <span className="truncate">Macintosh HD</span>
            </button>
          </div>
        </aside>

        {/* Content Viewer */}
        <main
          className="flex-1 p-4 overflow-y-auto custom-scrollbar"
          onClick={() => {
            setSelectedId(null);
            setEditingId(null);
          }}
        >
          {filteredItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 text-xs">
              <Folder className="w-12 h-12 stroke-[1.2] mb-2 opacity-50" />
              <span>This folder is empty</span>
            </div>
          ) : viewMode === 'grid' ? (
            /* Grid View */
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
              {filteredItems.map((item) => {
                const isSelected = selectedId === item.id;
                const isEditing = editingId === item.id;

                return (
                  <div
                    key={item.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedId(item.id);
                    }}
                    onDoubleClick={(e) => {
                      e.stopPropagation();
                      handleItemDoubleClick(item);
                    }}
                    className={`flex flex-col items-center p-2 rounded-xl cursor-pointer transition select-none ${
                      isSelected
                        ? 'bg-blue-600/15 border border-blue-500/40 text-blue-600 dark:text-blue-400'
                        : 'hover:bg-black/5 dark:hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    <div className="w-12 h-12 flex items-center justify-center mb-1.5 drop-shadow-sm">
                      {getFileIcon(item)}
                    </div>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        onBlur={saveRename}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') saveRename();
                          if (e.key === 'Escape') setEditingId(null);
                        }}
                        autoFocus
                        className="text-xs text-center border border-blue-500 rounded px-1 py-0.5 w-full bg-white dark:bg-slate-800"
                        onClick={(e) => e.stopPropagation()}
                      />
                    ) : (
                      <span
                        onDoubleClick={(e) => {
                          e.stopPropagation();
                          startRename(item);
                        }}
                        className="text-xs text-center font-medium truncate max-w-full leading-tight text-slate-800 dark:text-slate-200"
                        title={item.name}
                      >
                        {item.name}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            /* List Table View */
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-black/10 dark:border-white/10 text-slate-500 dark:text-slate-400">
                  <th className="py-2 px-3 font-semibold">Name</th>
                  <th className="py-2 px-3 font-semibold">Date Modified</th>
                  <th className="py-2 px-3 font-semibold">Size</th>
                  <th className="py-2 px-3 font-semibold">Kind</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item) => {
                  const isSelected = selectedId === item.id;
                  return (
                    <tr
                      key={item.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedId(item.id);
                      }}
                      onDoubleClick={(e) => {
                        e.stopPropagation();
                        handleItemDoubleClick(item);
                      }}
                      className={`border-b border-black/5 dark:border-white/5 cursor-pointer transition ${
                        isSelected
                          ? 'bg-blue-600 text-white'
                          : 'hover:bg-black/5 dark:hover:bg-white/5 text-slate-800 dark:text-slate-200'
                      }`}
                    >
                      <td className="py-2 px-3 flex items-center space-x-2">
                        <div className="w-4 h-4 flex-shrink-0">{getFileIcon(item)}</div>
                        <span className="font-medium truncate">{item.name}</span>
                      </td>
                      <td className="py-2 px-3 text-slate-500 dark:text-slate-400">
                        {item.updatedAt || new Date().toLocaleDateString()}
                      </td>
                      <td className="py-2 px-3 text-slate-500 dark:text-slate-400">
                        {item.size || (item.type === 'folder' ? '--' : '1 KB')}
                      </td>
                      <td className="py-2 px-3 capitalize text-slate-500 dark:text-slate-400">
                        {item.type === 'folder' ? 'Folder' : `${item.fileType || 'Document'}`}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </main>
      </div>

      {/* Status Bar */}
      <div className="h-6 px-3 bg-slate-100/70 dark:bg-white/[0.02] border-t border-black/10 dark:border-white/10 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
        <span>{filteredItems.length} items</span>
        <span>Macintosh HD • 378 GB Available</span>
      </div>
    </div>
  );
}
