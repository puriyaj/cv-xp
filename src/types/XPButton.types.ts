import type { ReactNode, ButtonHTMLAttributes } from "react";

export interface XPButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  children: ReactNode;
  onClick?: () => void;
  small?: boolean;
}