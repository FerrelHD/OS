import React, { createContext, useContext, useState, useEffect } from 'react';

const FileSystemContext = createContext(null);

const INITIAL_VFS = {
  root: {
    id: 'root',
    name: 'Macintosh HD',
    type: 'folder',
    parentId: null,
    children: ['users'],
  },
  users: {
    id: 'users',
    name: 'Users',
    type: 'folder',
    parentId: 'root',
    children: ['admin'],
  },
  admin: {
    id: 'admin',
    name: 'admin',
    type: 'folder',
    parentId: 'users',
    children: ['desktop', 'documents', 'downloads', 'pictures', 'projects'],
  },
  desktop: {
    id: 'desktop',
    name: 'Desktop',
    type: 'folder',
    parentId: 'admin',
    children: ['welcome_note', 'project_overview'],
  },
  documents: {
    id: 'documents',
    name: 'Documents',
    type: 'folder',
    parentId: 'admin',
    children: ['resume', 'notes_draft'],
  },
  downloads: {
    id: 'downloads',
    name: 'Downloads',
    type: 'folder',
    parentId: 'admin',
    children: ['golden_gate_spec'],
  },
  pictures: {
    id: 'pictures',
    name: 'Pictures',
    type: 'folder',
    parentId: 'admin',
    children: ['golden_gate_sunset', 'san_francisco_bay'],
  },
  projects: {
    id: 'projects',
    name: 'Projects',
    type: 'folder',
    parentId: 'admin',
    children: ['macos_simulator'],
  },
  // Initial Files
  welcome_note: {
    id: 'welcome_note',
    name: 'Welcome to macOS.txt',
    type: 'file',
    fileType: 'text',
    parentId: 'desktop',
    content: 'Welcome to macOS Golden Gate Desktop Simulator!\n\nFeatures:\n- 10 interactive native apps\n- Fluid window manager with 8-way resize\n- Spotlight with instant calculator\n- High-fidelity frosted glass Liquid Glass UI\n- Google Gemini AI Assistant integration',
    updatedAt: new Date().toLocaleDateString(),
    size: '1.2 KB',
  },
  project_overview: {
    id: 'project_overview',
    name: 'Golden Gate Concept.md',
    type: 'file',
    fileType: 'text',
    parentId: 'desktop',
    content: '# macOS 27 Golden Gate\nA futuristic, fluid, and ultra-responsive desktop simulator crafted in React 18 and Tailwind CSS.\n\nEnjoy exploring Finder, Safari, Terminal, Gemini, and more.',
    updatedAt: new Date().toLocaleDateString(),
    size: '2.4 KB',
  },
  resume: {
    id: 'resume',
    name: 'Curriculum_Vitae.pdf',
    type: 'file',
    fileType: 'pdf',
    parentId: 'documents',
    content: 'Senior Frontend Engineer & UI/UX Specialist Portfolio Resume.',
    updatedAt: new Date().toLocaleDateString(),
    size: '142 KB',
  },
  notes_draft: {
    id: 'notes_draft',
    name: 'Ideas.txt',
    type: 'file',
    fileType: 'text',
    parentId: 'documents',
    content: '- Build Apple HIG components\n- Add terminal ASCII art for neofetch\n- Connect live audio tracks in Music app',
    updatedAt: new Date().toLocaleDateString(),
    size: '850 B',
  },
  golden_gate_spec: {
    id: 'golden_gate_spec',
    name: 'system_architecture.json',
    type: 'file',
    fileType: 'text',
    parentId: 'downloads',
    content: '{\n  "version": "macOS 27.0",\n  "codename": "Golden Gate",\n  "kernel": "Darwin 24.1.0",\n  "architecture": "arm64"\n}',
    updatedAt: new Date().toLocaleDateString(),
    size: '310 B',
  },
  golden_gate_sunset: {
    id: 'golden_gate_sunset',
    name: 'Golden Gate Sunset.jpg',
    type: 'file',
    fileType: 'image',
    parentId: 'pictures',
    url: 'https://images.unsplash.com/photo-1506146332389-18140dc7b2fb?auto=format&fit=crop&w=1200&q=80',
    updatedAt: new Date().toLocaleDateString(),
    size: '2.8 MB',
  },
  san_francisco_bay: {
    id: 'san_francisco_bay',
    name: 'San Francisco Bay.jpg',
    type: 'file',
    fileType: 'image',
    parentId: 'pictures',
    url: 'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?auto=format&fit=crop&w=1200&q=80',
    updatedAt: new Date().toLocaleDateString(),
    size: '3.4 MB',
  },
  macos_simulator: {
    id: 'macos_simulator',
    name: 'App.jsx',
    type: 'file',
    fileType: 'text',
    parentId: 'projects',
    content: '// macOS Golden Gate Source Code\nexport default function App() {\n  return <Desktop />;\n}',
    updatedAt: new Date().toLocaleDateString(),
    size: '980 B',
  },
};

