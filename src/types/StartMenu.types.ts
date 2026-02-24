import type { ReactNode } from "react";

export interface StartMenuItem {
  icon: ReactNode;
  label: string;
  onClick?: () => void;
}

export interface StartMenuTheme {
  border: string;
  headerGradient: string;
  sidebarGradient: string;
}

export interface StartMenuProps {
  userName: string;
  userAvatar?: ReactNode;
  leftPrimaryItems: StartMenuItem[];
  leftSecondaryItems?: StartMenuItem[];
  rightItems: StartMenuItem[];
  onClose: () => void;
  theme: StartMenuTheme;
}