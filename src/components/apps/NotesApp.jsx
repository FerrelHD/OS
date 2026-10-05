import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Search, FileText } from 'lucide-react';

const INITIAL_NOTES = [
  {
    id: 'note-1',
    title: 'Welcome to macOS Golden Gate',
    content: `# Welcome to macOS Golden Gate Simulator\n\nCrafted with React, Vite, and Tailwind CSS.\n\n### Features\n- 10 native simulated apps\n- Fluid window manager with 8-way resize\n- Spotlight with instant calculator\n- High-fidelity frosted glass Liquid Glass UI\n- Google Gemini AI Assistant integration`,
    updatedAt: new Date().toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' }),
  },
  {
    id: 'note-2',
    title: 'Ideas & Architecture',
    content: `Architecture Notes:\n- Keep state clean with Context and custom hooks\n- Adhere to Antislop craftsmanship (zero dead buttons, AA contrast)\n- Use native Web APIs for audio and storage`,
    updatedAt: new Date().toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' }),
  },
];

export default function NotesApp() {
  const [notes, setNotes] = useState(() => {
    try {
      const saved = localStorage.getItem('macos_notes');
      return saved ? JSON.parse(saved) : INITIAL_NOTES;
    } catch {
      return INITIAL_NOTES;
    }
  });

  const [activeNoteId, setActiveNoteId] = useState(notes[0]?.id || null);
  const [searchQuery, setSearchQuery] = useState('');

  // Persist notes
  useEffect(() => {
    try {
      localStorage.setItem('macos_notes', JSON.stringify(notes));
    } catch {
      // ignore
    }
  }, [notes]);

  const activeNote = notes.find((n) => n.id === activeNoteId) || notes[0];

  const handleCreateNote = () => {
    const newNote = {
      id: `note-${Date.now()}`,
      title: 'New Note',
      content: '',
      updatedAt: new Date().toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' }),
    };
    setNotes([newNote, ...notes]);
    setActiveNoteId(newNote.id);
  };

  const handleDeleteNote = (id) => {
    const remaining = notes.filter((n) => n.id !== id);
    setNotes(remaining);
    if (activeNoteId === id) {
      setActiveNoteId(remaining[0]?.id || null);
    }
  };

  const handleUpdateActiveNote = (field, value) => {
    if (!activeNote) return;
    setNotes((prev) =>
      prev.map((n) =>
        n.id === activeNote.id
          ? {
              ...n,
              [field]: value,
              updatedAt: new Date().toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' }),
            }
          : n
      )
    );
  };

  const filteredNotes = notes.filter(
    (n) =>
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 flex h-full bg-white dark:bg-[#1E1E1E] text-slate-800 dark:text-slate-100 select-none overflow-hidden">
      {/* Sidebar Note List */}
      <aside className="w-56 sm:w-64 bg-slate-50/90 dark:bg-white/[0.03] border-r border-black/10 dark:border-white/10 flex flex-col flex-shrink-0">
        {/* Top Actions */}
        <div className="h-11 px-3 border-b border-black/10 dark:border-white/10 flex items-center justify-between">
          <span className="font-semibold text-xs text-slate-500 dark:text-slate-400">All iCloud</span>
          <button
            onClick={handleCreateNote}
            className="p-1 rounded-md hover:bg-black/10 dark:hover:bg-white/10 text-amber-600 dark:text-amber-400 transition"
            title="Create New Note"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Search Notes */}
        <div className="p-2 border-b border-black/10 dark:border-white/10">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Notes"
              className="w-full py-1 pl-7 pr-2 rounded-md bg-black/5 dark:bg-white/10 border border-transparent focus:border-amber-500 text-xs focus:outline-none"
            />
          </div>
        </div>

        {/* Notes List */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1">
          {filteredNotes.length === 0 ? (
            <div className="p-4 text-center text-xs text-slate-400">No notes found</div>
          ) : (
            filteredNotes.map((note) => {
              const isActive = note.id === activeNote?.id;
              return (
                <div
                  key={note.id}
                  onClick={() => setActiveNoteId(note.id)}
                  className={`p-2.5 rounded-xl cursor-pointer transition select-none flex flex-col gap-1 group relative ${
                    isActive
                      ? 'bg-amber-500 text-white shadow-sm'
                      : 'hover:bg-black/5 dark:hover:bg-white/5 text-slate-800 dark:text-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold truncate leading-tight flex-1">
                      {note.title || 'Untitled Note'}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteNote(note.id);
                      }}
                      className={`opacity-0 group-hover:opacity-100 p-0.5 rounded hover:bg-red-500 hover:text-white transition ${
                        isActive ? 'text-white' : 'text-slate-400'
                      }`}
                      title="Delete Note"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                  <div
                    className={`text-[11px] truncate ${
                      isActive ? 'text-white/80' : 'text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    {note.content.slice(0, 40) || 'No additional text'}
                  </div>
                  <div
                    className={`text-[10px] ${
                      isActive ? 'text-white/70' : 'text-slate-400 dark:text-slate-500'
                    }`}
                  >
                    {note.updatedAt}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </aside>

      {/* Editor Main Canvas */}
      <main className="flex-1 flex flex-col h-full bg-white dark:bg-[#1E1E1E] overflow-hidden select-text">
        {activeNote ? (
          <>
            {/* Header info bar */}
            <div className="h-11 px-6 border-b border-black/10 dark:border-white/10 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-amber-500" />
                <span>{activeNote.updatedAt}</span>
              </span>
              <button
                onClick={() => handleDeleteNote(activeNote.id)}
                className="hover:text-red-500 transition p-1"
                title="Delete this note"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Note Title Input */}
            <div className="px-6 pt-4">
              <input
                type="text"
                value={activeNote.title}
                onChange={(e) => handleUpdateActiveNote('title', e.target.value)}
                placeholder="Note Title"
                className="w-full text-2xl font-bold bg-transparent outline-none text-slate-900 dark:text-slate-100 placeholder-slate-400"
              />
            </div>

            {/* Note Content Textarea */}
            <div className="flex-1 px-6 py-3 overflow-y-auto custom-scrollbar">
              <textarea
                value={activeNote.content}
                onChange={(e) => handleUpdateActiveNote('content', e.target.value)}
                placeholder="Write your note here... (Markdown supported)"
                className="w-full h-full bg-transparent resize-none outline-none text-sm text-slate-800 dark:text-slate-200 placeholder-slate-400 leading-relaxed font-sans"
              />
            </div>
          </>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-slate-400 text-sm">
            <span>No note selected</span>
            <button
              onClick={handleCreateNote}
              className="mt-2 text-xs text-amber-600 hover:underline"
            >
              Create a new note
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
