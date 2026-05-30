"use client";

import React, { useRef, useEffect, useId } from "react";
import { useEditor } from "./EditorProvider";
import { BlockContext } from "./BlockRenderer";

export interface EditableProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  defaultText: string;
  propName?: string;
  inline?: boolean;
  inline?: boolean;
  id?: string;
  stableId?: string;
}

export function Editable({
  as: Component = "span",
  defaultText,
  propName,
  inline = false,
  className = "",
  id: explicitId,
  stableId,
  ...props
}: EditableProps) {
  const { selectedId, setSelectedId, editingId, setEditingId, hoveredId, setHoveredId, elementOverrides, updateOverride, isPreviewMode } = useEditor();
  const blockId = React.useContext(BlockContext);
  const generatedId = useId(); 
  const id = explicitId ?? (blockId && stableId ? `${blockId}-${stableId}` : generatedId);
  
  const isSelected = selectedId === id;
  const isEditing = editingId === id;
  const isHovered = hoveredId === id;
  
  const overrides = elementOverrides[id] || {};
  const currentText = overrides.content ?? defaultText;
  
  const elementRef = useRef<HTMLElement>(null);

  // Focus the element when it enters editing mode
  useEffect(() => {
    if (isEditing && elementRef.current) {
      elementRef.current.focus();
      
      // Move caret to the end of the text
      const doc = elementRef.current.ownerDocument;
      const win = doc.defaultView;
      const range = doc.createRange();
      const selection = win?.getSelection();
      range.selectNodeContents(elementRef.current);
      range.collapse(false); // false means collapse to end
      selection?.removeAllRanges();
      selection?.addRange(range);
    }
  }, [isEditing]);

  const handleClick = (e: React.MouseEvent) => {
    if (isPreviewMode) return;
    e.stopPropagation(); // Prevent document click from clearing selection
    if (!isSelected) {
      setSelectedId(id);
      setEditingId(null);
    }
  };

  const handleMouseOver = (e: React.MouseEvent) => {
    if (isPreviewMode) return;
    e.stopPropagation();
    setHoveredId(id);
  };

  const handleMouseOut = (e: React.MouseEvent) => {
    if (isPreviewMode) return;
    e.stopPropagation();
    setHoveredId(null);
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    if (isPreviewMode) return;
    e.stopPropagation();
    setSelectedId(id);
    setEditingId(id);
  };

  const handleBlur = (e: React.FocusEvent<HTMLElement>) => {
    if (isEditing) {
      updateOverride(id, { content: e.currentTarget.innerText });
      setEditingId(null);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isEditing && e.key === "Enter") {
      // Prevent newlines in headings/single line text
      if (Component !== "p") {
        e.preventDefault();
        elementRef.current?.blur();
      }
    }
    if (isEditing && e.key === "Escape") {
      // Revert to original text and exit editing
      if (elementRef.current) {
        elementRef.current.innerText = currentText;
        elementRef.current.blur();
      }
    }
  };

  // Base classes for the component plus hover states
  const boxClasses = `
    transition-all duration-200 outline-none
    ${!isSelected && !isEditing ? "cursor-default rounded-sm" : ""}
    ${isSelected && !isEditing ? "cursor-default" : ""}
    ${isEditing ? "cursor-text" : ""}
    ${inline ? "inline-block" : ""}
  `;

  const dynamicStyles: React.CSSProperties = {
    ...props.style,
  };
  if (overrides.fontFamily) dynamicStyles.fontFamily = overrides.fontFamily;
  if (overrides.fontSize) dynamicStyles.fontSize = `${overrides.fontSize}px`;
  if (overrides.fontWeight) dynamicStyles.fontWeight = overrides.fontWeight;
  if (overrides.color) dynamicStyles.color = overrides.color;
  if (overrides.letterSpacing !== undefined) dynamicStyles.letterSpacing = `${overrides.letterSpacing}px`;
  if (overrides.lineHeight) dynamicStyles.lineHeight = `${overrides.lineHeight}%`;
  if (overrides.textAlign) dynamicStyles.textAlign = overrides.textAlign;
  if (overrides.opacity !== undefined) dynamicStyles.opacity = overrides.opacity;
  if (overrides.visible === false) dynamicStyles.display = "none";

  return (
    <Component
      ref={elementRef}
      className={`${className} ${boxClasses}`.trim()}
      style={dynamicStyles}
      data-editable="true"
      data-editable-id={id}
      contentEditable={isEditing}
      suppressContentEditableWarning={true}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      {...props}
    >
      {currentText}
    </Component>
  );
}

