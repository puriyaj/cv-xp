import { XPButton } from "./XPButton";
import { XP } from "../theme/xp.theme";
import profilePic from '/src/assets/profile.jpg'
type WindowId = "skills" | "projects" | "contact";

type AboutWindowProps = {
  onContactClick: (id: WindowId) => void;
};

export function AboutWindow({ onContactClick }: AboutWindowProps) {
  return (
    <div
      className="flex h-full"
      style={{ fontFamily: "Tahoma, sans-serif", minHeight: 320 }}
    >
      {/* Sidebar */}
      <div
        className="flex flex-col items-center p-4 gap-3"
        style={{ background: XP.blueSidebar, width: 150 }}
      >
        <img className="w-30 h-30 rounded-full  flex items-center justify-center text-5xl mt-2" src={profilePic}  alt="Profile Picture"/>
          

        <p
          className="text-white text-xs font-bold text-center"
          style={{ textShadow: "1px 1px 1px #000" }}
        >
          Pouria Jangjooymehrangiz
        </p>

        <p className="text-blue-200 text-xs text-center">
          Senior Software Engineer
        </p>

        <div className="mt-2 w-full ">
    
            <div
           
              className="text-blue-200 flex flex-col items-left gap-2 text-xs py-0.5 px-2  "
            >
                 <a
    href="https://github.com/puriyaj"
    target="_blank"
    rel="noopener noreferrer"
    className="hover:underline hover:text-white"
  >
    🐙 github
  </a>

  <a
    href="https://www.linkedin.com/in/puriya-jangjooymehrangiz"
    target="_blank"
    rel="noopener noreferrer"
    className="hover:underline hover:text-white"
  >
    💼 linkedin
  </a>
            </div>

        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 overflow-auto">
        <h2 className="text-base font-bold text-[#003399] mb-1">
          👋 Hello, World!
        </h2>

        <p className="text-xs text-gray-700 mb-3 leading-relaxed">
          I'm a <strong>Software Engineer</strong> with 6+ years building
          high-scale distributed systems, beautiful UIs, and developer tools.
          I specialize in TypeScript, distributed systems, and AI-powered tools.
        </p>

        {/* Quick Facts */}
        <div
          style={{
            border: "1px solid #aca899",
            borderRadius: 3,
            padding: "6px 10px",
            background: "#f0ede0",
            marginBottom: 10,
          }}
        >
          <p className="text-xs font-bold text-gray-700 mb-1">
            📋 Quick Facts
          </p>

          {[
            ["💼", "Senior Software Engineer"],
            ["📍", "Berlin / Remote"],
            ["🤖", "Interested in AI Systems"],
            ["🌐", "Open to exciting opportunities"],
          ].map(([ico, txt]) => (
            <div
              key={txt}
              className="flex items-center gap-2 text-xs py-0.5 text-gray-700"
            >
              <span>{ico}</span>
              <span>{txt}</span>
            </div>
          ))}
        </div>
<div className="flex gap-4">
  <XPButton onClick={() => onContactClick('skills')}>
          ⭐ Skills
        </XPButton>
  <XPButton onClick={() => onContactClick('projects')}>
          📁 Projects
        </XPButton>
<XPButton onClick={() => onContactClick('contact')}>
          📧 Contact Me
        </XPButton>
</div>
        
      </div>
    </div>
  );
}