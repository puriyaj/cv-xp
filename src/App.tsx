import { useEffect, useState, type JSX } from "react";
import { XP } from "./theme/xp.theme";
import "./App.css";
import { Window } from "./cmp/Window";
import { AboutWindow } from "./cmp/AboutWindow";
import { ProjectsWindow } from "./cmp/ProjectsWindow";
import { SkillsWindow } from "./cmp/SkillsWindow";
import { ContactWindow } from "./cmp/ContactWindow";
import { ErrorDialog } from "./cmp/ErrorDialog";
import { StartMenu } from "./cmp/StartMenu";
import { DesktopIcon } from "./cmp/DesktopIcon";
import type { ErrorDialogTheme } from "./types/ErrorDialog.types";
import type { StartMenuTheme } from "./types/StartMenu.types";

/* =========================
   Types
========================= */

type WindowId = "about" | "projects" | "skills" | "contact";

interface MenuItem {
  icon: string;
  label: string;
  onClick?: () => void;
}

interface WindowConfig {
  id: WindowId;
  title: string;
  icon: string;
  defaultPos: {
    top: number;
    left: number;
  };
  defaultSize: {
    width: number;
    height: number;
  };
  content: WindowId;
}

/* =========================
   Constants
========================= */

const RIGHT_ITEMS: MenuItem[] = [
  { icon: "🖥️", label: "My Computer" },
  { icon: "📂", label: "My Documents" },
  { icon: "🌐", label: "My Network" },
  { icon: "🗑️", label: "Recycle Bin" },
  { icon: "⚙️", label: "Control Panel" },
  { icon: "🖨️", label: "Printers" },
];

const LEFT_PRIMARY_ITEMS: MenuItem[] = [
  { icon: "🌐", label: "Internet Explorer", onClick: () => {} },
  { icon: "📧", label: "Outlook Express", onClick: () => {} },
  { icon: "📁", label: "My Projects", onClick: () => {} },
  { icon: "📄", label: "Resume.doc", onClick: () => {} },
];

const WINDOWS_CONFIG: WindowConfig[] = [
  {
    id: "about",
    title: "About Me — Pouria Jangjooymehrangiz",
    icon: "👨‍💻",
    defaultPos: { top: 40, left: 60 },
    defaultSize: { width: 520, height: 380 },
    content: "about",
  },
  {
    id: "projects",
    title: "My Projects",
    icon: "📁",
    defaultPos: { top: 80, left: 200 },
    defaultSize: { width: 650, height: 380 },
    content: "projects",
  },
  {
    id: "skills",
    title: "Skills & Technologies",
    icon: "⭐",
    defaultPos: { top: 120, left: 320 },
    defaultSize: { width: 500, height: 340 },
    content: "skills",
  },
  {
    id: "contact",
    title: "Contact — New Message",
    icon: "📧",
    defaultPos: { top: 60, left: 480 },
    defaultSize: { width: 420, height: 380 },
    content: "contact",
  },
];

