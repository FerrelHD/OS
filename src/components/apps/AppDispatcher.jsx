import React from 'react';
import FinderApp from './FinderApp';
import SafariApp from './SafariApp';
import GeminiApp from './GeminiApp';
import MessagesApp from './MessagesApp';
import MusicApp from './MusicApp';
import PhotosApp from './PhotosApp';
import NotesApp from './NotesApp';
import TerminalApp from './TerminalApp';
import CalculatorApp from './CalculatorApp';
import SettingsApp from './SettingsApp';

export default function AppDispatcher({ appId, windowProps }) {
  switch (appId) {
    case 'finder':
      return <FinderApp {...windowProps} />;
    case 'safari':
      return <SafariApp {...windowProps} />;
    case 'gemini':
      return <GeminiApp {...windowProps} />;
    case 'messages':
      return <MessagesApp {...windowProps} />;
    case 'music':
      return <MusicApp {...windowProps} />;
    case 'photos':
      return <PhotosApp {...windowProps} />;
    case 'notes':
      return <NotesApp {...windowProps} />;
    case 'terminal':
      return <TerminalApp {...windowProps} />;
    case 'calculator':
      return <CalculatorApp {...windowProps} />;
    case 'settings':
      return <SettingsApp {...windowProps} />;
    default:
      return (
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center text-slate-500">
          <p className="text-sm font-semibold">Unknown application: {appId}</p>
        </div>
      );
  }
}
