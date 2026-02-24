import type { ReactNode } from "react";

export interface ErrorDialogTheme {
  windowBg: string;
  titleGradient: string;
  border: string;
  closeGradient: string;
}

export interface ErrorDialogProps {
  title?: string;
  message: ReactNode;
  errorCode?: string;
  icon?: ReactNode;
  onClose: () => void;
  theme: ErrorDialogTheme;
}