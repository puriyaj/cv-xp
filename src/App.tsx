
import { useEffect, useState } from 'react';
import { XP } from './theme/xp.theme';
import './App.css'
import { Window } from './cmp/Window';
import { AboutWindow } from './cmp/AboutWindow';
import { ProjectsWindow } from './cmp/ProjectsWindow';
import { SkillsWindow } from './cmp/SkillsWindow';
import { ContactWindow } from './cmp/ContactWindow';
import { ErrorDialog } from './cmp/ErrorDialog';
import { StartMenu } from './cmp/StartMenu';
import { DesktopIcon } from './cmp/DesktopIcon';

const WINDOWS_CONFIG = [
  { id:"about",    title:"About Me — Alex Rivera",    icon:"👨‍💻", defaultPos:{ top:40,  left:60  }, defaultSize:{ width:520, height:380 }, content:"about" },
  { id:"projects", title:"My Projects",               icon:"📁", defaultPos:{ top:80,  left:200 }, defaultSize:{ width:560, height:380 }, content:"projects" },
  { id:"skills",   title:"Skills & Technologies",     icon:"⭐", defaultPos:{ top:120, left:320 }, defaultSize:{ width:500, height:340 }, content:"skills" },
  { id:"contact",  title:"Contact — New Message",     icon:"📧", defaultPos:{ top:60,  left:480 }, defaultSize:{ width:420, height:380 }, content:"contact" },
];
function App() {
 const [openWindows, setOpenWindows] = useState(["about"]);
  const [minimized, setMinimized]     = useState([]);
  const [zOrder, setZOrder]           = useState(["about"]);
  const [startOpen, setStartOpen]     = useState(false);
  const [showError, setShowError]     = useState(false);
  const [time, setTime]               = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const openWindow = (id) => {
    setOpenWindows(prev => prev.includes(id) ? prev : [...prev, id]);
    setMinimized(prev => prev.filter(m => m !== id));
    setZOrder(prev => [...prev.filter(z => z !== id), id]);
  };

  const closeWindow = (id) => {
    setOpenWindows(prev => prev.filter(w => w !== id));
    setMinimized(prev => prev.filter(m => m !== id));
    setZOrder(prev => prev.filter(z => z !== id));
  };

  const minimizeWindow = (id) => {
    setMinimized(prev => prev.includes(id) ? prev : [...prev, id]);
  };

  const focusWindow = (id) => {
    setZOrder(prev => [...prev.filter(z => z !== id), id]);
    setMinimized(prev => prev.filter(m => m !== id));
  };

  const handleStartMenuOpen = (label) => {
    const map = { "My Projects": "projects", "Resume.doc": "contact" };
    if (map[label]) openWindow(map[label]);
  };

  const timeStr = time.toLocaleTimeString([], { hour:"2-digit", minute:"2-digit" });


  return (
    <div
      className="relative w-full h-screen overflow-hidden"
      style={{ background: XP.desktop }}
      onClick={() => startOpen && setStartOpen(false)}
    >
      {/* Bliss-like background gradient */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 100% 60% at 50% 110%, #6aaa3a 0%, #3a6ea5 55%)",
        opacity: 0.85,
      }} />

      {/* Desktop icons */}
      <div className="absolute top-6 left-6 flex flex-col gap-6">
        {[
          { icon:"🖥️", label:"My Computer",   id:null },
          { icon:"📂", label:"My Documents",  id:null },
          { icon:"👨‍💻", label:"About Me",       id:"about" },
          { icon:"📁", label:"Projects",       id:"projects" },
          { icon:"⭐", label:"My Skills",      id:"skills" },
          { icon:"📧", label:"Contact",        id:"contact" },
          { icon:"🗑️", label:"Recycle Bin",   id:null },
        ].map((ic) => (
          <DesktopIcon key={ic.label} icon={ic.icon} label={ic.label} onDoubleClick={() => ic.id && openWindow(ic.id)} />
        ))}
      </div>

      {/* Windows */}
      {WINDOWS_CONFIG.map((cfg) => {
        if (!openWindows.includes(cfg.id)) return null;
        if (minimized.includes(cfg.id)) return null;
        const z = zOrder.indexOf(cfg.id) + 10;
        return (
          <Window
            key={cfg.id}
            title={cfg.title}
            icon={cfg.icon}
            onClose={() => closeWindow(cfg.id)}
            onMinimize={() => minimizeWindow(cfg.id)}
            style={{
              ...cfg.defaultPos,
              ...cfg.defaultSize,
              zIndex: z,
            }}
            onClick={() => focusWindow(cfg.id)}
          >
            {cfg.content === "about"    && <AboutWindow />}
            {cfg.content === "projects" && <ProjectsWindow />}
            {cfg.content === "skills"   && <SkillsWindow />}
            {cfg.content === "contact"  && <ContactWindow onError={() => setShowError(true)} />}
          </Window>
        );
      })}

      {/* Error Dialog */}
      {showError && <ErrorDialog onClose={() => setShowError(false)} />}

      {/* Start Menu */}
      {startOpen && (
        <StartMenu onClose={() => setStartOpen(false)} onOpen={handleStartMenuOpen} />
      )}

      {/* Taskbar */}
      <div
        className="absolute bottom-0 left-0 right-0 flex items-center px-0"
        style={{ height:40, background:XP.taskbar, zIndex:100, boxShadow:"0 -1px 0 rgba(255,255,255,0.2)" }}
        onClick={e => e.stopPropagation()}
      >
        {/* Start Button */}
        <button
          className="flex items-center gap-1 px-3 h-full text-white font-bold text-sm"
          style={{
            background: XP.startBtn,
            borderRadius: "0 12px 12px 0",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.4), 2px 0 4px rgba(0,0,0,0.3)",
            fontFamily: "Tahoma, sans-serif",
            fontStyle: "italic",
            marginRight: 6,
            textShadow: "1px 1px 2px #000",
          }}
          onClick={() => setStartOpen(v => !v)}
        >
          <span className="text-lg">⊞</span> start
        </button>

        {/* Divider */}
        <div className="h-6 w-px bg-white/20 mr-2" />

        {/* Open window buttons */}
        <div className="flex gap-1 flex-1 overflow-hidden">
          {WINDOWS_CONFIG.filter(c => openWindows.includes(c.id)).map(c => {
            const isActive = !minimized.includes(c.id) && zOrder[zOrder.length - 1] === c.id;
            return (
              <button
                key={c.id}
                onClick={() => {
                  if (minimized.includes(c.id)) {
                    setMinimized(prev => prev.filter(m => m !== c.id));
                    focusWindow(c.id);
                  } else if (isActive) {
                    minimizeWindow(c.id);
                  } else {
                    focusWindow(c.id);
                  }
                }}
                className="flex items-center gap-1 px-2 py-1 text-xs text-white truncate max-w-36"
                style={{
                  background: isActive
                    ? "linear-gradient(180deg,#2a5ad8 0%,#1a4ac8 100%)"
                    : "linear-gradient(180deg,#3a7af8 0%,#2060e8 100%)",
                  border: isActive ? "1px solid #1040b0 inset" : "1px solid rgba(255,255,255,0.2)",
                  borderRadius: 3,
                  fontFamily: "Tahoma, sans-serif",
                  textShadow: "1px 1px 1px #000",
                  boxShadow: isActive ? "inset 1px 1px 3px rgba(0,0,0,0.4)" : "0 1px 0 rgba(255,255,255,0.2) inset",
                }}
              >
                <span>{c.icon}</span>
                <span className="truncate">{c.title}</span>
              </button>
            );
          })}
        </div>

        {/* System tray */}
        <div
          className="flex items-center gap-2 px-3 h-full text-white text-xs"
          style={{
            background: "linear-gradient(180deg,#1249c0 0%,#0f3aaa 100%)",
            borderLeft: "1px solid rgba(255,255,255,0.2)",
            fontFamily: "Tahoma, sans-serif",
          }}
        >
          <span>🔊</span>
          <span>🌐</span>
          <span className="ml-1">{timeStr}</span>
        </div>
      </div>
    </div>
  );
}

export default App
