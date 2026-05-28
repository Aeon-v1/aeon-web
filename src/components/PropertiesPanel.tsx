"use client";

import React, { useState, useEffect } from "react";
import { useEditor, TextProperties } from "./EditorProvider";
import {  
  Plus, 
  Minus, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  AlignJustify,
  Info,
  Home,
  Folder,
  FileText,
  ChevronRight,
  ChevronDown,
  Component,
  Monitor
} from "lucide-react";

import { MOCK_PAGE_DATA } from "@/data/mockPageData";


// --- Internal UI Components ---

const FONT_OPTIONS = [
  "Albert Sans", "Aleo", "Archivo", "Bricolage Grotesque", "Cinzel",
  "Cormorant Garamond", "DM Sans", "Domine", "EB Garamond", "Familjen Grotesk",
  "Funnel Display", "Funnel Sans", "Geist", "IBM Plex Sans", "IBM Plex Serif",
  "Instrument Sans", "Instrument Serif", "Inter Tight", "Inter", "Lexend",
  "Libre Baskerville", "Manrope", "Merriweather Sans", "Merriweather", "Mona Sans",
  "Onest", "Outfit", "Parkinsans", "Playfair Display", "Public Sans", "Rethink Sans",
  "Roboto", "Source Code Pro", "Source Sans 3", "Source Serif 4", "Space Grotesk",
  "Spline Sans", "TASA Orbiter"
];

function Section({ title, defaultOpen = true, children, hasInfo = false }: { title: string, defaultOpen?: boolean, children: React.ReactNode, hasInfo?: boolean }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-black/[0.04] dark:border-white/[0.04]">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-3 px-4 text-xs font-medium text-black dark:text-[#EFEEEA] hover:bg-black/[0.04] dark:hover:bg-white/[0.02] transition-colors"
      >
        <div className="flex items-center gap-1.5">
          {title}
          {hasInfo && <Info className="h-3 w-3 text-gray-600 dark:text-[#D8D8D6]/50" />}
        </div>
      </button>
      {isOpen && (
        <div className="px-4 pb-4 space-y-3">
          {children}
        </div>
      )}
    </div>
  );
}

function Row({ label, children, labelWidth = "w-[72px]" }: { label: React.ReactNode, children: React.ReactNode, labelWidth?: string }) {
  return (
    <div className="flex items-center gap-2 min-h-[32px]">
      <div className={`shrink-0 text-xs text-gray-600 dark:text-[#D8D8D6]/70 flex items-center gap-1.5 ${labelWidth}`}>
        {label}
      </div>
      <div className="flex-1 flex items-center min-w-0">
        {children}
      </div>
    </div>
  );
}

function Input({ value, onChange, type = "text", className = "", postfix }: { value: string, onChange?: (val: string) => void, type?: string, className?: string, postfix?: React.ReactNode }) {
  return (
    <div className="relative w-full flex items-center">
      <input 
        type={type} 
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className={`w-full bg-white dark:bg-[#1c1c1a] border border-black/[0.04] dark:border-white/[0.04] rounded-md px-2.5 py-1.5 text-xs text-black dark:text-[#EFEEEA] placeholder:text-gray-600 dark:text-[#D8D8D6]/40 focus:outline-none focus:border-black/[0.2] dark:focus:border-white/[0.2] transition-colors ${className}`}
      />
      {postfix && (
        <div className="absolute right-1 top-1 bottom-1 flex items-center bg-[#FDFDFC] dark:bg-[#111110] rounded-[4px] border border-black/[0.04] dark:border-white/[0.04] px-1.5 text-[10px] text-gray-600 dark:text-[#D8D8D6] cursor-pointer hover:bg-black/[0.04] dark:hover:bg-white/[0.04]">
          {postfix}
          <svg className="w-2.5 h-2.5 ml-1 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
        </div>
      )}
    </div>
  );
}

