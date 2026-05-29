"use client";

import React, { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { useEditor } from "./EditorProvider";

export function IframePreview({ children }: { children: React.ReactNode }) {
  const [iframeDocument, setIframeDocument] = useState<Document | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { setIframeDoc, canvasTheme, globalTheme } = useEditor();

  const handleLoad = () => {
    const doc = iframeRef.current?.contentDocument;
    if (doc) {
      setIframeDocument(doc);
      setIframeDoc(doc);

      const syncStyles = () => {
        const styles = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'));
        
        // Remove old styles in iframe to avoid duplicates, but preserve our custom styles
        Array.from(doc.head.children).forEach(child => {
          if (child.id !== 'global-theme-style' && child.id !== 'iframe-scroll-style') {
            child.remove();
          }
        });
        
        styles.forEach(style => {
          doc.head.appendChild(style.cloneNode(true));
        });
        
        // Ensure our custom styles stay at the end
        const themeStyle = doc.getElementById('global-theme-style');
        if (themeStyle) doc.head.appendChild(themeStyle);
        
        // Hide scrollbar but keep scroll functionality
        let scrollStyle = doc.getElementById('iframe-scroll-style') as HTMLStyleElement;
        if (!scrollStyle) {
          scrollStyle = doc.createElement('style');
          scrollStyle.id = 'iframe-scroll-style';
          scrollStyle.innerHTML = `
            ::-webkit-scrollbar { display: none !important; }
            * { -ms-overflow-style: none !important; scrollbar-width: none !important; }
          `;
          doc.head.appendChild(scrollStyle);
        }

        doc.documentElement.className = document.documentElement.className.replace(/\bdark\b/g, '').trim() + (canvasTheme === 'dark' ? ' dark' : '');
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
            doc.documentElement.className = document.documentElement.className.replace(/\bdark\b/g, '').trim() + (canvasTheme === 'dark' ? ' dark' : '');
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
        if (target && typeof target.closest === 'function') {
          if (!target.closest('[data-editable]')) {
            document.dispatchEvent(new MouseEvent("mousedown", e));
          }
        } else {
          document.dispatchEvent(new MouseEvent("mousedown", e));
        }
      });

      return () => observer.disconnect();
    }
  };

  useEffect(() => {
    let cleanup: (() => void) | undefined;
    if (iframeRef.current?.contentDocument?.readyState === "complete") {
      cleanup = handleLoad();
    }
    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  useEffect(() => {
    if (iframeDocument) {
      iframeDocument.documentElement.className = document.documentElement.className.replace(/\bdark\b/g, '').trim() + (canvasTheme === 'dark' ? ' dark' : '');
    }
  }, [canvasTheme, iframeDocument]);

  useEffect(() => {
    if (!iframeDocument) return;
    
    const hexToHsl = (hex: string) => {
      let r = 0, g = 0, b = 0;
      if (hex.length === 4) {
        r = parseInt(hex[1] + hex[1], 16);
        g = parseInt(hex[2] + hex[2], 16);
        b = parseInt(hex[3] + hex[3], 16);
      } else if (hex.length === 7) {
        r = parseInt(hex.substring(1, 3), 16);
        g = parseInt(hex.substring(3, 5), 16);
        b = parseInt(hex.substring(5, 7), 16);
      }
      r /= 255; g /= 255; b /= 255;
      const max = Math.max(r, g, b), min = Math.min(r, g, b);
      let h = 0, s = 0, l = (max + min) / 2;
      if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case r: h = (g - b) / d + (g < b ? 6 : 0); break;
          case g: h = (b - r) / d + 2; break;
          case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
      }
      return `${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%`;
    };

    let styleEl = iframeDocument.getElementById('global-theme-style');
    if (!styleEl) {
      styleEl = iframeDocument.createElement('style');
      styleEl.id = 'global-theme-style';
      iframeDocument.head.appendChild(styleEl);
    }

    let cssVars = '';
    if (globalTheme.headingFont) cssVars += `--font-heading: "${globalTheme.headingFont}", sans-serif;\n`;
    if (globalTheme.bodyFont) cssVars += `--font-body: "${globalTheme.bodyFont}", sans-serif;\n`;
    if (globalTheme.primaryColor) {
      cssVars += `--primary: ${globalTheme.primaryColor};\n`;
      cssVars += `--hu-primary: ${hexToHsl(globalTheme.primaryColor)};\n`;
    }
    if (globalTheme.secondaryColor) {
      cssVars += `--secondary: ${globalTheme.secondaryColor};\n`;
      cssVars += `--hu-secondary: ${hexToHsl(globalTheme.secondaryColor)};\n`;
    }
    if (globalTheme.accentColor) {
      cssVars += `--accent: ${globalTheme.accentColor};\n`;
      cssVars += `--hu-accent: ${hexToHsl(globalTheme.accentColor)};\n`;
    }

    styleEl.innerHTML = `
      :root, .dark, .light {
        ${cssVars}
      }
    `;
    
    // Always ensure it's the last element in the head so it overrides Tailwind's variables
    iframeDocument.head.appendChild(styleEl);
  }, [globalTheme, iframeDocument]);

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
