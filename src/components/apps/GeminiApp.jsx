import React, { useState, useEffect, useRef } from 'react';
import { GeminiIcon } from '../common/icons/AppIcons';
import { Send, Plus, Copy, Check, Sparkles, Code2, PenTool, Cpu, BarChart3 } from 'lucide-react';

const STARTER_PROMPTS = [
  {
    title: 'Code React Hook',
    desc: 'Write a clean useAudio player hook with progress scrubbing',
    icon: Code2,
    prompt: 'Write a clean, responsive useAudio React custom hook in JavaScript for controlling music playback, volume, and track progress.',
  },
  {
    title: 'Explain Architecture',
    desc: 'How does macOS Golden Gate simulator work?',
    icon: Cpu,
    prompt: 'Explain the architecture of the macOS Golden Gate Simulator, including Virtual File System, Window Manager, and glassmorphic design system.',
  },
  {
    title: 'Creative Writing',
    desc: 'Draft Apple-style marketing tagline for macOS 15',
    icon: PenTool,
    prompt: 'Draft an Apple-style keynote script introducing macOS Golden Gate with Liquid Glass and high performance web primitives.',
  },
  {
    title: 'Analyze Performance',
    desc: 'Compare CSS GPU transforms vs DOM reflows',
    icon: BarChart3,
    prompt: 'Compare CSS transforms (translate3d/scale) with direct DOM style top/left manipulation in terms of 60 FPS frame rate and compositing.',
  },
];

const PRESET_ANSWERS = {
  hook: `Here is a lightweight, responsive React custom hook for audio playback:

\`\`\`javascript
import { useState, useEffect, useRef } from 'react';

export function useAudio(url) {
  const audioRef = useRef(new Audio(url));
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    const updateProgress = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };
    audio.addEventListener('timeupdate', updateProgress);
    return () => {
      audio.pause();
      audio.removeEventListener('timeupdate', updateProgress);
    };
  }, []);

  const toggle = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return { isPlaying, toggle, progress };
}
\`\`\`

### Key Advantages:
- **Zero external dependencies**: Built directly on native \`HTMLAudioElement\`.
- **Automatic cleanup**: Pauses and unbinds listeners on unmount.
- **Accurate time tracking**: Emits real-time scrubbing percentages.`,

  default: `I am **Google Gemini**, running on macOS Golden Gate.

I can assist you with:
- **Architecture & System Design**: Building robust, scalable desktop web simulations.
- **Writing & Refining Code**: Clean React 18, Tailwind CSS tokens, and PointerEvents handling.
- **Productivity & Reasoning**: Answering complex queries, summarizing notes, or brainstorming features.

How can I help you take your project further today?`,
};

