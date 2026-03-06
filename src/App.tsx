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
   Mobile nav items
========================= */
const MOBILE_NAV: { id: WindowId; icon: string; label: string }[] = [
  { id: "about", icon: "👨‍💻", label: "About" },
  { id: "projects", icon: "📁", label: "Projects" },
  { id: "skills", icon: "⭐", label: "Skills" },
  { id: "contact", icon: "📧", label: "Contact" },
];

/* =========================
   Hook: detect mobile
========================= */
function useIsMobile(breakpoint = 768): boolean {
  const [isMobile, setIsMobile] = useState(
    () => window.innerWidth < breakpoint
  );

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    setIsMobile(mq.matches);
    return () => mq.removeEventListener("change", handler);
  }, [breakpoint]);

  return isMobile;
}

/* =========================
   Theme exports
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

/* =========================
   Mobile Sheet Component
========================= */
interface MobileSheetProps {
  cfg: WindowConfig;
  onClose: () => void;
  showError: () => void;
  openWindow: (id: WindowId) => void;
}

function MobileSheet({ cfg, onClose, showError, openWindow }: MobileSheetProps) {
  return (
    <div
      style={{
        position: "fixed",
        top: 36,
        left: 0,
        right: 0,
        bottom: 56,
        zIndex: 200,
        display: "flex",
        flexDirection: "column",
        background: "rgba(0,0,0,0.5)",
      }}
      onClick={onClose}
    >
      <div
        style={{
          marginTop: "auto",
          background: XP.windowBg,
          borderRadius: "16px 16px 0 0",
          border: `2px solid ${XP.border}`,
          borderBottom: "none",
          maxHeight: "100%",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sheet title bar */}
        <div
          style={{
            background: XP.titleActive,
            padding: "10px 12px 10px 14px",
            display: "flex",
            alignItems: "center",
            gap: 8,
            flexShrink: 0,
            borderRadius: "14px 14px 0 0",
          }}
        >
          {/* Drag pill */}
          <div
            style={{
              width: 36,
              height: 4,
              borderRadius: 2,
              background: "rgba(255,255,255,0.4)",
              margin: "0 auto",
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              top: 6,
            }}
          />
          <span style={{ fontSize: 16 }}>{cfg.icon}</span>
          <span
            style={{
              flex: 1,
              color: "#fff",
              fontSize: 12,
              fontFamily: "Tahoma, sans-serif",
              fontWeight: "bold",
              textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {cfg.title}
          </span>
          <button
            onClick={onClose}
            style={{
              width: 22,
              height: 22,
              background: XP.btnClose,
              border: "1px solid rgba(0,0,0,0.3)",
              borderRadius: 4,
              color: "#fff",
              fontSize: 11,
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              flexShrink: 0,
            }}
          >
            ✕
          </button>
        </div>

        {/* Sheet content */}
        <div style={{ flex: 1, overflowY: "auto", overflowX: "hidden" }}>
          {cfg.content === "about" && <AboutWindow onContactClick={openWindow} />}
          {cfg.content === "projects" && <ProjectsWindow />}
          {cfg.content === "skills" && <SkillsWindow />}
          {cfg.content === "contact" && <ContactWindow onError={showError} />}
        </div>
      </div>
    </div>
  );
}

/* =========================
   Main App Component
========================= */
function App(): JSX.Element {
  const isMobile = useIsMobile();

  const [openWindows, setOpenWindows] = useState<WindowId[]>(["about"]);
  const [minimized, setMinimized] = useState<WindowId[]>([]);
  const [zOrder, setZOrder] = useState<WindowId[]>(["about"]);
  const [startOpen, setStartOpen] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);
  const [time, setTime] = useState<Date>(new Date());

  // Mobile: which sheet is open (only one at a time)
  const [mobileActive, setMobileActive] = useState<WindowId>("about");
  const [mobileSheetOpen, setMobileSheetOpen] = useState<boolean>(true);

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const openWindow = (id: WindowId): void => {
    if (isMobile) {
      setMobileActive(id);
      setMobileSheetOpen(true);
      return;
    }
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

  const activeMobileCfg = WINDOWS_CONFIG.find((c) => c.id === mobileActive)!;

  /* ── MOBILE LAYOUT ── */
  if (isMobile) {
    return (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100dvh",
          overflow: "hidden",
          background: XP.desktop,
        }}
      >
        {/* Background gradient */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "radial-gradient(ellipse 100% 60% at 50% 110%, #6aaa3a 0%, #3a6ea5 55%)",
            opacity: 0.85,
          }}
        />

        {/* Desktop-style top bar (XP style) */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 36,
            background: XP.taskbar,
            zIndex: 50,
            display: "flex",
            alignItems: "center",
            paddingLeft: 12,
            paddingRight: 12,
            boxShadow: "0 1px 0 rgba(255,255,255,0.2)",
          }}
        >
          <span
            style={{
              color: "#fff",
              fontFamily: "Tahoma, sans-serif",
              fontWeight: "bold",
              fontStyle: "italic",
              fontSize: 14,
              textShadow: "1px 1px 2px #000",
            }}
          >
            ⊞ Pouria's Portfolio
          </span>
          <div style={{ flex: 1 }} />
          <div
            style={{
              color: "#fff",
              fontFamily: "Tahoma, sans-serif",
              fontSize: 12,
              opacity: 0.9,
            }}
          >
            {timeStr}
          </div>
        </div>

        {/* Icon grid - main mobile content area */}
        <div
          style={{
            position: "absolute",
            top: 36,
            left: 0,
            right: 0,
            bottom: 56,
            overflowY: "auto",
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 0,
            alignContent: "start",
            padding: "24px 8px 8px",
          }}
        >
          {[
            { icon: "🖥️", label: "My Computer", id: null },
            { icon: "👨‍💻", label: "About Me", id: "about" as WindowId },
            { icon: "📁", label: "Projects", id: "projects" as WindowId },
            { icon: "⭐", label: "My Skills", id: "skills" as WindowId },
            { icon: "📧", label: "Contact", id: "contact" as WindowId },
            { icon: "🗑️", label: "Recycle Bin", id: null },
          ].map((ic) => (
            <button
              key={ic.label}
              onClick={() => ic.id && openWindow(ic.id)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 6,
                padding: "14px 8px",
                background: "transparent",
                border: "none",
                cursor: ic.id ? "pointer" : "default",
                opacity: ic.id ? 1 : 0.6,
                WebkitTapHighlightColor: "transparent",
              }}
            >
              <span style={{ fontSize: 36, lineHeight: 1 }}>{ic.icon}</span>
              <span
                style={{
                  color: "#fff",
                  fontSize: 11,
                  fontFamily: "Tahoma, sans-serif",
                  fontWeight: "bold",
                  textShadow: "1px 1px 3px rgba(0,0,0,0.9)",
                  textAlign: "center",
                  lineHeight: 1.3,
                  maxWidth: 80,
                }}
              >
                {ic.label}
              </span>
            </button>
          ))}
        </div>

        {/* Mobile sheet */}
        {mobileSheetOpen && (
          <MobileSheet
            cfg={activeMobileCfg}
            onClose={() => setMobileSheetOpen(false)}
            showError={() => setShowError(true)}
            openWindow={openWindow}
          />
        )}

        {/* Error Dialog */}
        {showError && (
          <ErrorDialog
            theme={xpErrorDialogTheme}
            message="An error occurred."
            onClose={() => setShowError(false)}
          />
        )}

        {/* Mobile bottom nav bar */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 56,
            background: XP.taskbar,
            zIndex: 100,
            display: "flex",
            alignItems: "stretch",
            boxShadow: "0 -1px 0 rgba(255,255,255,0.2)",
          }}
        >
          {MOBILE_NAV.map((nav) => {
            const isActive = mobileActive === nav.id && mobileSheetOpen;
            return (
              <button
                key={nav.id}
                onClick={() => {
                  if (isActive) {
                    setMobileSheetOpen(false);
                  } else {
                    setMobileActive(nav.id);
                    setMobileSheetOpen(true);
                  }
                }}
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 2,
                  background: isActive
                    ? "rgba(255,255,255,0.15)"
                    : "transparent",
                  border: "none",
                  borderTop: isActive
                    ? "2px solid rgba(255,255,255,0.6)"
                    : "2px solid transparent",
                  cursor: "pointer",
                  WebkitTapHighlightColor: "transparent",
                  transition: "background 0.15s",
                }}
              >
                <span style={{ fontSize: 18 }}>{nav.icon}</span>
                <span
                  style={{
                    color: "#fff",
                    fontSize: 10,
                    fontFamily: "Tahoma, sans-serif",
                    fontWeight: isActive ? "bold" : "normal",
                    opacity: isActive ? 1 : 0.75,
                  }}
                >
                  {nav.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  /* ── DESKTOP LAYOUT (original) ── */
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
      {showError && (
        <ErrorDialog
          theme={xpErrorDialogTheme}
          message="An error occurred."
          onClose={() => setShowError(false)}
        />
      )}

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
                      setMinimized((prev) => prev.filter((m) => m !== c.id));
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

export default App;