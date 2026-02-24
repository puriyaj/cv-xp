// useDragResize.ts

import { useEffect, useRef, useState } from "react";
import type { ResizeDirection } from "../types/window.types";

interface DragResizeOptions {
  initialWidth: number;
  initialHeight: number;
  minWidth: number;
  minHeight: number;
}

interface Position {
  x: number;
  y: number;
}

interface Size {
  width: number;
  height: number;
}

export function useDragResize({
  initialWidth,
  initialHeight,
  minWidth,
  minHeight,
}: DragResizeOptions) {
  const [pos, setPos] = useState<Position>({ x: 0, y: 0 });
  const [size, setSize] = useState<Size>({
    width: initialWidth,
    height: initialHeight,
  });

  const [dragging, setDragging] = useState(false);
  const [resizing, setResizing] = useState<ResizeDirection | null>(null);

  const dragStart = useRef<{
    mx: number;
    my: number;
    px: number;
    py: number;
  } | null>(null);

  const resizeStart = useRef<{
    mx: number;
    my: number;
    w: number;
    h: number;
    px: number;
    py: number;
  } | null>(null);

  const startDrag = (e: React.MouseEvent) => {
    setDragging(true);
    dragStart.current = {
      mx: e.clientX,
      my: e.clientY,
      px: pos.x,
      py: pos.y,
    };
  };

  const startResize = (e: React.MouseEvent, dir: ResizeDirection) => {
    e.stopPropagation();
    setResizing(dir);
    resizeStart.current = {
      mx: e.clientX,
      my: e.clientY,
      w: size.width,
      h: size.height,
      px: pos.x,
      py: pos.y,
    };
  };

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (dragging && dragStart.current) {
        setPos({
          x: dragStart.current.px + e.clientX - dragStart.current.mx,
          y: dragStart.current.py + e.clientY - dragStart.current.my,
        });
      }

      if (resizing && resizeStart.current) {
        const dx = e.clientX - resizeStart.current.mx;
        const dy = e.clientY - resizeStart.current.my;

        let newW = resizeStart.current.w;
        let newH = resizeStart.current.h;
        let newX = resizeStart.current.px;
        let newY = resizeStart.current.py;

        if (resizing.includes("e"))
          newW = Math.max(minWidth, resizeStart.current.w + dx);

        if (resizing.includes("s"))
          newH = Math.max(minHeight, resizeStart.current.h + dy);

        if (resizing.includes("w")) {
          newW = Math.max(minWidth, resizeStart.current.w - dx);
          newX = resizeStart.current.px + (resizeStart.current.w - newW);
        }

        if (resizing.includes("n")) {
          newH = Math.max(minHeight, resizeStart.current.h - dy);
          newY = resizeStart.current.py + (resizeStart.current.h - newH);
        }

        setSize({ width: newW, height: newH });
        setPos({ x: newX, y: newY });
      }
    };

    const up = () => {
      setDragging(false);
      setResizing(null);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };
  }, [dragging, resizing, minWidth, minHeight]);

  return {
    pos,
    size,
    startDrag,
    startResize,
  };
}