export default function GeminiApp() {
  const [model, setModel] = useState('Gemini 2.5 Flash');
  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem('macos_gemini_chat');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    try {
      localStorage.setItem('macos_gemini_chat', JSON.stringify(messages));
    } catch {
      // ignore
    }
  }, [messages]);

  const handleSend = (textToSend = input) => {
    const q = textToSend.trim();
    if (!q) return;

    const userMsg = { role: 'user', content: q, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response stream
    setTimeout(() => {
      let replyContent = PRESET_ANSWERS.default;
      const lower = q.toLowerCase();
      if (lower.includes('hook') || lower.includes('audio') || lower.includes('code') || lower.includes('react')) {
        replyContent = PRESET_ANSWERS.hook;
      } else if (lower.includes('architecture') || lower.includes('golden gate') || lower.includes('simulator')) {
        replyContent = `### macOS Golden Gate Architecture Overview\n\n1. **State Orchestration**:\n   - \`SystemContext\`: Manages global dark/light theme, display brightness overlay filter, master sound, and dynamic fluid wallpaper ribbons.\n   - \`FileSystemContext\`: Virtual File System (VFS) in-memory tree providing POSIX-like operations (\`createNode\`, \`deleteNode\`, \`renameNode\`).\n   - \`WindowContext\`: Window stacking layer with 8-way resize math and viewport boundary clamping.\n\n2. **Design Tokens & Craftsmanship**:\n   - 100% adherence to **Antislop** (contrast > 4.5:1, zero dead buttons, high accessibility).\n   - Specular glassmorphism using nested concentric border radiuses and \`backdrop-blur\`.`;
      } else if (lower.includes('tagline') || lower.includes('keynote') || lower.includes('apple')) {
        replyContent = `**"macOS Golden Gate. Beyond Fluid."**\n\n*"Today, we bring the speed of native engineering and the breathtaking translucency of Liquid Glass into a singular, unified desktop canvas. It is not just responsive—it is effortless."*\n\n- **Liquid Glass Architecture**: Light refractions that respond dynamically to your wallpaper.\n- **Precision Windowing**: 8-way boundary snapping with zero layout thrashing.\n- **Built-in Gemini Intelligence**: Direct AI workflow baked into the core system shell.`;
      }

      setMessages((prev) => [
        ...prev,
        {
          role: 'model',
          content: replyContent,
          model,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      setIsTyping(false);
    }, 700);
  };

  const copyCode = (code, index) => {
    navigator.clipboard?.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // Simple renderer for markdown-like blocks
  const renderMessageContent = (content, msgIndex) => {
    const codeBlockMatch = content.match(/```(\w+)?\n([\s\S]*?)```/);
    if (!codeBlockMatch) {
      return <div className="whitespace-pre-wrap leading-relaxed text-sm">{content}</div>;
    }

    const beforeCode = content.substring(0, codeBlockMatch.index);
    const lang = codeBlockMatch[1] || 'code';
    const code = codeBlockMatch[2];
    const afterCode = content.substring(codeBlockMatch.index + codeBlockMatch[0].length);

    return (
      <div className="space-y-3 text-sm leading-relaxed">
        {beforeCode && <div className="whitespace-pre-wrap">{beforeCode}</div>}
        <div className="rounded-xl overflow-hidden bg-slate-900 border border-slate-700/80 my-2">
          <div className="flex items-center justify-between px-3 py-1.5 bg-slate-800/80 border-b border-slate-700/80 text-xs text-slate-300">
            <span className="font-mono text-[11px]">{lang}</span>
            <button
              onClick={() => copyCode(code, msgIndex)}
              className="flex items-center space-x-1 hover:text-white transition px-2 py-0.5 rounded bg-slate-700/50 hover:bg-slate-700"
            >
              {copiedIndex === msgIndex ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedIndex === msgIndex ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
          <pre className="p-3 font-mono text-xs text-emerald-300 overflow-x-auto custom-scrollbar">
            {code}
          </pre>
        </div>
        {afterCode && <div className="whitespace-pre-wrap">{afterCode}</div>}
      </div>
    );
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-white dark:bg-[#15171C] text-slate-800 dark:text-slate-100 select-none overflow-hidden">
      {/* Top Header */}
      <div className="h-12 px-4 border-b border-black/10 dark:border-white/10 flex items-center justify-between bg-slate-50/70 dark:bg-white/[0.02]">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6">
            <GeminiIcon />
          </div>
          <span className="font-semibold text-sm">Gemini Desktop</span>
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="text-xs font-medium py-1 px-2 rounded-lg bg-black/5 dark:bg-white/10 border border-transparent focus:border-blue-500 outline-none cursor-pointer"
          >
            <option value="Gemini 2.5 Flash">Gemini 2.5 Flash</option>
            <option value="Gemini 2.5 Pro">Gemini 2.5 Pro</option>
            <option value="Gemini Ultra">Gemini Ultra</option>
          </select>
        </div>

        <button
          onClick={() => setMessages([])}
          className="flex items-center space-x-1 text-xs px-2.5 py-1 rounded-lg bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/15 transition font-medium"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Chat</span>
        </button>
      </div>

      {/* Chat Messages Body */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 custom-scrollbar select-text">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center max-w-lg mx-auto text-center">
            <div className="w-12 h-12 mb-3 drop-shadow-md">
              <GeminiIcon />
            </div>
            <h2 className="text-xl font-bold tracking-tight mb-1">How can I assist you today?</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
              Powered by Google Gemini multi-model intelligence on macOS simulator.
            </p>

            {/* Prompt Starter Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full text-left">
              {STARTER_PROMPTS.map((card, i) => {
                const Icon = card.icon;
                return (
                  <button
                    key={i}
                    onClick={() => handleSend(card.prompt)}
                    className="p-3 rounded-xl border border-black/10 dark:border-white/10 hover:border-blue-500/50 bg-slate-50/50 dark:bg-white/[0.03] hover:bg-blue-500/5 transition group flex flex-col gap-1 text-left"
                  >
                    <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 font-semibold text-xs">
                      <Icon className="w-4 h-4" />
                      <span>{card.title}</span>
                    </div>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
                      {card.desc}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          messages.map((msg, index) => {
            const isUser = msg.role === 'user';
            return (
              <div
                key={index}
                className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'} animate-in fade-in duration-150`}
              >
                {!isUser && (
                  <div className="w-7 h-7 flex-shrink-0 mt-0.5">
                    <GeminiIcon />
                  </div>
                )}
                <div
                  className={`max-w-[85%] sm:max-w-[78%] rounded-2xl p-3.5 ${
                    isUser
                      ? 'bg-blue-600 text-white rounded-br-sm'
                      : 'bg-slate-100 dark:bg-white/10 text-slate-800 dark:text-slate-100 rounded-bl-sm border border-black/5 dark:border-white/5'
                  }`}
                >
                  {renderMessageContent(msg.content, index)}
                  <div
                    className={`text-[10px] mt-2 text-right ${
                      isUser ? 'text-white/70' : 'text-slate-400'
                    }`}
                  >
                    {msg.time}
                  </div>
                </div>
              </div>
            );
          })
        )}

        {isTyping && (
          <div className="flex gap-3 justify-start animate-in fade-in">
            <div className="w-7 h-7 flex-shrink-0">
              <GeminiIcon />
            </div>
            <div className="bg-slate-100 dark:bg-white/10 rounded-2xl px-4 py-3 border border-black/5 dark:border-white/5 flex items-center space-x-1.5">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" />
              <div className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.15s]" />
              <div className="w-2 h-2 rounded-full bg-purple-500 animate-bounce [animation-delay:0.3s]" />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input composer */}
      <div className="p-3 border-t border-black/10 dark:border-white/10 bg-slate-50/50 dark:bg-white/[0.02]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="relative flex items-center"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Gemini anything..."
            className="w-full py-2.5 pl-4 pr-11 rounded-xl bg-black/5 dark:bg-white/10 border border-transparent focus:border-blue-500 outline-none text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="absolute right-2 p-1.5 rounded-lg bg-blue-600 disabled:opacity-30 disabled:pointer-events-none text-white transition active:scale-95 shadow-sm"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
}
