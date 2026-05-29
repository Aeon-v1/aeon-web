"use client";

import React, { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { useEditor } from "./EditorProvider";

export function IframePreview({ children }: { children: React.ReactNode }) {
  const [iframeDocument, setIframeDocument] = useState<Document | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { setIframeDoc } = useEditor();

  const handleLoad = () => {
    const doc = iframeRef.current?.contentDocument;
    if (doc) {
      setIframeDocument(doc);
      setIframeDoc(doc);
      
      const syncStyles = () => {
        const styles = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'));
        
        // Remove old styles in iframe to avoid duplicates
        doc.head.innerHTML = '';
        
        styles.forEach(style => {
          doc.head.appendChild(style.cloneNode(true));
        });
        
        doc.documentElement.className = document.documentElement.className;
      };

      syncStyles();
      
      const observer = new MutationObserver((mutations) => {
        let shouldSync = false;
        mutations.forEach(m => {
          if (m.type === 'childList') {
            m.addedNodes.forEach(node => {
              if (node.nodeName === 'STYLE' || node.nodeName === 'LINK') shouldSync = true;
            });
          }
          if (m.type === 'attributes' && m.attributeName === 'class' && m.target === document.documentElement) {
            doc.documentElement.className = document.documentElement.className;
          }
        });
        if (shouldSync) syncStyles();
      });

      observer.observe(document.head, { childList: true, subtree: true });
      observer.observe(document.documentElement, { attributes: true });

      // Add a base style to the body for background and text color matching the theme
      doc.body.className = "bg-background text-foreground antialiased selection:bg-primary/20";
      // Allow scrolling inside the iframe cleanly
      doc.documentElement.style.overflowY = "auto";
      doc.documentElement.style.overflowX = "hidden";

      // Forward clicks to clear selection if clicking outside editable
      doc.addEventListener("mousedown", (e) => {
        const target = e.target as HTMLElement;
        if (!target.closest('[data-editable]')) {
          // This will bubble up conceptually, but just to be safe we can dispatch to parent
          document.dispatchEvent(new MouseEvent("mousedown", e));
        }
      });

      return () => observer.disconnect();
    }
  };

  return (
    <iframe
      ref={iframeRef}
      onLoad={handleLoad}
      className="w-full h-full border-none bg-background transition-colors duration-300 rounded-lg"
      title="Canvas Preview"
    >
      {iframeDocument && createPortal(children, iframeDocument.body)}
    </iframe>
  );
}
