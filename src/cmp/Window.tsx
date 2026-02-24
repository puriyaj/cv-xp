// Window.tsx

import React, { forwardRef } from "react";
import type { WindowProps, ResizeDirection } from "../types/window.types";
import { useDragResize } from "../hooks/useDragResize";
import  { defaultWindowTheme } from "../theme/window.theme";

export const Window = forwardRef<HTMLDivElement, WindowProps>(
  (
    {
      title,
      icon,
      children,
      onClose,
      onMinimize,
      theme = defaultWindowTheme,
      width = 520,
      height = 380,
      minWidth = 280,
      minHeight = 200,
      className = "",
      style,
    },
    ref
  ) => {
    const { pos, size, startDrag, startResize } = useDragResize({
      initialWidth: width,
      initialHeight: height,
      minWidth,
      minHeight,
    });

    const rHandle = (
      dir: ResizeDirection,
      cursor: string,
      customStyle: React.CSSProperties
    ) => (
      <div
        onMouseDown={(e) => startResize(e, dir)}
        style={{
          position: "absolute",
          cursor,
          zIndex: 10,
          ...customStyle,
        }}
      />
    );

    return (
      <div
        ref={ref}
        className={`absolute flex flex-col ${className}`}
        style={{
          transform: `translate(${pos.x}px,${pos.y}px)`,
          width: size.width,
          height: size.height,
          border: `3px solid ${theme.border}`,
          borderRadius: "8px 8px 4px 4px",
          boxShadow:
            "3px 3px 12px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(255,255,255,0.4)",
          ...style,
        }}
      >
        {rHandle("se", "nwse-resize", {
          right: -4,
          bottom: -4,
          width: 10,
          height: 10,
        })}

        {/* Title */}
        <div
          onMouseDown={startDrag}
          className="flex items-center gap-2 px-2 py-1 select-none"
          style={{ background: theme.titleActive }}
        >
          {icon && <span>{icon}</span>}
          <span className="flex-1 text-white text-xs font-bold truncate">
            {title}
          </span>

          <div className="flex gap-1">
            <button
              onClick={onMinimize}
              style={{ background: theme.btnMin }}
              className="w-4 h-4 text-xs font-bold"
            >
              –
            </button>

            <button
              onClick={onClose}
              style={{ background: theme.btnClose }}
              className="w-4 h-4 text-xs font-bold text-white"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Body */}
        <div
          className="flex-1 overflow-auto"
          style={{ background: theme.windowBg }}
        >
          {children}
        </div>
      </div>
    );
  }
);

Window.displayName = "Window";