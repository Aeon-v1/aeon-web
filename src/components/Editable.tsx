"use client";

import React, { useRef, useEffect, useId } from "react";
import { useEditor } from "./EditorProvider";

export interface EditableProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  defaultText: string;
  propName?: string;
  inline?: boolean;
  id?: string;
}

export function Editable({
  as: Component = "span",
  defaultText,
  propName,
  inline = false,
  className = "",
  id: explicitId,
  ...props
}: EditableProps) {
  const { selectedId, setSelectedId, editingId, setEditingId, hoveredId, setHoveredId, elementOverrides, updateOverride, isPreviewMode } = useEditor();
  const generatedId = useId(); 
  const id = explicitId ?? generatedId;
  
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
      const range = document.createRange();
      const selection = window.getSelection();
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
  id?: string;
}

export function EditableButton({
  as: Component = "a",
  href,
  className = "",
  children,
  id: explicitId,
  ...props
}: EditableButtonProps) {
  const { selectedId, setSelectedId, editingId, setEditingId, hoveredId, setHoveredId, elementOverrides, isPreviewMode } = useEditor();
  const generatedId = useId(); 
  const id = explicitId ?? generatedId; 
  
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

  const currentHref = overrides.href ?? href;

  return (
    <Component
      ref={elementRef}
      className={className}
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
  id?: string;
}

export function EditableSection({
  as: Component = "section",
  className = "",
  children,
  id: explicitId,
  ...props
}: EditableSectionProps) {
  const { selectedId, setSelectedId, editingId, setEditingId, hoveredId, setHoveredId, elementOverrides, isPreviewMode } = useEditor();
  const generatedId = useId(); 
  const id = explicitId ?? generatedId; 
  
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

  return (
    <Component
      ref={elementRef}
      className={className}
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
