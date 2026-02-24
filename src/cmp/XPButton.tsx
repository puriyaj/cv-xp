import { useState } from "react";
import type { XPButtonProps } from "../types/XPButton.types";

export function XPButton({
  children,
  onClick,
  small = false,
  style,
  ...rest
}: XPButtonProps) {
  const [pressed, setPressed] = useState(false);

  return (
    <button
      type="button"
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      onClick={onClick}
      {...rest}
      style={{
        fontFamily: "Tahoma, sans-serif",
        fontSize: small ? 11 : 12,
        padding: small ? "2px 10px" : "4px 20px",
        background: pressed
          ? "linear-gradient(180deg,#c8c0c0 0%,#d8d0d0 100%)"
          : "linear-gradient(180deg,#ffffff 0%,#e8e0e0 40%,#d0c8c8 100%)",
        border: "2px solid #7b9ebd",
        borderRadius: 3,
        boxShadow: pressed
          ? "inset 1px 1px 2px rgba(0,0,0,0.3)"
          : "0 1px 0 rgba(255,255,255,0.8) inset, 1px 1px 2px rgba(0,0,0,0.2)",
        cursor: "default",
        color: "#000",
        userSelect: "none",
        ...style,
      }}
    >
      {children}
    </button>
  );
}