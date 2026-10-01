import React from 'react';
import { SystemProvider } from './context/SystemContext';
import { FileSystemProvider } from './context/FileSystemContext';
import { WindowProvider } from './context/WindowContext';
import { useShortcuts } from './hooks/useShortcuts';
import Desktop from './components/desktop/Desktop';

function Shell() {
  useShortcuts();
  return <Desktop />;
}

export default function App() {
  return (
    <SystemProvider>
      <FileSystemProvider>
        <WindowProvider>
          <Shell />
        </WindowProvider>
      </FileSystemProvider>
    </SystemProvider>
  );
}
