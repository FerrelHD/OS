import React, { useState, useEffect, useRef } from 'react';
import { useFileSystem } from '../../context/FileSystemContext';
import { useSystem } from '../../context/SystemContext';

const NEOFETCH_ART = `
                    'c.
                 ,xNMM.
               .OMMMMo
               OMMM0,
     .;loddo:' loolloddol;.
   cKMMMMMMMMMMNWMMMMMMMMMM0:
 .KMMMMMMMMMMMMMMMMMMMMMMMWd.    OS: macOS Golden Gate 15.0
 XMUWWWWWWWWWWWWWWWWWWWWWWd      Host: MacBook Pro 16-inch (2024)
 kMMMMMMMMMMMMMMMMMMMMMMMMWd.    Kernel: Darwin 24.0.0
 .XMMMMMMMMMMMMMMMMMMMMMMMMMXc   Uptime: 4 days, 12 hours
  .KMMMMMMMMMMMMMMMMMMMMMMMWd.   Shell: zsh 5.9 (arm64-apple-darwin24)
    .coocooooccccccoooocoo:.     Resolution: 3456x2234 Liquid Retina
        kMMMMMMMMMMMMMMk         DE: Aqua Liquid Glass
        .XMMMMMMMMMMMMX.         CPU: Apple M3 Max (16-core)
          .OWMMMMMMW0;           GPU: Apple M3 Max (40-core)
            .;lool;.             Memory: 18432MiB / 36864MiB
`;