function Dropdown({ value, placeholder, icon }: { value?: string, placeholder?: string, icon?: React.ReactNode }) {
  return (
    <button className="w-full bg-white dark:bg-[#1c1c1a] border border-black/[0.04] dark:border-white/[0.04] rounded-md px-2.5 py-1.5 text-xs text-black dark:text-[#EFEEEA] flex items-center justify-between hover:border-black/[0.1] dark:hover:border-white/[0.1] transition-colors">
      <div className="flex items-center gap-2 truncate">
        {icon && <span className="text-gray-600 dark:text-[#D8D8D6]/50">{icon}</span>}
        <span className={value ? "text-black dark:text-[#EFEEEA]" : "text-gray-600 dark:text-[#D8D8D6]/40"}>{value || placeholder}</span>
      </div>
      <svg className="w-3 h-3 text-gray-600 dark:text-[#D8D8D6]/50 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
    </button>
  );
}

function FontDropdown({ value, onChange }: { value?: string, onChange: (font: string) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  
  const filteredFonts = FONT_OPTIONS.filter(f => f.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="relative w-full">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-white dark:bg-[#1c1c1a] border border-black/[0.04] dark:border-white/[0.04] rounded-md px-2.5 py-1.5 text-xs text-black dark:text-[#EFEEEA] flex items-center justify-between hover:border-black/[0.1] dark:hover:border-white/[0.1] transition-colors"
      >
        <span className="truncate">{value || "Default"}</span>
        <svg className="w-3 h-3 text-gray-600 dark:text-[#D8D8D6]/50 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
      </button>

      {isOpen && (
        <div className="absolute top-full mt-1 left-0 right-0 bg-[#FDFDFC] dark:bg-[#1F1F1E] border border-black/[0.08] dark:border-white/[0.08] rounded-md shadow-xl z-50 flex flex-col max-h-60">
          <div className="p-2 border-b border-black/[0.04] dark:border-white/[0.04] shrink-0">
            <input
              type="text"
              placeholder="Search font..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-black/[0.02] dark:bg-white/[0.02] rounded px-2 py-1.5 text-xs text-black dark:text-[#EFEEEA] outline-none placeholder:text-gray-500"
              autoFocus
            />
          </div>
          <div className="overflow-y-auto custom-scrollbar flex-1 py-1">
            {filteredFonts.map(font => (
              <button
                key={font}
                onClick={() => {
                  onChange(font);
                  setIsOpen(false);
                }}
                className="w-full text-left px-3 py-1.5 text-xs text-black dark:text-[#EFEEEA] hover:bg-black/[0.04] dark:hover:bg-white/[0.04]"
                style={{ fontFamily: font }}
              >
                {font}
              </button>
            ))}
            {filteredFonts.length === 0 && (
              <div className="px-3 py-2 text-xs text-gray-500">No fonts found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function ToggleGroup({ options, activeIndex, onChange }: { options: React.ReactNode[], activeIndex: number, onChange?: (index: number) => void }) {
  return (
    <div className="flex items-center bg-white dark:bg-[#1c1c1a] border border-black/[0.04] dark:border-white/[0.04] rounded-md p-0.5 w-full">
      {options.map((opt, i) => (
        <button
          key={i}
          onClick={() => onChange?.(i)}
          className={`flex-1 flex items-center justify-center py-1 px-2 text-xs rounded-[4px] transition-colors ${
            i === activeIndex 
              ? "bg-[#FDFDFC] dark:bg-[#111110] text-black dark:text-[#EFEEEA] shadow-[0_1px_2px_rgba(0,0,0,0.5)] border border-black/[0.04] dark:border-white/[0.04]" 
              : "text-gray-600 dark:text-[#D8D8D6]/60 hover:text-black dark:text-[#EFEEEA]"
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

function Slider({ value }: { value: number }) {
  return (
    <div className="w-full flex items-center gap-2">
      <div className="relative flex-1 h-1 bg-white dark:bg-[#1c1c1a] rounded-full overflow-hidden">
        <div className="absolute top-0 left-0 bottom-0 bg-blue-500 rounded-full" style={{ width: `${value * 100}%` }} />
      </div>
      <div className="w-3 h-3 bg-[#EFEEEA] rounded-full shadow-sm border border-black/20 shrink-0" />
    </div>
  );
}

function TreeItem({ icon, label, level = 0, active = false, collapsible = false, collapsed = false }: { icon: React.ReactNode, label: React.ReactNode, level?: number, active?: boolean, collapsible?: boolean, collapsed?: boolean }) {
  return (
    <button 
      className={`w-full flex items-center gap-1.5 py-1.5 px-3 text-xs transition-colors hover:bg-black/[0.04] dark:hover:bg-white/[0.04] ${active ? "bg-white dark:bg-[#1c1c1a] text-black dark:text-[#EFEEEA]" : "text-gray-600 dark:text-[#D8D8D6]"}`}
      style={{ paddingLeft: `${(level * 16) + 12}px` }}
    >
      <div className="w-3 h-3 flex items-center justify-center shrink-0 -ml-1">
        {collapsible && (
          collapsed ? <ChevronRight className="w-3 h-3 text-gray-600 dark:text-[#D8D8D6]/50" /> : <ChevronDown className="w-3 h-3 text-gray-600 dark:text-[#D8D8D6]/50" />
        )}
      </div>
      <div className="text-gray-600 dark:text-[#D8D8D6]/80 shrink-0 flex items-center justify-center">
        {icon}
      </div>
      <span className="truncate">{label}</span>
    </button>
  );
}

function PagesView() {
  const [pages, setPages] = useState([{ id: "home", name: "Home" }]);
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleAddPage = () => {
    const newId = `page-${pages.length + 1}`;
    setPages([...pages, { id: newId, name: "" }]);
    setEditingId(newId);
  };

  const handleNameChange = (id: string, newName: string) => {
    const finalName = newName.trim() === "" ? `page-${pages.length}` : newName;
    setPages(pages.map(p => p.id === id ? { ...p, name: finalName } : p));
    setEditingId(null);
  };

  return (
    <div className="py-3">
      <div className="px-4 pb-2 flex items-center justify-between text-black dark:text-[#EFEEEA] text-sm font-medium mb-1">
        <span>Pages</span>
        <button 
          onClick={handleAddPage}
          className="w-5 h-5 flex items-center justify-center hover:bg-black/[0.04] dark:hover:bg-white/[0.06] rounded transition-colors text-gray-600 dark:text-[#D8D8D6]"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>
      
      <div className="space-y-0.5 mt-2">
        {pages.map((page, idx) => (
          editingId === page.id ? (
            <div key={page.id} className="px-3 py-1.5 flex items-center gap-1.5 ml-3">
              <FileText className="w-3.5 h-3.5 text-gray-600 dark:text-[#D8D8D6]/80 shrink-0" />
              <input 
                autoFocus
                className="w-full bg-white dark:bg-[#1c1c1a] border border-black/10 dark:border-white/10 rounded px-1.5 py-0.5 text-xs text-black dark:text-[#EFEEEA] outline-none"
                defaultValue={page.name}
                onBlur={(e) => handleNameChange(page.id, e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleNameChange(page.id, e.currentTarget.value);
                }}
              />
            </div>
          ) : (
            <TreeItem 
              key={page.id}
              icon={idx === 0 ? <Home className="w-3.5 h-3.5" /> : <FileText className="w-3.5 h-3.5" />} 
              label={idx === 0 ? page.name : `/${page.name}`} 
              level={0} 
              active={idx === 0} 
            />
          )
        ))}
      </div>
    </div>
  );
}

function BlocksView() {
  return (
    <div className="py-3">
      <div className="px-4 pb-2 flex items-center justify-between text-black dark:text-[#EFEEEA] text-sm font-medium border-b border-black/[0.04] dark:border-white/[0.04] mb-2">
        <span>Blocks</span>
      </div>
      
      <div className="space-y-0.5">
        {MOCK_PAGE_DATA.map((block, i) => {
          const name = block.type.replace(/Variant\d+$/, "");
          return (
            <TreeItem 
              key={i}
              icon={<Component className="w-3.5 h-3.5 text-purple-400" />} 
              label={name} 
              level={0} 
            />
          );
        })}
      </div>
    </div>
  );
}

export function PropertiesPanel() {
  const { selectedId, elementOverrides, updateOverride } = useEditor();
  const [activeTab, setActiveTab] = useState(2); // 0: Pages, 1: Blocks, 2: Properties
  const [computedStyles, setComputedStyles] = useState<Record<string, string>>({});

  useEffect(() => {
    if (selectedId) {
      const timeout = setTimeout(() => {
        const el = document.querySelector(`[data-editable-id="${selectedId.replace(/"/g, '\\"')}"]`) as HTMLElement;
        if (el) {
          const styles = window.getComputedStyle(el);
          setComputedStyles({
            content: el.innerText,
            fontSize: styles.fontSize,
            fontWeight: styles.fontWeight,
            color: styles.color,
            letterSpacing: styles.letterSpacing,
            lineHeight: styles.lineHeight,
            textAlign: styles.textAlign,
            backgroundColor: styles.backgroundColor,
            borderRadius: styles.borderRadius,
            boxShadow: styles.boxShadow,
          });
        }
      }, 0);
      return () => clearTimeout(timeout);
    } else {
      setComputedStyles({});
    }
  }, [selectedId, elementOverrides]);

  const overrides = selectedId ? (elementOverrides[selectedId] || {}) : {};

  const handleUpdate = (updates: Partial<TextProperties>) => {
    if (selectedId) {
      updateOverride(selectedId, updates);
    }
  };

  return (
    <div data-editor-panel="true" className="w-80 h-full bg-[#FDFDFC] dark:bg-[#1F1F1E] flex flex-col font-sans shrink-0 select-none">
      
      {/* Panel Header */}
      <div className="p-3 border-b border-black/[0.06] dark:border-white/[0.06]">
        <ToggleGroup 
          options={["Pages", "Blocks", "Properties"]} 
          activeIndex={activeTab} 
          onChange={setActiveTab}
        />
      </div>

      {/* Panel Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {activeTab === 0 && <PagesView />}
        {activeTab === 1 && <BlocksView />}
        {activeTab === 2 && (
          <div className={`pb-8 transition-opacity duration-300 ${!selectedId ? 'opacity-30 pointer-events-none select-none' : ''}`}>
            {/* Styles Section */}
            <Section title="Styles">
              <Row label={<><Plus className="h-3 w-3" /> Opacity</>}>
                <div className="flex items-center gap-3 w-full">
                  <div className="w-16"><Input value="1" /></div>
                  <Slider value={0.8} />
                </div>
              </Row>
              <Row label={<><Plus className="h-3 w-3" /> Visible</>}>
                <ToggleGroup options={[<span key="yes" className="text-blue-400 font-medium">Yes</span>, <span key="no">No</span>]} activeIndex={0} />
              </Row>
            </Section>

            {/* Text Section */}
            <Section title="Text">
              <Row label="Styles">
                <Dropdown placeholder="Select..." icon={<div className="w-4 h-4 bg-black/10 dark:bg-white/10 rounded flex items-center justify-center text-[10px] font-bold">T</div>} />
              </Row>
              
              <Row label={<><Plus className="h-3 w-3" /> Content</>}>
                <Input 
                  value={overrides.content ?? computedStyles.content ?? ""} 
                  onChange={(val) => handleUpdate({ content: val })} 
                />
              </Row>

              <Row label="Font">
                <FontDropdown 
                  value={overrides.fontFamily ?? (computedStyles.fontFamily ? computedStyles.fontFamily.replace(/['"]/g, '').split(',')[0] : "")} 
                  onChange={(font) => handleUpdate({ fontFamily: font })} 
                />
              </Row>
              <Row label="Weight">
                <Input 
                  value={overrides.fontWeight ?? computedStyles.fontWeight ?? "400"} 
                  onChange={(val) => handleUpdate({ fontWeight: val })} 
                />
              </Row>
              
              <Row label="Color">
                <Input 
                  value={overrides.color ?? computedStyles.color ?? ""} 
                  onChange={(val) => handleUpdate({ color: val })} 
                />
              </Row>

              <Row label={<><Plus className="h-3 w-3" /> Size</>}>
                <div className="flex items-center gap-2 w-full">
                  <Input 
                    value={overrides.fontSize?.toString() ?? (computedStyles.fontSize ? parseFloat(computedStyles.fontSize).toString() : "")} 
                    onChange={(val) => {
                      const num = parseInt(val);
                      if (!isNaN(num)) handleUpdate({ fontSize: num });
                    }} 
                    postfix="Px" 
                  />
                </div>
              </Row>
              
              <Row label="Letter">
                <Input 
                  value={overrides.letterSpacing?.toString() ?? (computedStyles.letterSpacing && computedStyles.letterSpacing !== "normal" ? parseFloat(computedStyles.letterSpacing).toString() : "0")} 
                  onChange={(val) => {
                    const num = parseInt(val);
                    if (!isNaN(num)) handleUpdate({ letterSpacing: num });
                  }} 
                  postfix="Px" 
                />
              </Row>
              
              <Row label="Line">
                <Input 
                  value={overrides.lineHeight?.toString() ?? (computedStyles.lineHeight !== "normal" && computedStyles.lineHeight ? parseFloat(computedStyles.lineHeight).toString() : "")} 
                  onChange={(val) => {
                    const num = parseInt(val);
                    if (!isNaN(num)) handleUpdate({ lineHeight: num });
                  }} 
                  postfix="%" 
                />
              </Row>

              <Row label="Align">
                <ToggleGroup 
                  options={[
                    <AlignLeft key="l" className="w-3.5 h-3.5" />, 
                    <AlignCenter key="c" className="w-3.5 h-3.5" />, 
                    <AlignRight key="r" className="w-3.5 h-3.5" />, 
                    <AlignJustify key="j" className="w-3.5 h-3.5" />
                  ]} 
                  activeIndex={
                    (overrides.textAlign || computedStyles.textAlign) === "center" ? 1 :
                    (overrides.textAlign || computedStyles.textAlign) === "right" ? 2 :
                    (overrides.textAlign || computedStyles.textAlign) === "justify" ? 3 : 0
                  }
                  onChange={(idx) => {
                    const map: ("left"|"center"|"right"|"justify")[] = ["left", "center", "right", "justify"];
                    handleUpdate({ textAlign: map[idx] });
                  }}
                />
              </Row>

              <Row label="OpenType">
                <div className="flex items-center gap-2 w-full">
                  <button className="w-7 h-5 bg-white dark:bg-[#1c1c1a] border border-black/[0.04] dark:border-white/[0.04] rounded-full flex items-center px-0.5">
                    <div className="w-4 h-4 bg-black/[0.2] dark:bg-white/[0.2] rounded-full" />
                  </button>
                  <div className="flex-1">
                    <Input value="" placeholder="Add..." className="bg-transparent border-none placeholder:text-gray-600 dark:text-[#D8D8D6]/30" />
                  </div>
                </div>
              </Row>
            </Section>

            {/* Button Section */}
            <Section title="Button">
              <Row label={<><Plus className="h-3 w-3" /> Background</>}>
                <Input 
                  value={overrides.backgroundColor ?? computedStyles.backgroundColor ?? ""} 
                  onChange={(val) => handleUpdate({ backgroundColor: val })} 
                />
              </Row>
              
              <Row label={<><Plus className="h-3 w-3" /> Radius</>}>
                <div className="flex items-center gap-2 w-full">
                  <Input 
                    value={overrides.borderRadius?.toString() ?? (computedStyles.borderRadius && computedStyles.borderRadius !== "0px" ? parseFloat(computedStyles.borderRadius).toString() : "0")} 
                    onChange={(val) => {
                      const num = parseInt(val);
                      if (!isNaN(num)) handleUpdate({ borderRadius: num });
                    }} 
                    postfix="Px" 
                  />
                </div>
              </Row>

              <Row label="Shadow">
                <Input 
                  value={overrides.boxShadow ?? computedStyles.boxShadow ?? "none"} 
                  onChange={(val) => handleUpdate({ boxShadow: val })} 
                />
              </Row>

              <Row label="Link">
                <Input 
                  value={overrides.href ?? ""} 
                  onChange={(val) => handleUpdate({ href: val })} 
                  placeholder="https://"
                />
              </Row>
            </Section>
          </div>
        )}
      </div>
    </div>
  );
}
