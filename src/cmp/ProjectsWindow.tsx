import { useState } from "react";
import { XPButton } from "../cmp/XPButton";

interface Project {
  name: string;
  stars: string;
  lang: string;
  desc: string;
  icon: string;
}

export function ProjectsWindow() {
  const projects: Project[] = [
    {
      name: "EdgeCache",
      stars: "2.4k",
      lang: "Rust",
      desc: "Distributed edge caching",
      icon: "🚀",
    },
    {
      name: "QueryFlow",
      stars: "1.1k",
      lang: "TypeScript",
      desc: "Visual SQL builder",
      icon: "🔍",
    },
  ];

  const [selected, setSelected] = useState<Project | null>(
    null
  );

  return (
    <div
      className="flex h-full"
      style={{ fontFamily: "Tahoma, sans-serif" }}
    >
      {/* File list */}
      <div className="flex-1 p-2 grid grid-cols-2 gap-1">
        {projects.map((p) => (
          <div
            key={p.name}
            onClick={() => setSelected(p)}
            className="flex items-center gap-2 p-2 rounded cursor-default"
            style={{
              background:
                selected?.name === p.name
                  ? "#316ac5"
                  : "transparent",
              color:
                selected?.name === p.name
                  ? "white"
                  : "#000",
            }}
          >
            <span className="text-2xl">{p.icon}</span>
            <div>
              <div className="text-xs font-bold">
                {p.name}
              </div>
              <div className="text-[10px] opacity-70">
                {p.lang} • ⭐{p.stars}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detail panel */}
      <div
        className="p-3 text-xs overflow-auto"
        style={{
          width: 150,
          background:
            "linear-gradient(180deg,#7ba7e7 0%,#3d6bc9 100%)",
        }}
      >
        {selected ? (
          <>
            <p className="text-3xl text-center mb-2">
              {selected.icon}
            </p>
            <p className="text-white font-bold text-sm mb-1">
              {selected.name}
            </p>
            <p className="text-blue-200 mb-2">
              {selected.desc}
            </p>
            <XPButton small>Open →</XPButton>
          </>
        ) : (
          <p className="text-blue-200">
            Select a project
          </p>
        )}
      </div>
    </div>
  );
}