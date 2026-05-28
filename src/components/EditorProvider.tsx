"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface TextProperties {
  content?: string;
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: string;
  color?: string;
  letterSpacing?: number;
  lineHeight?: number;
  textAlign?: "left" | "center" | "right" | "justify";
  // Button-specific
  backgroundColor?: string;
  borderRadius?: number;
  boxShadow?: string;
  href?: string;
}

interface EditorContextType {
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
  editingId: string | null;
  setEditingId: (id: string | null) => void;
  hoveredId: string | null;
  setHoveredId: (id: string | null) => void;
  elementOverrides: Record<string, Partial<TextProperties>>;
  updateOverride: (id: string, updates: Partial<TextProperties>) => void;
}

const EditorContext = createContext<EditorContextType | undefined>(undefined);

function BoundingBoxOverlay({ targetId, isHover = false }: { targetId: string | null, isHover?: boolean }) {
  const [rect, setRect] = React.useState<DOMRect | null>(null);

  React.useEffect(() => {
    if (!targetId) {
      setRect(null);
      return;
    }

    const timeout = setTimeout(() => {
      const el = document.querySelector(`[data-editable-id="${targetId.replace(/"/g, '\\"')}"]`);
      if (!el) {
        setRect(null);
        return;
      }

      const updateRect = () => setRect(el.getBoundingClientRect());
      updateRect();

      const observer = new ResizeObserver(updateRect);
      observer.observe(el);
      window.addEventListener("scroll", updateRect, true);
      window.addEventListener("resize", updateRect);

      return () => {
        observer.disconnect();
        window.removeEventListener("scroll", updateRect, true);
        window.removeEventListener("resize", updateRect);
      };
    }, 0);

    return () => clearTimeout(timeout);
  }, [targetId]);

  if (!targetId || !rect) return null;

  const opacityClass = isHover ? "opacity-60" : "opacity-100";
  const nodeClass = `absolute w-1.5 h-1.5 bg-white border border-pink-500 pointer-events-none ${opacityClass}`;

  return (
    <div 
      className={`fixed pointer-events-none z-50 border border-pink-500 ${opacityClass}`}
      style={{
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      }}
    >
      <div className={`${nodeClass} -top-[3px] -left-[3px]`} />
      <div className={`${nodeClass} -top-[3px] -right-[3px]`} />
      <div className={`${nodeClass} -bottom-[3px] -left-[3px]`} />
      <div className={`${nodeClass} -bottom-[3px] -right-[3px]`} />
    </div>
  );
}

export function EditorProvider({ children }: { children: React.ReactNode }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [elementOverrides, setElementOverrides] = useState<Record<string, Partial<TextProperties>>>({});

  const updateOverride = (id: string, updates: Partial<TextProperties>) => {
    setElementOverrides(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        ...updates
      }
    }));
  };

  // Clear selection when clicking outside any editable element
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      // If clicking directly on body or non-editable wrapper, clear selection
      const target = e.target as HTMLElement;
      if (target.closest('[data-editable]') || target.closest('[data-editor-panel="true"]')) {
        return;
      }
      setSelectedId(null);
      setEditingId(null);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <EditorContext.Provider value={{ 
      selectedId, setSelectedId, 
      editingId, setEditingId, 
      hoveredId, setHoveredId,
      elementOverrides, updateOverride
    }}>
      {children}
      {selectedId && <BoundingBoxOverlay targetId={selectedId} />}
      {hoveredId && hoveredId !== selectedId && <BoundingBoxOverlay targetId={hoveredId} isHover={true} />}
    </EditorContext.Provider>
  );
}

export function useEditor() {
  const context = useContext(EditorContext);
  if (context === undefined) {
    throw new Error("useEditor must be used within an EditorProvider");
  }
  return context;
}
