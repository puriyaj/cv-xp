import React, { forwardRef } from "react";
import type { WindowProps, ResizeDirection } from "../types/window.types";
import { useDragResize } from "../hooks/useDragResize";
import { defaultWindowTheme } from "../theme/window.theme";

const HANDLE_SIZE = 6;

export const Window = forwardRef<HTMLDivElement, WindowProps>(
  (
    {
      title,
      icon,
      children,
      onClose,
      onMinimize,
      onClick,
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
    // Extract initial position from style if provided
    const initialX =
      style && "left" in style ? (style.left as number) : 0;
    const initialY =
      style && "top" in style ? (style.top as number) : 0;

    const { pos, size, startDrag, startResize } = useDragResize({
      initialWidth: width,
      initialHeight: height,
      initialX,
      initialY,
      minWidth,
      minHeight,
    });

    const rHandle = (
      dir: ResizeDirection,
      cursor: string,
      customStyle: React.CSSProperties
    ) => (
      <div
        key={dir}
        onMouseDown={(e) => startResize(e, dir)}
        style={{
          position: "absolute",
          cursor,
          zIndex: 20,
          ...customStyle,
        }}
      />
    );

    return (
      <div
        ref={ref}
        className={`absolute flex flex-col ${className}`}
        style={{
          transform: `translate(${pos.x}px, ${pos.y}px)`,
          width: size.width,
          height: size.height,
          top: 0,
          left: 0,
          border: `3px solid ${theme.border}`,
          borderRadius: "8px 8px 4px 4px",
          boxShadow:
            "3px 3px 12px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(255,255,255,0.4)",
          // Spread remaining style props except position ones
          ...(style
            ? Object.fromEntries(
                Object.entries(style).filter(
                  ([k]) => !["top", "left", "width", "height"].includes(k)
                )
              )
            : {}),
        }}
        onClick={onClick}
      >
        {/* ── Resize handles ── */}

        {/* Edges */}
        {rHandle("n", "n-resize", {
          top: -HANDLE_SIZE,
          left: HANDLE_SIZE,
          right: HANDLE_SIZE,
          height: HANDLE_SIZE,
        })}
        {rHandle("s", "s-resize", {
          bottom: -HANDLE_SIZE,
          left: HANDLE_SIZE,
          right: HANDLE_SIZE,
          height: HANDLE_SIZE,
        })}
        {rHandle("e", "e-resize", {
          top: HANDLE_SIZE,
          bottom: HANDLE_SIZE,
          right: -HANDLE_SIZE,
          width: HANDLE_SIZE,
        })}
        {rHandle("w", "w-resize", {
          top: HANDLE_SIZE,
          bottom: HANDLE_SIZE,
          left: -HANDLE_SIZE,
          width: HANDLE_SIZE,
        })}

        {/* Corners */}
        {rHandle("nw", "nw-resize", {
          top: -HANDLE_SIZE,
          left: -HANDLE_SIZE,
          width: HANDLE_SIZE * 2,
          height: HANDLE_SIZE * 2,
        })}
        {rHandle("ne", "ne-resize", {
          top: -HANDLE_SIZE,
          right: -HANDLE_SIZE,
          width: HANDLE_SIZE * 2,
          height: HANDLE_SIZE * 2,
        })}
        {rHandle("sw", "sw-resize", {
          bottom: -HANDLE_SIZE,
          left: -HANDLE_SIZE,
          width: HANDLE_SIZE * 2,
          height: HANDLE_SIZE * 2,
        })}
        {rHandle("se", "se-resize", {
          bottom: -HANDLE_SIZE,
          right: -HANDLE_SIZE,
          width: HANDLE_SIZE * 2,
          height: HANDLE_SIZE * 2,
        })}

        {/* ── Title bar ── */}
        <div
          onMouseDown={startDrag}
          className="flex items-center gap-2 px-2 py-1 select-none flex-shrink-0"
          style={{
            background: theme.titleActive,
            borderRadius: "5px 5px 0 0",
            cursor: "move",
          }}
        >
          {icon && <span>{icon}</span>}
          <span className="flex-1 text-white text-xs font-bold truncate"
            style={{ fontFamily: "Tahoma, sans-serif", textShadow: "1px 1px 2px rgba(0,0,0,0.5)" }}>
            {title}
          </span>

          <div className="flex gap-1">
            <button
              onClick={(e) => { e.stopPropagation(); onMinimize?.(); }}
              className="w-5 h-5 text-xs font-bold flex items-center justify-center rounded-sm"
              style={{
                background: theme.btnMin,
                border: "1px solid rgba(0,0,0,0.3)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.5)",
              }}
            >
              –
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onClose?.(); }}
              className="w-5 h-5 text-xs font-bold text-white flex items-center justify-center rounded-sm"
              style={{
                background: theme.btnClose,
                border: "1px solid rgba(0,0,0,0.3)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.5)",
              }}
            >
              ✕
            </button>
          </div>
        </div>

        {/* ── Content ── */}
        <div
          className="flex-1 overflow-auto"
          style={{ background: theme.windowBg }}
        >
          {children}
        </div>

        {/* Resize grip indicator (SE corner) */}
        <div
          style={{
            position: "absolute",
            bottom: 2,
            right: 2,
            width: 12,
            height: 12,
            pointerEvents: "none",
            opacity: 0.4,
            background:
              "repeating-linear-gradient(-45deg, #888 0px, #888 1px, transparent 1px, transparent 3px)",
          }}
        />
      </div>
    );
  }
);

Window.displayName = "Window";