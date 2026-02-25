import { useState } from "react";

type SkillCategory =
  | "💻 Languages"
  | "⚛ Frontend"
  | "🖥️ Backend"
  | "☁️ Infra";

type SkillMap = Record<SkillCategory, string[]>;

export function SkillsWindow() {
  const skills: SkillMap = {
    "💻 Languages": [
      "TypeScript",
      "JavaScript",
      "Python",
      "SQL",
      "C++",
    ],
    "⚛ Frontend": [
      "React",
      "Next.js",
      "Tailwind CSS",
      "Redux",
      "React Query",
      "CSS",
    ],
    "🖥️ Backend": [
      "Node.js",
      "PostgreSQL",
      "Rest APIs",
      "GraphQL",
    ],
    "☁️ Infra": [
      "AWS",
      "Docker",
      "Kubernetes",
      "Vercel",
    ],
  };

  const categories = Object.keys(skills) as SkillCategory[];

  const [activeTab, setActiveTab] =
    useState<SkillCategory>(categories[0]);

  return (
    <div
      style={{
        fontFamily: "Tahoma, sans-serif",
        minHeight: 300,
      }}
    >
      {/* Tabs */}
      <div
        className="flex border-b border-gray-400 px-2 pt-2"
        style={{ background: "#ece9d8" }}
      >
        {categories.map((category) => {
          const isActive = activeTab === category;

          return (
            <div
              key={category}
              onClick={() => setActiveTab(category)}
              className="px-3 py-1 text-xs cursor-default rounded-t-sm mr-1 border border-b-0"
              style={{
                background: isActive
                  ? "#fff"
                  : "#d4d0c8",
                borderColor: "#aca899",
                marginBottom: isActive ? -1 : 0,
                fontWeight: isActive
                  ? "bold"
                  : "normal",
                zIndex: isActive ? 2 : 1,
                position: "relative",
              }}
            >
              {category}
            </div>
          );
        })}
      </div>

      {/* Content */}
      <div
        className="p-4"
        style={{ background: "#fff", minHeight: 220 }}
      >
        <div className="grid grid-cols-2 gap-2">
          {skills[activeTab].map((skill) => (
            <SkillRow key={skill} name={skill} level={4} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────────── */

interface SkillRowProps {
  name: string;
  level: 1 | 2 | 3 | 4 | 5;
}

function SkillRow({ name, level }: SkillRowProps) {
  return (
    <div
      className="flex items-center gap-2 p-2 rounded text-xs"
      style={{
        background: "#f0ede0",
        border: "1px solid #d0cdc0",
      }}
    >
      <div className="w-2 h-2 rounded-full bg-[#316ac5]" />

      <span>{name}</span>

      <div className="flex-1" />

      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="w-3 h-3 rounded-sm"
            style={{
              background:
                i <= level
                  ? "#316ac5"
                  : "#d0cdc0",
            }}
          />
        ))}
      </div>
    </div>
  );
}