import {
  FinderIcon,
  SafariIcon,
  GeminiIcon,
  MusicIcon,
  PhotosIcon,
  MessagesIcon,
  NotesIcon,
  TerminalIcon,
  CalculatorIcon,
  SettingsIcon,
} from '../components/common/icons/AppIcons';

export const APPS = [
  { id: 'finder', name: 'Finder', icon: FinderIcon },
  { id: 'safari', name: 'Safari', icon: SafariIcon },
  { id: 'gemini', name: 'Gemini', icon: GeminiIcon },
  { id: 'messages', name: 'Messages', icon: MessagesIcon },
  { id: 'music', name: 'Music', icon: MusicIcon },
  { id: 'photos', name: 'Photos', icon: PhotosIcon },
  { id: 'notes', name: 'Notes', icon: NotesIcon },
  { id: 'terminal', name: 'Terminal', icon: TerminalIcon },
  { id: 'calculator', name: 'Calculator', icon: CalculatorIcon },
  { id: 'settings', name: 'Settings', icon: SettingsIcon },
];

export const getAppIcon = (appId) => {
  const app = APPS.find((a) => a.id === appId);
  return app ? app.icon : FinderIcon;
};