export interface EditableButtonProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  href?: string;
  children?: React.ReactNode;
  children?: React.ReactNode;
  id?: string;
  stableId?: string;
}

export function EditableButton({
  as: Component = "a",
  href,
  className = "",
  children,
  id: explicitId,
  stableId,
  ...props
}: EditableButtonProps) {
  const { selectedId, setSelectedId, editingId, setEditingId, hoveredId, setHoveredId, elementOverrides, isPreviewMode, canvasTheme } = useEditor();
  const blockId = React.useContext(BlockContext);
  const generatedId = useId(); 
  const id = explicitId ?? (blockId && stableId ? `${blockId}-${stableId}` : generatedId); 
  
  const isSelected = selectedId === id;
  
  const overrides = elementOverrides[id] || {};
  const elementRef = useRef<HTMLElement>(null);

  const handleClick = (e: React.MouseEvent) => {
    if (isPreviewMode) return;
    e.preventDefault(); // Prevent navigation
    e.stopPropagation();
    if (!isSelected) {
      setSelectedId(id);
      setEditingId(null);
    }
  };

  const handleMouseOver = (e: React.MouseEvent) => {
    if (isPreviewMode) return;
    e.stopPropagation();
    setHoveredId(id);
  };

  const handleMouseOut = (e: React.MouseEvent) => {
    if (isPreviewMode) return;
    e.stopPropagation();
    setHoveredId(null);
  };

  const dynamicStyles: React.CSSProperties = {
    ...props.style,
  };
  if (overrides.backgroundColor) dynamicStyles.backgroundColor = overrides.backgroundColor;
  if (overrides.borderRadius !== undefined) dynamicStyles.borderRadius = `${overrides.borderRadius}px`;
  if (overrides.boxShadow) dynamicStyles.boxShadow = overrides.boxShadow;
  if (overrides.opacity !== undefined) dynamicStyles.opacity = overrides.opacity;
  if (overrides.visible === false) dynamicStyles.display = "none";

  const currentHref = overrides.href ?? href;
  
  let finalClassName = className;
  if (overrides.invert) {
    if (canvasTheme === "light") {
      finalClassName += " dark";
    } else {
      finalClassName += " light";
    }
  }

  return (
    <Component
      ref={elementRef}
      className={finalClassName}
      style={dynamicStyles}
      data-editable="true"
      data-editable-id={id}
      onClick={handleClick}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      href={currentHref}
      {...props}
    >
      {children}
    </Component>
  );
}

export interface EditableSectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  children?: React.ReactNode;
  children?: React.ReactNode;
  id?: string;
  stableId?: string;
}

