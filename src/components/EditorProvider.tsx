"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthProvider";

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
  // Layout-specific
  paddingTop?: number;
  paddingBottom?: number;
  invert?: boolean;
  // Image-specific
  src?: string;
  alt?: string;
  opacity?: number;
  // Visibility
  visible?: boolean;
}

export interface GlobalTheme {
  headingFont?: string;
  bodyFont?: string;
  headingFontWeight?: string;
  headingLetterSpacing?: string;
  headingLineHeight?: string;
  bodyFontWeight?: string;
  bodyLetterSpacing?: string;
  bodyLineHeight?: string;
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
}

import { MOCK_PAGE_DATA } from "@/data/mockPageData";

export interface PageData {
  id: string;
  name: string;
  blocks: any[];
}

export interface EditorContextType {
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
  editingId: string | null;
  setEditingId: (id: string | null) => void;
  hoveredId: string | null;
  setHoveredId: (id: string | null) => void;
  elementOverrides: Record<string, Partial<TextProperties>>;
  updateOverride: (id: string, updates: Partial<TextProperties>) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  isPreviewMode: boolean;
  setIsPreviewMode: (val: boolean) => void;
  pages: PageData[];
  activePageId: string;
  setActivePageId: (id: string) => void;
  addPage: () => void;
  updatePageName: (id: string, name: string) => void;
  updateBlockType: (pageId: string, blockIndex: number, newType: string) => void;
  addGeneratedPage: (name: string, blocks: any[]) => void;
  cycleAllVariants: () => void;
  viewportSize: "desktop" | "tablet" | "mobile";
  setViewportSize: (size: "desktop" | "tablet" | "mobile") => void;
  iframeDoc: Document | null;
  setIframeDoc: (doc: Document | null) => void;
  canvasTheme: "light" | "dark";
  setCanvasTheme: (theme: "light" | "dark") => void;
  globalTheme: GlobalTheme;
  setGlobalTheme: React.Dispatch<React.SetStateAction<GlobalTheme>>;
  syncStatus: string;
  publishWebsite: () => Promise<string | null>;
  isLoaded: boolean;
  isLeftPanelOpen: boolean;
  setIsLeftPanelOpen: (val: boolean) => void;
  isRightPanelOpen: boolean;
  setIsRightPanelOpen: (val: boolean) => void;
  hasPaid: boolean;
}

export const EditorContext = createContext<EditorContextType | undefined>(undefined);