export default function TerminalApp() {
  const { fs, getChildren } = useFileSystem();
  const { updateSetting, theme } = useSystem();

  const [currentPath, setCurrentPath] = useState('admin');
  const [history, setHistory] = useState([
    {
      type: 'system',
      text: 'Last login: Mon Oct 5 20:49:12 on ttys001\nType "help" to see available terminal commands.',
    },
  ]);
  const [inputVal, setInputVal] = useState('');
  const [cmdHistory, setCmdHistory] = useState([]);
  const [historyCursor, setHistoryCursor] = useState(-1);

  const terminalEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (cmdText) => {
    const trimmed = cmdText.trim();
    if (!trimmed) {
      setHistory((prev) => [...prev, { type: 'prompt', prompt: `admin@macbook-pro ${currentPath} %`, text: '' }]);
      return;
    }

    setCmdHistory((prev) => [...prev, trimmed]);
    setHistoryCursor(-1);

    const parts = trimmed.split(' ');
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    const newEntries = [{ type: 'prompt', prompt: `admin@macbook-pro ${currentPath} %`, text: trimmed }];

    switch (cmd) {
      case 'help':
        newEntries.push({
          type: 'output',
          text: `macOS Golden Gate ZSH Interactive Shell
Available commands:
  help               Show this help manual
  ls                 List files in current virtual directory
  cd <dir>           Change directory (e.g. cd desktop, cd ..)
  cat <file>         Print file contents
  pwd                Print current working directory
  clear              Clear terminal screen
  whoami             Print current user username
  date               Display system date and time
  neofetch           System and hardware specifications banner
  theme <dark|light> Switch system appearance theme
  echo <message>     Display a line of text`,
        });
        break;

      case 'clear':
        setHistory([]);
        return;

      case 'whoami':
        newEntries.push({ type: 'output', text: 'admin (Administrator)' });
        break;

      case 'date':
        newEntries.push({ type: 'output', text: new Date().toString() });
        break;

      case 'pwd':
        newEntries.push({ type: 'output', text: `/Users/admin/${currentPath === 'admin' ? '' : currentPath}` });
        break;

      case 'ls': {
        const items = getChildren(currentPath);
        if (items.length === 0) {
          newEntries.push({ type: 'output', text: '(directory is empty)' });
        } else {
          const formatted = items
            .map((item) => `${item.name}${item.type === 'folder' ? '/' : ''}`)
            .join('    ');
          newEntries.push({ type: 'output', text: formatted });
        }
        break;
      }

      case 'cd': {
        const target = args[0];
        if (!target || target === '~' || target === 'admin') {
          setCurrentPath('admin');
        } else if (target === '..') {
          const currentObj = fs[currentPath];
          if (currentObj && currentObj.parentId && currentObj.parentId !== 'root') {
            setCurrentPath(currentObj.parentId);
          } else {
            setCurrentPath('admin');
          }
        } else {
          const items = getChildren(currentPath);
          const found = items.find(
            (i) => i.name.toLowerCase() === target.toLowerCase() && i.type === 'folder'
          );
          if (found) {
            setCurrentPath(found.id);
          } else {
            newEntries.push({ type: 'error', text: `cd: no such file or directory: ${target}` });
          }
        }
        break;
      }

      case 'cat': {
        const target = args[0];
        if (!target) {
          newEntries.push({ type: 'error', text: 'cat: missing filename' });
        } else {
          const items = getChildren(currentPath);
          const found = items.find(
            (i) => i.name.toLowerCase() === target.toLowerCase() && i.type === 'file'
          );
          if (found) {
            newEntries.push({ type: 'output', text: found.content || '(empty file)' });
          } else {
            newEntries.push({ type: 'error', text: `cat: ${target}: No such file or directory` });
          }
        }
        break;
      }

      case 'neofetch':
        newEntries.push({ type: 'output', text: NEOFETCH_ART });
        break;

      case 'theme': {
        const mode = args[0]?.toLowerCase();
        if (mode === 'dark' || mode === 'light') {
          updateSetting('theme', mode);
          newEntries.push({ type: 'output', text: `System theme changed to ${mode} mode.` });
        } else {
          newEntries.push({
            type: 'error',
            text: `Usage: theme <dark|light> (Current: ${theme})`,
          });
        }
        break;
      }

      case 'echo':
        newEntries.push({ type: 'output', text: args.join(' ') });
        break;

      default:
        newEntries.push({
          type: 'error',
          text: `zsh: command not found: ${cmd}. Type "help" for a list of commands.`,
        });
        break;
    }

    setHistory((prev) => [...prev, ...newEntries]);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCommand(inputVal);
      setInputVal('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const nextCursor = historyCursor === -1 ? cmdHistory.length - 1 : Math.max(0, historyCursor - 1);
      setHistoryCursor(nextCursor);
      setInputVal(cmdHistory[nextCursor] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyCursor === -1) return;
      const nextCursor = historyCursor + 1;
      if (nextCursor >= cmdHistory.length) {
        setHistoryCursor(-1);
        setInputVal('');
      } else {
        setHistoryCursor(nextCursor);
        setInputVal(cmdHistory[nextCursor] || '');
      }
    }
  };

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className="flex-1 h-full w-full bg-[#0F172A]/95 text-[#F8FAFC] font-mono text-[13px] p-3 overflow-y-auto select-text flex flex-col leading-relaxed custom-scrollbar"
    >
      {/* History Items */}
      {history.map((item, index) => {
        if (item.type === 'system') {
          return (
            <div key={index} className="text-slate-400 mb-2 whitespace-pre-wrap">
              {item.text}
            </div>
          );
        }
        if (item.type === 'prompt') {
          return (
            <div key={index} className="flex items-start space-x-2">
              <span className="text-emerald-400 font-semibold flex-shrink-0">{item.prompt}</span>
              <span className="text-white break-all">{item.text}</span>
            </div>
          );
        }
        if (item.type === 'error') {
          return (
            <div key={index} className="text-rose-400 mb-1 whitespace-pre-wrap">
              {item.text}
            </div>
          );
        }
        return (
          <div key={index} className="text-slate-200 mb-1 whitespace-pre-wrap">
            {item.text}
          </div>
        );
      })}

      {/* Active Prompt Line */}
      <div className="flex items-center space-x-2 mt-1">
        <span className="text-emerald-400 font-semibold flex-shrink-0">
          admin@macbook-pro {currentPath} %
        </span>
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          className="flex-1 bg-transparent border-none outline-none text-white font-mono text-[13px] p-0 caret-emerald-400"
          aria-label="Terminal input"
        />
      </div>

      <div ref={terminalEndRef} />
    </div>
  );
}