export function EditableSection({
  as: Component = "section",
  className = "",
  children,
  id: explicitId,
  stableId,
  ...props
}: EditableSectionProps) {
  const { selectedId, setSelectedId, editingId, setEditingId, hoveredId, setHoveredId, elementOverrides, isPreviewMode, canvasTheme } = useEditor();
  const blockId = React.useContext(BlockContext);
  const generatedId = useId(); 
  const id = explicitId ?? (blockId && stableId ? `${blockId}-${stableId}` : generatedId); 
  
  const isSelected = selectedId === id;
  const overrides = elementOverrides[id] || {};
  const elementRef = useRef<HTMLElement>(null);

  const handleClick = (e: React.MouseEvent) => {
    if (isPreviewMode) return;
    e.stopPropagation();
    if (!isSelected) {
      setSelectedId(id);
      setEditingId(null);
    }
  };

  const handleMouseOver = (e: React.MouseEvent) => {
    if (isPreviewMode) return;
    e.stopPropagation();
    setHoveredId(id);
  };

  const handleMouseOut = (e: React.MouseEvent) => {
    if (isPreviewMode) return;
    e.stopPropagation();
    setHoveredId(null);
  };

  const dynamicStyles: React.CSSProperties = {
    ...props.style,
  };
  
  if (overrides.backgroundColor) dynamicStyles.backgroundColor = overrides.backgroundColor;
  if (overrides.paddingTop !== undefined) dynamicStyles.paddingTop = `${overrides.paddingTop}px`;
  if (overrides.paddingBottom !== undefined) dynamicStyles.paddingBottom = `${overrides.paddingBottom}px`;
  if (overrides.opacity !== undefined) dynamicStyles.opacity = overrides.opacity;
  if (overrides.visible === false) dynamicStyles.display = "none";

  let finalClassName = className;
  if (overrides.invert) {
    if (canvasTheme === "light") {
      finalClassName += " dark";
    } else {
      finalClassName += " light";
    }
  }

  return (
    <Component
      ref={elementRef}
      className={finalClassName}
      style={dynamicStyles}
      data-editable="true"
      data-editable-id={id}
      onClick={handleClick}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      {...props}
    >
      {children}
    </Component>
  );
}

export interface EditableImageProps extends React.HTMLAttributes<HTMLImageElement> {
  src?: string;
  alt?: string;
  fallbackQuery?: string;
  fallbackQuery?: string;
  id?: string;
  stableId?: string;
}

export function EditableImage({
  src,
  alt = "Image",
  fallbackQuery,
  className = "",
  id: explicitId,
  stableId,
  ...props
}: EditableImageProps) {
  const { selectedId, setSelectedId, editingId, setEditingId, hoveredId, setHoveredId, elementOverrides, isPreviewMode } = useEditor();
  const blockId = React.useContext(BlockContext);
  const generatedId = useId(); 
  const id = explicitId ?? (blockId && stableId ? `${blockId}-${stableId}` : generatedId); 
  
  const isSelected = selectedId === id;
  const overrides = elementOverrides[id] || {};
  const elementRef = useRef<HTMLImageElement>(null);

  const handleClick = (e: React.MouseEvent) => {
    if (isPreviewMode) return;
    e.stopPropagation();
    if (!isSelected) {
      setSelectedId(id);
      setEditingId(null);
    }
  };

  const handleMouseOver = (e: React.MouseEvent) => {
    if (isPreviewMode) return;
    e.stopPropagation();
    setHoveredId(id);
  };

  const handleMouseOut = (e: React.MouseEvent) => {
    if (isPreviewMode) return;
    e.stopPropagation();
    setHoveredId(null);
  };

  const dynamicStyles: React.CSSProperties = {
    ...props.style,
  };
  
  if (overrides.borderRadius !== undefined) dynamicStyles.borderRadius = `${overrides.borderRadius}px`;
  if (overrides.boxShadow) dynamicStyles.boxShadow = overrides.boxShadow;
  if (overrides.opacity !== undefined) dynamicStyles.opacity = overrides.opacity;
  if (overrides.visible === false) dynamicStyles.display = "none";

  let finalClassName = className;
  if (isSelected) {
    finalClassName += " ring-2 ring-primary ring-offset-2";
  }

  // Determine the final source
  let finalSrc = overrides.src ?? src;
  if (!finalSrc && fallbackQuery) {
    finalSrc = `https://image.pollinations.ai/prompt/${encodeURIComponent(fallbackQuery)}?width=800&height=600&nologo=true`;
  }
  
  const finalAlt = overrides.alt ?? alt;

  return (
    <img
      ref={elementRef}
      className={finalClassName}
      style={dynamicStyles}
      data-editable="true"
      data-editable-id={id}
      onClick={handleClick}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      src={finalSrc}
      alt={finalAlt}
      {...props}
    />
  );
}
