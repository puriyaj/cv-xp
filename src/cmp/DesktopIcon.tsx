import {
  forwardRef,
  useState,

} from "react";
import type {

  KeyboardEvent,
  FocusEvent,
  MouseEvent,
} from "react";
import type { DesktopIconProps } from "../types/DesktopIcon.types";

export const DesktopIcon = forwardRef<HTMLDivElement, DesktopIconProps>(
  (
    {
      icon,
      label,
      onDoubleClick,
      selected,
      className = "",
      style,
      ...rest
    },
    ref
  ) => {
    const [internalSelected, setInternalSelected] = useState(false);

    const isControlled = selected !== undefined;
    const isSelected = isControlled ? selected : internalSelected;

    const handleClick = () => {
      if (!isControlled) setInternalSelected(true);
    };

    const handleBlur = (e: FocusEvent<HTMLDivElement>) => {
      if (!isControlled) setInternalSelected(false);
      rest.onBlur?.(e);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Enter") {
        onDoubleClick?.();
      }
    };

    const handleDoubleClick = (e: MouseEvent<HTMLDivElement>) => {
      onDoubleClick?.();
      rest.onDoubleClick?.(e);
    };

    return (
      <div
        ref={ref}
        tabIndex={0}
        role="button"
        onClick={handleClick}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        onDoubleClick={handleDoubleClick}
        className={`flex flex-col items-center gap-1 w-20 cursor-default select-none ${className}`}
        style={style}
        {...rest}
      >
        <div className="text-4xl">{icon}</div>

        <div
          className="text-center text-xs leading-tight px-1"
          style={{
            fontFamily: "Tahoma, sans-serif",
            color: "white",
            textShadow: "1px 1px 2px #000",
            background: isSelected ? "#316ac5" : "transparent",
            borderRadius: 2,
          }}
        >
          {label}
        </div>
      </div>
    );
  }
);

DesktopIcon.displayName = "DesktopIcon";