/* =========================
   Component
========================= */
export const xpErrorDialogTheme: ErrorDialogTheme = {
  windowBg: XP.windowBg,
  titleGradient: XP.titleActive,
  border: XP.border,
  closeGradient: XP.btnClose,
};
export const xpStartMenuTheme: StartMenuTheme = {
  border: XP.border,
  headerGradient: XP.taskbar,
  sidebarGradient: XP.blueSidebar,
};
function App(): JSX.Element {
  const [openWindows, setOpenWindows] = useState<WindowId[]>(["about"]);
  const [minimized, setMinimized] = useState<WindowId[]>([]);
  const [zOrder, setZOrder] = useState<WindowId[]>(["about"]);
  const [startOpen, setStartOpen] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);
  const [time, setTime] = useState<Date>(new Date());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const openWindow = (id: WindowId): void => {
    setOpenWindows((prev) => (prev.includes(id) ? prev : [...prev, id]));
    setMinimized((prev) => prev.filter((m) => m !== id));
    setZOrder((prev) => [...prev.filter((z) => z !== id), id]);
  };

  const closeWindow = (id: WindowId): void => {
    setOpenWindows((prev) => prev.filter((w) => w !== id));
    setMinimized((prev) => prev.filter((m) => m !== id));
    setZOrder((prev) => prev.filter((z) => z !== id));
  };

  const minimizeWindow = (id: WindowId): void => {
    setMinimized((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  const focusWindow = (id: WindowId): void => {
    setZOrder((prev) => [...prev.filter((z) => z !== id), id]);
    setMinimized((prev) => prev.filter((m) => m !== id));
  };

  const handleStartMenuOpen = (label: string): void => {
    const map: Record<string, WindowId> = {
      "My Projects": "projects",
      "Resume.doc": "contact",
    };

    if (map[label]) openWindow(map[label]);
  };

  const timeStr = time.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      className="relative w-full h-screen overflow-hidden"
      style={{ background: XP.desktop }}
      onClick={() => startOpen && setStartOpen(false)}
    >
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 100% 60% at 50% 110%, #6aaa3a 0%, #3a6ea5 55%)",
          opacity: 0.85,
        }}
      />

      {/* Desktop icons */}
      <div className="absolute top-6 left-6 flex flex-col gap-6">
        {[
          { icon: "🖥️", label: "My Computer", id: null },
          { icon: "👨‍💻", label: "About Me", id: "about" as WindowId },
          { icon: "📁", label: "Projects", id: "projects" as WindowId },
          { icon: "⭐", label: "My Skills", id: "skills" as WindowId },
          { icon: "📧", label: "Contact", id: "contact" as WindowId },
          { icon: "🗑️", label: "Recycle Bin", id: null },
        ].map((ic) => (
          <DesktopIcon
            key={ic.label}
            icon={ic.icon}
            label={ic.label}
            onDoubleClick={() => ic.id && openWindow(ic.id)}
          />
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
            width={cfg.defaultSize.width}
  height={cfg.defaultSize.height}
            onClose={() => closeWindow(cfg.id)}
            onMinimize={() => minimizeWindow(cfg.id)}
            style={{
              ...cfg.defaultPos,
              ...cfg.defaultSize,
              zIndex: z,
            }}
            onClick={() => focusWindow(cfg.id)}
          >
            {cfg.content === "about" && (
              <AboutWindow onContactClick={openWindow} />
            )}
            {cfg.content === "projects" && <ProjectsWindow />}
            {cfg.content === "skills" && <SkillsWindow />}
            {cfg.content === "contact" && (
              <ContactWindow onError={() => setShowError(true)} />
            )}
          </Window>
        );
      })}

      {/* Error Dialog */}
      {showError && <ErrorDialog theme={xpErrorDialogTheme} message="An error occurred." onClose={() => setShowError(false)} />}

      {/* Start Menu */}
      {startOpen && (
        <StartMenu
          rightItems={RIGHT_ITEMS}
          leftPrimaryItems={LEFT_PRIMARY_ITEMS}
          onClose={() => setStartOpen(false)}
         userName="Pouria Jangjooymehrangiz"
         theme={xpStartMenuTheme}
         onClick={(label) => handleStartMenuOpen(label)}
        />
      )}

      {/* Taskbar */}
      <div
        className="absolute bottom-0 left-0 right-0 flex items-center px-0"
        style={{
          height: 40,
          background: XP.taskbar,
          zIndex: 100,
          boxShadow: "0 -1px 0 rgba(255,255,255,0.2)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="flex items-center gap-1 px-3 h-full text-white font-bold text-sm"
          style={{
            background: XP.startBtn,
            borderRadius: "0 12px 12px 0",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.4), 2px 0 4px rgba(0,0,0,0.3)",
            fontFamily: "Tahoma, sans-serif",
            fontStyle: "italic",
            marginRight: 6,
            textShadow: "1px 1px 2px #000",
          }}
          onClick={() => setStartOpen((v) => !v)}
        >
          <span className="text-lg">⊞</span> start
        </button>

        <div className="h-6 w-px bg-white/20 mr-2" />

        <div className="flex gap-1 flex-1 overflow-hidden">
          {WINDOWS_CONFIG.filter((c) => openWindows.includes(c.id)).map(
            (c) => {
              const isActive =
                !minimized.includes(c.id) &&
                zOrder[zOrder.length - 1] === c.id;

              return (
                <button
                  key={c.id}
                  onClick={() => {
                    if (minimized.includes(c.id)) {
                      setMinimized((prev) =>
                        prev.filter((m) => m !== c.id)
                      );
                      focusWindow(c.id);
                    } else if (isActive) {
                      minimizeWindow(c.id);
                    } else {
                      focusWindow(c.id);
                    }
                  }}
                  className="flex items-center gap-1 px-2 py-1 text-xs text-white truncate max-w-36"
                >
                  <span>{c.icon}</span>
                  <span className="truncate">{c.title}</span>
                </button>
              );
            }
          )}
        </div>

        <div
          className="flex items-center gap-2 px-3 h-full text-white text-xs"
          style={{
            background:
              "linear-gradient(180deg,#1249c0 0%,#0f3aaa 100%)",
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

export default App;