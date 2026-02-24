// window.types.ts

import type  { ReactNode, CSSProperties } from "react";

export type ResizeDirection =
  | "n"
  | "s"
  | "e"
  | "w"
  | "ne"
  | "nw"
  | "se"
  | "sw";

export interface WindowTheme {
  titleActive: string;
  btnClose: string;
  btnMin: string;
  btnMax?: string;
  windowBg: string;
  border: string;
}

export interface WindowProps {
  title: string;
  icon?: ReactNode;
  children?: ReactNode;
  onClose?: () => void;
  onMinimize?: () => void;
  theme?: WindowTheme;
  width?: number;
  height?: number;
  minWidth?: number;
  minHeight?: number;
  className?: string;
  style?: CSSProperties;
}