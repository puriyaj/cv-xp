import { XPButton } from "../cmp/XPButton";

export function AboutWindow() {
  return (
    <div
      className="flex h-full"
      style={{ fontFamily: "Tahoma, sans-serif", minHeight: 320 }}
    >
      {/* Sidebar */}
      <div
        className="flex flex-col items-center p-4 gap-3"
        style={{
          background:
            "linear-gradient(180deg,#7ba7e7 0%,#3d6bc9 100%)",
          width: 130,
        }}
      >
        <div className="w-20 h-20 rounded-full border-4 border-white/60 bg-white flex items-center justify-center text-5xl mt-2">
          👨‍💻
        </div>

        <p
          className="text-white text-xs font-bold text-center"
          style={{ textShadow: "1px 1px 1px #000" }}
        >
          Alex Rivera
        </p>

        <p className="text-blue-200 text-[10px] text-center">
          Staff Engineer
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 overflow-auto">
        <h2 className="text-base font-bold text-[#003399] mb-1">
          👋 Hello, World!
        </h2>

        <p className="text-xs text-gray-700 mb-3 leading-relaxed">
          I'm a <strong>Software Engineer</strong> building
          high-scale distributed systems and developer tools.
        </p>

        <XPButton>📧 Contact Me</XPButton>
      </div>
    </div>
  );
}