export const FileSystemProvider = ({ children }) => {
  const [fs, setFs] = useState(() => {
    try {
      const saved = localStorage.getItem('macos_vfs');
      return saved ? JSON.parse(saved) : INITIAL_VFS;
    } catch {
      return INITIAL_VFS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('macos_vfs', JSON.stringify(fs));
    } catch {
      // LocalStorage quota fallback
    }
  }, [fs]);

  const getNode = (id) => fs[id] || null;

  const getChildren = (folderId) => {
    const folder = fs[folderId];
    if (!folder || !folder.children) return [];
    return folder.children.map((childId) => fs[childId]).filter(Boolean);
  };

  const createNode = ({ name, type, parentId, content = '', fileType = 'text', url = '' }) => {
    const id = `node_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
    const newNode = {
      id,
      name,
      type,
      parentId,
      ...(type === 'file' ? { fileType, content, url, size: `${Math.max(1, Math.round(content.length / 1024))} KB` } : { children: [] }),
      updatedAt: new Date().toLocaleDateString(),
    };

    setFs((prev) => {
      const parent = prev[parentId];
      if (!parent) return prev;
      return {
        ...prev,
        [id]: newNode,
        [parentId]: {
          ...parent,
          children: [...(parent.children || []), id],
        },
      };
    });
    return id;
  };

  const renameNode = (id, newName) => {
    setFs((prev) => {
      const node = prev[id];
      if (!node) return prev;
      return {
        ...prev,
        [id]: { ...node, name: newName, updatedAt: new Date().toLocaleDateString() },
      };
    });
  };

  const deleteNode = (id) => {
    setFs((prev) => {
      const node = prev[id];
      if (!node || !node.parentId) return prev;
      const parent = prev[node.parentId];
      if (!parent) return prev;

      const newParentChildren = (parent.children || []).filter((childId) => childId !== id);
      const nextFs = { ...prev, [node.parentId]: { ...parent, children: newParentChildren } };
      delete nextFs[id];
      return nextFs;
    });
  };

  const updateFileContent = (id, newContent) => {
    setFs((prev) => {
      const node = prev[id];
      if (!node || node.type !== 'file') return prev;
      return {
        ...prev,
        [id]: {
          ...node,
          content: newContent,
          size: `${Math.max(1, Math.round(newContent.length / 1024))} KB`,
          updatedAt: new Date().toLocaleDateString(),
        },
      };
    });
  };

  return (
    <FileSystemContext.Provider
      value={{
        fs,
        getNode,
        getChildren,
        createNode,
        renameNode,
        deleteNode,
        updateFileContent,
      }}
    >
      {children}
    </FileSystemContext.Provider>
  );
};

export const useFileSystem = () => {
  const context = useContext(FileSystemContext);
  if (!context) throw new Error('useFileSystem must be used within FileSystemProvider');
  return context;
};
