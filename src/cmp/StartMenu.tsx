import { forwardRef } from "react";
import type { StartMenuProps } from "../types/StartMenu.types";
import { defaultStartMenuTheme } from "../theme/startMenu.theme";

export const StartMenu = forwardRef<HTMLDivElement, StartMenuProps>(
  (
    {
      userName,
      userAvatar = "👨‍💻",
      leftPrimaryItems,
      leftSecondaryItems = [],
      rightItems,
      onClose,
      theme = defaultStartMenuTheme,
    },
    ref
  ) => {
    const handleClick = (cb?: () => void) => {
      cb?.();
      onClose();
    };

    return (
      <div
        ref={ref}
        className="absolute bottom-10 left-0 flex"
        style={{
          width: 380,
          boxShadow: "4px -4px 12px rgba(0,0,0,0.5)",
          border: `2px solid ${theme.border}`,
          borderRadius: "8px 8px 0 0",
          zIndex: 200,
          fontFamily: "Tahoma, sans-serif",
        }}
      >
        {/* Header */}
        <div
          className="absolute top-0 left-0 right-0 flex items-center gap-3 px-3 py-2 rounded-t-lg"
          style={{
            background: theme.headerGradient,
            height: 54,
          }}
        >
          <img src="/src/assets/profile.jpg" className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-2xl border-2 border-white/50"/>
            
          
          <span
            className="text-white font-bold text-sm"
            style={{ textShadow: "1px 1px 2px #0000aa" }}
          >
            {userName}
          </span>
        </div>

        <div className="flex w-full mt-[54px]">
          {/* LEFT PANEL */}
          <div className="flex-1 bg-white py-2">
            {leftPrimaryItems?.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-3 px-3 py-2 hover:bg-[#316ac5] hover:text-white cursor-default"
                onClick={() => handleClick(item.onClick)}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="text-xs font-bold">
                  {item.label}
                </span>
              </div>
            ))}

            {leftSecondaryItems.length > 0 && (
              <>
                <hr className="my-1 border-gray-300" />
                {leftSecondaryItems.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-3 px-3 py-2 hover:bg-[#316ac5] hover:text-white cursor-default"
                    onClick={() => handleClick(item.onClick)}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="text-xs">
                      {item.label}
                    </span>
                  </div>
                ))}
              </>
            )}

            <div className="px-3 py-1 text-xs text-blue-600 hover:underline cursor-default">
              All Programs ▶
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div
            className="py-2"
            style={{
              background: theme.sidebarGradient,
              width: 140,
            }}
          >
            {rightItems.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-2 px-3 py-1.5 hover:bg-white/20 cursor-default"
                onClick={() => handleClick(item.onClick)}
              >
                <span className="text-base">{item.icon}</span>
                <span
                  className="text-white text-xs"
                  style={{
                    textShadow: "1px 1px 1px #00009a",
                  }}
                >
                  {item.label}
                </span>
              </div>
            ))}

            <hr className="my-2 border-white/30 mx-2" />
          </div>
        </div>
      </div>
    );
  }
);

StartMenu.displayName = "StartMenu";