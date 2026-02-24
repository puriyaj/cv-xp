import { forwardRef } from "react";
import type { ErrorDialogProps } from "../types/ErrorDialog.types";
import { XPButton } from "../cmp/XPButton";

export const ErrorDialog = forwardRef<
  HTMLDivElement,
  ErrorDialogProps
>(
  (
    {
      title = "Application.exe",
      message,
      errorCode,
      icon = "⚠️",
      onClose,
      theme,
    },
    ref
  ) => {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div
          ref={ref}
          style={{
            background: theme.windowBg,
            border: `3px solid ${theme.border}`,
            borderRadius: "8px 8px 4px 4px",
            width: 380,
            boxShadow: "4px 4px 20px rgba(0,0,0,0.7)",
            fontFamily: "Tahoma, sans-serif",
          }}
        >
          {/* Title Bar */}
          <div
            className="flex items-center gap-2 px-2 py-1"
            style={{
              background: theme.titleGradient,
              borderRadius: "5px 5px 0 0",
            }}
          >
            <span
              className="text-white font-bold text-xs"
              style={{ textShadow: "1px 1px 1px #0000aa" }}
            >
              {title}
            </span>

            <button
              onClick={onClose}
              className="ml-auto w-4 h-4 text-white text-xs font-bold"
              style={{
                background: theme.closeGradient,
                border: "1px solid #7a0000",
                borderRadius: 3,
              }}
            >
              ✕
            </button>
          </div>

          {/* Body */}
          <div className="flex items-center gap-4 p-5">
            <span className="text-5xl">{icon}</span>
            <div className="text-xs">{message}</div>
          </div>

          {errorCode && (
            <p className="text-[10px] text-gray-500 text-center mb-2">
              Error code: {errorCode}
            </p>
          )}

          <div className="flex justify-center gap-3 pb-4">
            <XPButton onClick={onClose}>OK</XPButton>
            <XPButton onClick={onClose}>Cancel</XPButton>
          </div>
        </div>
      </div>
    );
  }
);

ErrorDialog.displayName = "ErrorDialog";