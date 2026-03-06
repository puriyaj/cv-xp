# 🪟 Windows XP Portfolio

A fully interactive software engineer portfolio built to look and feel exactly like **Windows XP** — complete with draggable, resizable windows, a working Start Menu, taskbar, system tray clock, and a playful mobile blocker screen.

Built with **React** and **Tailwind CSS**.

---

## ✨ Features

### 🖥️ Desktop Experience
- Authentic **Luna Blue** color scheme with XP-accurate gradients and typography (Tahoma)
- **Bliss-inspired** desktop background (the iconic rolling green hills)
- Double-clickable **desktop icons** to open portfolio sections

### 🪟 Window Management
- **Drag** any window by its title bar
- **Resize** from all 8 edges and corners with correct directional cursors
- **Minimize** windows to the taskbar and restore them with a click
- **Maximize** windows to fill the screen — click again to restore
- **Z-order / focus** management — clicking a window brings it to the front
- **Close** individual windows independently

### 📂 Portfolio Sections (as Windows)
| Window | Contents |
|--------|----------|
| 👨‍💻 About Me | Bio, quick facts, sidebar with links |
| 📁 My Projects | File-browser style with selectable project cards and detail panel |
| ⭐ Skills & Technologies | Tabbed dialog with skill bars across Languages, Frontend, Backend, and Infra |
| 📧 Contact | Email compose form with a fun `0x00HIRE_ME` error popup on send |

### 🟢 Start Menu
- Opens on click with the classic italic **"start"** button
- Left panel with quick-launch app shortcuts
- Right panel with blue sidebar (My Computer, Control Panel, etc.)

### 📊 Taskbar
- Live **system clock** updating every second
- Open windows appear as buttons — click to focus, click again to minimize
- System tray with volume and network icons

### 📱 Mobile Screen
- On screens below `768px`, a genuine XP-style **error dialog** appears:
  > *"Screen Too Small! Please open me on a desktop or laptop for the full Windows XP experience."*
  - Error code: `0xB1G_SCR33N_PL5`
- Includes a decorative taskbar at the bottom for full effect

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- A React project with Tailwind CSS configured

### Installation

```bash
# Copy portfolio-xp.jsx into your project
cp portfolio-xp.jsx src/

# Make sure Tailwind is set up (if not already)
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init
```

### Usage

```jsx
// App.jsx
import WinXPPortfolio from './portfolio-xp';

export default function App() {
  return <WinXPPortfolio />;
}
```

No external dependencies beyond React itself — all styling is done with inline styles and Tailwind utility classes.

---

## 🛠️ Customization

All personal content lives in clearly labelled sections near the bottom of `portfolio-xp.jsx`.

### Change the name & bio
Edit the `AboutContent` component:
```jsx
function AboutContent() {
  // Update name, title, facts, sidebar links...
}
```

### Add or edit projects
Edit the `projects` array inside `ProjectsContent`:
```jsx
const projects = [
  { name: "MyProject", stars: "1.2k", lang: "TypeScript", desc: "What it does", icon: "🚀" },
  // ...
];
```

### Update skills
Edit the `skills` object inside `SkillsContent`:
```jsx
const skills = {
  "💻 Languages": ["TypeScript", "Rust", "Go"],
  "⚛ Frontend":  ["React", "Next.js"],
  // ...
};
```

### Update contact info
Edit the links at the bottom of `ContactContent`.

### Change initial window positions
Edit the `WINS_CONFIG` array in the main app:
```jsx
const WINS_CONFIG = [
  { id: "about", title: "About Me", icon: "👨‍💻", rect: { x: 50, y: 40, w: 520, h: 390 } },
  // ...
];
```

---

## 📁 Project Structure

```
portfolio-xp.jsx          # Single-file React component (everything lives here)
├── XP                    # Color/gradient token object
├── XPButton              # Reusable XP-style button with press state
├── XPWindow              # Draggable + resizable window shell
├── DesktopIcon           # Selectable icon with label highlight
├── StartMenu             # Two-panel Start Menu
├── ErrorDialog           # "Hire me" error popup
├── MobileScreen          # Mobile blocker overlay
├── AboutContent          # Window body: About Me
├── ProjectsContent       # Window body: Projects file browser
├── SkillsContent         # Window body: Tabbed skills dialog
├── ContactContent        # Window body: Contact form
└── WinXPPortfolio        # Root app — state, taskbar, desktop
```

---

## 🧰 Tech Stack

| Tool | Usage |
|------|-------|
| React 18 | UI framework, hooks for state & effects |
| Tailwind CSS | Utility classes for layout and responsive breakpoints |
| Inline styles | XP-accurate gradients, shadows, and borders |

No additional libraries required.

---

## 📄 License

MIT — free to use, modify, and deploy for personal or commercial portfolios.

---

> *"It just works."* — Windows XP, probably
