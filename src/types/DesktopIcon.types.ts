import type { ReactNode, HTMLAttributes } from "react";

export interface DesktopIconProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onDoubleClick"> {
  icon: ReactNode;
  label: string;
  onDoubleClick?: () => void;
  selected?: boolean; // controlled mode
}