function BoundingBoxOverlay({ targetId, isHover = false }: { targetId: string | null, isHover?: boolean }) {
  const [rect, setRect] = React.useState<DOMRect | null>(null);
  const { iframeDoc } = useEditor();

  React.useEffect(() => {
    if (!targetId) {
      setRect(null);
      return;
    }

    const timeout = setTimeout(() => {
      const doc = iframeDoc || document;
      const el = doc.querySelector(`[data-editable-id="${targetId.replace(/"/g, '\\"')}"]`);
      if (!el) {
        setRect(null);
        return;
      }

      const updateRect = () => {
        const elRect = el.getBoundingClientRect();
        let topOffset = 0;
        let leftOffset = 0;
        
        if (iframeDoc) {
          const iframeEl = document.querySelector('iframe[title="Canvas Preview"]');
          if (iframeEl) {
            const iframeRect = iframeEl.getBoundingClientRect();
            topOffset = iframeRect.top;
            leftOffset = iframeRect.left;
          }
        }
        
        setRect({
          top: elRect.top + topOffset,
          left: elRect.left + leftOffset,
          width: elRect.width,
          height: elRect.height,
        } as DOMRect);
      };
      
      updateRect();

      const observer = new ResizeObserver(updateRect);
      observer.observe(el);
      
      const win = doc.defaultView || window;
      win.addEventListener("scroll", updateRect, true);
      win.addEventListener("resize", updateRect);
      window.addEventListener("scroll", updateRect, true);

      return () => {
        observer.disconnect();
        win.removeEventListener("scroll", updateRect, true);
        win.removeEventListener("resize", updateRect);
        window.removeEventListener("scroll", updateRect, true);
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

export function EditorProvider({ 
  children,
  initialPages,
  initialOverrides,
  initialTheme,
  isPublished = false
}: { 
  children: React.ReactNode,
  initialPages?: PageData[],
  initialOverrides?: Record<string, Partial<TextProperties>>,
  initialTheme?: GlobalTheme,
  isPublished?: boolean
}) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [elementOverrides, setElementOverrides] = useState<Record<string, Partial<TextProperties>>>(initialOverrides || {});
  
  const [isLeftPanelOpen, setIsLeftPanelOpen] = useState(true);
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(true);
  const [isPreviewMode, setIsPreviewMode] = useState(isPublished);
  const [viewportSize, setViewportSize] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [pages, setPages] = useState<PageData[]>(initialPages || [{ id: "home", name: "Home", blocks: MOCK_PAGE_DATA }]);
  const [activePageId, setActivePageId] = useState("home");
  const [iframeDoc, setIframeDoc] = useState<Document | null>(null);
  const [canvasTheme, setCanvasTheme] = useState<"light" | "dark">("light");
  const [globalTheme, setGlobalTheme] = useState<GlobalTheme>({});
  
  const { user, loading: authLoading } = useAuth();
  const [syncStatus, setSyncStatus] = useState<"Synced" | "Saving..." | "Error">("Synced");
  const [isLoaded, setIsLoaded] = useState(isPublished);
  const [hasPaid, setHasPaid] = useState(false);

  // Load from Neon DB on mount
  useEffect(() => {
    if (authLoading) return; // Wait for auth to initialize
    
    if (!user || isPublished) {
      setIsLoaded(true);
      return;
    }
    
    fetch(`/api/sync?uid=${user.uid}`)
      .then(res => res.json())
      .then(data => {
        if (data.pages && data.pages.length > 0) setPages(data.pages);
        if (data.elementOverrides) setElementOverrides(data.elementOverrides);
        if (data.globalTheme) setGlobalTheme(data.globalTheme);
        if (data.hasPaid) setHasPaid(data.hasPaid);
        setIsLoaded(true);
      })
      .catch(err => {
        console.error("Failed to load from Neon", err);
        setIsLoaded(true);
      });
  }, [user, authLoading, isPublished]);

  // Save to Neon DB on change (debounced)
  useEffect(() => {
    if (!user || pages.length === 0 || isPublished || !isLoaded) return;
    setSyncStatus("Saving...");
    const timer = setTimeout(() => {
      fetch('/api/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          uid: user.uid,
          pages,
          elementOverrides,
          globalTheme
        })
      })
      .then(res => res.json())
      .then(data => {
        if (data.success) setSyncStatus("Synced");
        else setSyncStatus("Error");
      })
      .catch(() => setSyncStatus("Error"));
    }, 2000);

    return () => clearTimeout(timer);
  }, [pages, elementOverrides, globalTheme, user]);

  const publishWebsite = async () => {
    if (!user) return null;
    try {
      const res = await fetch('/api/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid: user.uid, pages, elementOverrides, globalTheme })
      });
      const data = await res.json();
      return data.slug || null;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  const addPage = () => {
    const newId = `page-${pages.length + 1}`;
    setPages(prev => [...prev, { id: newId, name: `Page ${pages.length + 1}`, blocks: [] }]);
    setActivePageId(newId);
  };

  const addGeneratedPage = React.useCallback((name: string, blocks: any[]) => {
    const newId = `page-${Date.now()}`;
    setPages(prev => [...prev, { id: newId, name, blocks }]);
    setActivePageId(newId);
  }, []);

  const updatePageName = (id: string, name: string) => {
    setPages(prev => prev.map(p => p.id === id ? { ...p, name: name.trim() === "" ? p.name : name } : p));
  };

  const updateBlockType = (pageId: string, blockIndex: number, newType: string) => {
    setPages(prev => prev.map(p => {
      if (p.id !== pageId) return p;
      const newBlocks = [...p.blocks];
      if (newBlocks[blockIndex]) {
        newBlocks[blockIndex] = { ...newBlocks[blockIndex], type: newType };
      }
      return { ...p, blocks: newBlocks };
    }));
  };

  const cycleAllVariants = React.useCallback(() => {
    setPages(prev => prev.map(p => {
      if (p.id !== activePageId) return p;
      const newBlocks = p.blocks.map(block => {
        const match = block.type.match(/^(.*?)Variant(\d+)$/);
        if (!match) return block;
        const baseName = match[1];
        const currentVariant = parseInt(match[2]);

        let maxVariants = 1;
        if (baseName === "Navbar") maxVariants = 3;
        else if (baseName === "FAQ") maxVariants = 4;
        else if (baseName === "CTA") maxVariants = 5;
        else if (baseName === "Footer") maxVariants = 5;

        if (maxVariants > 1) {
          const nextVariant = currentVariant < maxVariants ? currentVariant + 1 : 1;
          return { ...block, type: `${baseName}Variant${nextVariant}` };
        }
        return block;
      });
      return { ...p, blocks: newBlocks };
    }));
  }, [activePageId]);

  const historyRef = React.useRef<Record<string, Partial<TextProperties>>[]>([{}]);
  const historyIndexRef = React.useRef<number>(0);
  const isUndoRedoRef = React.useRef<boolean>(false);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  const updateHistoryUI = () => {
    setCanUndo(historyIndexRef.current > 0);
    setCanRedo(historyIndexRef.current < historyRef.current.length - 1);
  };

  const updateOverride = React.useCallback((id: string, updates: Partial<TextProperties>) => {
    setElementOverrides(prev => {
      const newState = {
        ...prev,
        [id]: {
          ...prev[id],
          ...updates
        }
      };

      if (!isUndoRedoRef.current) {
        // truncate future history if a new change is made after undoing
        const newHistory = historyRef.current.slice(0, historyIndexRef.current + 1);
        newHistory.push(newState);
        historyRef.current = newHistory;
        historyIndexRef.current = newHistory.length - 1;
        updateHistoryUI();
      }
      isUndoRedoRef.current = false;

      return newState;
    });
  }, []);

  const undo = React.useCallback(() => {
    if (historyIndexRef.current > 0) {
      isUndoRedoRef.current = true;
      historyIndexRef.current -= 1;
      setElementOverrides(historyRef.current[historyIndexRef.current]);
      updateHistoryUI();
    }
  }, []);

  const undoAll = React.useCallback(() => {
    if (historyIndexRef.current > 0) {
      isUndoRedoRef.current = true;
      historyIndexRef.current = 0;
      setElementOverrides(historyRef.current[0]);
      updateHistoryUI();
    }
  }, []);

  const redo = React.useCallback(() => {
    if (historyIndexRef.current < historyRef.current.length - 1) {
      isUndoRedoRef.current = true;
      historyIndexRef.current += 1;
      setElementOverrides(historyRef.current[historyIndexRef.current]);
      updateHistoryUI();
    }
  }, []);

  // Keyboard Shortcuts for Undo/Redo
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (
        target instanceof HTMLInputElement || 
        target instanceof HTMLTextAreaElement || 
        target.isContentEditable ||
        target.closest('[data-editable]')
      ) {
        return;
      }

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'z') {
        if (e.shiftKey) {
          e.preventDefault();
          redo();
        } else if (e.altKey) {
          e.preventDefault();
          undoAll(); // Multiple undos
        } else {
          e.preventDefault();
          undo();
        }
      }

      if (e.key.toLowerCase() === 'h' && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault();
        cycleAllVariants();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo]);

  // Clear selection when clicking outside any editable element
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      // If clicking directly on body or non-editable wrapper, clear selection
      const target = e.target as HTMLElement;
      if (target && typeof target.closest === 'function') {
        if (target.closest('[data-editable]') || target.closest('[data-editor-panel="true"]')) {
          return;
        }
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
      elementOverrides, updateOverride,
      undo, redo, canUndo, canRedo,
      isPreviewMode, setIsPreviewMode,
      viewportSize, setViewportSize,
      pages, activePageId, setActivePageId, addPage, updatePageName, updateBlockType,
      addGeneratedPage,
      cycleAllVariants,
      iframeDoc, setIframeDoc,
      canvasTheme, setCanvasTheme,
      globalTheme, setGlobalTheme,
      syncStatus, publishWebsite,
      isLoaded,
      isLeftPanelOpen, setIsLeftPanelOpen,
      isRightPanelOpen, setIsRightPanelOpen,
      hasPaid
    }}>
      {children}
      {!isPreviewMode && selectedId && <BoundingBoxOverlay targetId={selectedId} />}
      {!isPreviewMode && hoveredId && hoveredId !== selectedId && <BoundingBoxOverlay targetId={hoveredId} isHover={true} />}
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
