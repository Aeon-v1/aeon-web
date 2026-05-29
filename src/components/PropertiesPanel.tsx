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
        className="w-full flex items-center justify-between py-3 px-4 text-[13px] font-medium text-black dark:text-[#EFEEEA] hover:bg-black/[0.04] dark:hover:bg-white/[0.02] transition-colors"
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
      <div className={`shrink-0 text-[13px] text-gray-600 dark:text-[#D8D8D6]/70 flex items-center gap-1.5 ${labelWidth}`}>
        {label}
      </div>
      <div className="flex-1 flex items-center min-w-0">
        {children}
      </div>
    </div>
  );
}

function Input({ value, onChange, type = "text", className = "", postfix, onKeyDown }: { value: string, onChange?: (val: string) => void, type?: string, className?: string, postfix?: React.ReactNode, onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void }) {
  return (
    <div className="relative w-full flex items-center">
      <input 
        type={type} 
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        onKeyDown={onKeyDown}
        className={`w-full bg-white dark:bg-[#1c1c1a] border border-black/[0.04] dark:border-white/[0.04] rounded-md px-2.5 py-1.5 text-[13px] text-black dark:text-[#EFEEEA] placeholder:text-gray-600 dark:text-[#D8D8D6]/40 focus:outline-none focus:border-black/[0.2] dark:focus:border-white/[0.2] transition-colors ${className}`}
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

function rgbToHex(rgb: string) {
  if (!rgb) return "#000000";
  if (rgb.startsWith("#")) {
    if (rgb.length === 4) return "#" + rgb[1]+rgb[1]+rgb[2]+rgb[2]+rgb[3]+rgb[3];
    return rgb.substring(0, 7);
  }
  const match = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (!match) return "#000000";
  const r = parseInt(match[1]).toString(16).padStart(2, '0');
  const g = parseInt(match[2]).toString(16).padStart(2, '0');
  const b = parseInt(match[3]).toString(16).padStart(2, '0');
  return `#${r}${g}${b}`;
}

function ColorInput({ value, onChange }: { value: string, onChange?: (val: string) => void }) {
  const hexValue = rgbToHex(value);
  
  return (
    <div className="relative w-full flex items-center">
      <div className="absolute left-1.5 flex items-center justify-center pointer-events-none">
        <div className="w-4 h-4 rounded-[3px] border border-black/10 dark:border-white/10 shadow-sm overflow-hidden relative">
           <div className="absolute inset-0" style={{ backgroundColor: value || "#000000" }} />
        </div>
      </div>
      <input 
        type="color"
        value={hexValue}
        onChange={(e) => onChange?.(e.target.value)}
        className="absolute left-1.5 w-4 h-4 opacity-0 cursor-pointer"
      />
      <input 
        type="text" 
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className={`w-full bg-white dark:bg-[#1c1c1a] border border-black/[0.04] dark:border-white/[0.04] rounded-md pl-7 pr-2.5 py-1.5 text-[13px] text-black dark:text-[#EFEEEA] placeholder:text-gray-600 dark:text-[#D8D8D6]/40 focus:outline-none focus:border-black/[0.2] dark:focus:border-white/[0.2] transition-colors`}
      />
    </div>
  );
}

function Dropdown({ value, placeholder, icon }: { value?: string, placeholder?: string, icon?: React.ReactNode }) {
  return (
    <button className="w-full bg-white dark:bg-[#1c1c1a] border border-black/[0.04] dark:border-white/[0.04] rounded-md px-2.5 py-1.5 text-[13px] text-black dark:text-[#EFEEEA] flex items-center justify-between hover:border-black/[0.1] dark:hover:border-white/[0.1] transition-colors">
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
        className="w-full bg-white dark:bg-[#1c1c1a] border border-black/[0.04] dark:border-white/[0.04] rounded-md px-2.5 py-1.5 text-[13px] text-black dark:text-[#EFEEEA] flex items-center justify-between hover:border-black/[0.1] dark:hover:border-white/[0.1] transition-colors"
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
              className="w-full bg-black/[0.02] dark:bg-white/[0.02] rounded px-2 py-1.5 text-[13px] text-black dark:text-[#EFEEEA] outline-none placeholder:text-gray-500"
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
                className="w-full text-left px-3 py-1.5 text-[13px] text-black dark:text-[#EFEEEA] hover:bg-black/[0.04] dark:hover:bg-white/[0.04]"
                style={{ fontFamily: font }}
              >
                {font}
              </button>
            ))}
            {filteredFonts.length === 0 && (
              <div className="px-3 py-2 text-[13px] text-gray-500">No fonts found</div>
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
          className={`flex-1 flex items-center justify-center py-1 px-2 text-[13px] rounded-[4px] transition-colors ${
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

function TreeItem({ icon, label, level = 0, active = false, collapsible = false, collapsed = false, onClick }: { icon: React.ReactNode, label: React.ReactNode, level?: number, active?: boolean, collapsible?: boolean, collapsed?: boolean, onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-1.5 py-1.5 px-3 text-[13px] transition-colors hover:bg-black/[0.04] dark:hover:bg-white/[0.04] ${active ? "bg-white dark:bg-[#1c1c1a] text-black dark:text-[#EFEEEA]" : "text-gray-600 dark:text-[#D8D8D6]"}`}
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
  const { pages, activePageId, setActivePageId, addPage, updatePageName } = useEditor();
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleAddPage = () => {
    const newId = `page-${pages.length + 1}`;
    addPage();
    setEditingId(newId);
  };

  const handleNameChange = (id: string, newName: string) => {
    updatePageName(id, newName);
    setEditingId(null);
  };

  return (
    <div className="py-3">
      <div className="px-4 pb-2 flex items-center justify-between text-black dark:text-[#EFEEEA] text-[15px] font-medium mb-1">
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
                className="w-full bg-white dark:bg-[#1c1c1a] border border-black/10 dark:border-white/10 rounded px-1.5 py-0.5 text-[13px] text-black dark:text-[#EFEEEA] outline-none"
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
              onClick={() => setActivePageId(page.id)}
              icon={idx === 0 ? <Home className="w-3.5 h-3.5" /> : <FileText className="w-3.5 h-3.5" />} 
              label={idx === 0 ? page.name : `/${page.name}`} 
              level={0} 
              active={page.id === activePageId} 
            />
          )
        ))}
      </div>
    </div>
  );
}

function BlocksView() {
  const { pages, activePageId, updateBlockType } = useEditor();
  const activePage = pages.find(p => p.id === activePageId);
  const blocks = activePage?.blocks || [];

  return (
    <div className="py-3">
      <div className="px-4 pb-2 flex items-center justify-between text-black dark:text-[#EFEEEA] text-[15px] font-medium border-b border-black/[0.04] dark:border-white/[0.04] mb-2">
        <span>Blocks</span>
      </div>
      
      <div className="space-y-0.5">
        {blocks.map((block, i) => {
          const match = block.type.match(/^(.*?)Variant(\d+)$/);
          const baseName = match ? match[1] : block.type;
          const currentVariant = match ? parseInt(match[2]) : 1;

          // Define how many variants each block type has
          let maxVariants = 1;
          if (baseName === "Navbar") maxVariants = 3;
          if (baseName === "FAQ") maxVariants = 4;
          if (baseName === "CTA") maxVariants = 5;
          if (baseName === "Footer") maxVariants = 5;

          return (
            <div key={i} className="flex items-center w-full hover:bg-black/[0.04] dark:hover:bg-white/[0.04] px-3 py-1.5 group">
              <div className="flex items-center gap-1.5 flex-1 min-w-0">
                <div className="w-3 h-3 flex items-center justify-center shrink-0 -ml-1"></div>
                <div className="text-gray-600 dark:text-[#D8D8D6]/80 shrink-0 flex items-center justify-center">
                  <Component className="w-3.5 h-3.5 text-purple-400" />
                </div>
                <span className="text-[13px] text-gray-600 dark:text-[#D8D8D6] truncate flex-1">{baseName}</span>
              </div>
              
              {maxVariants > 1 && (
                <div className="shrink-0 flex items-center gap-1">
                  <span className="text-[10px] text-gray-500 uppercase tracking-wide">Var</span>
                  <select
                    className="bg-white dark:bg-[#1c1c1a] border border-black/10 dark:border-white/10 rounded text-[10px] py-0.5 px-1 outline-none text-black dark:text-[#EFEEEA] cursor-pointer hover:border-black/20 dark:hover:border-white/20"
                    value={currentVariant}
                    onChange={(e) => {
                      updateBlockType(activePageId, i, `${baseName}Variant${e.target.value}`);
                    }}
                  >
                    {Array.from({ length: maxVariants }, (_, idx) => (
                      <option key={idx + 1} value={idx + 1}>{idx + 1}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function GlobalView() {
  const { globalTheme, setGlobalTheme } = useEditor();

  const handleUpdate = (updates: Partial<typeof globalTheme>) => {
    setGlobalTheme(prev => ({ ...prev, ...updates }));
  };

  return (
    <div className="py-3">
      <div className="px-4 pb-2 flex items-center justify-between text-black dark:text-[#EFEEEA] text-[15px] font-medium border-b border-black/[0.04] dark:border-white/[0.04] mb-2">
        <span>Global Theme</span>
      </div>
      
      <Section title="Typography">
        <Row label="Heading">
          <FontDropdown 
            value={globalTheme.headingFont ?? ""} 
            onChange={(font) => handleUpdate({ headingFont: font })} 
          />
        </Row>
        <Row label="Body">
          <FontDropdown 
            value={globalTheme.bodyFont ?? ""} 
            onChange={(font) => handleUpdate({ bodyFont: font })} 
          />
        </Row>
      </Section>

      <Section title="Colors">
        <Row label="Primary">
          <ColorInput 
            value={globalTheme.primaryColor ?? ""} 
            onChange={(val) => handleUpdate({ primaryColor: val })} 
          />
        </Row>
        <Row label="Secondary">
          <ColorInput 
            value={globalTheme.secondaryColor ?? ""} 
            onChange={(val) => handleUpdate({ secondaryColor: val })} 
          />
        </Row>
        <Row label="Accent">
          <ColorInput 
            value={globalTheme.accentColor ?? ""} 
            onChange={(val) => handleUpdate({ accentColor: val })} 
          />
        </Row>
      </Section>
    </div>
  );
}

function ImageManager({ overrides, handleUpdate }: { overrides: Partial<TextProperties>, handleUpdate: (updates: Partial<TextProperties>) => void }) {
  const [mode, setMode] = useState<"upload" | "unsplash">("upload");
  const [isUploading, setIsUploading] = useState(false);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [unsplashResults, setUnsplashResults] = useState<any[]>([]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "");
    
    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
        method: "POST",
        body: formData
      });
      const data = await res.json();
      if (data.secure_url) {
        handleUpdate({ src: data.secure_url });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSearch = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      setIsSearching(true);
      try {
        const res = await fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(searchQuery)}&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}&per_page=12`);
        const data = await res.json();
        setUnsplashResults(data.results || []);
      } catch (err) {
        console.error(err);
      } finally {
        setIsSearching(false);
      }
    }
  };

  return (
    <Section title="Image Management">
      <div className="flex flex-col gap-3 w-full">
        <ToggleGroup 
          options={["Upload", "Unsplash"]} 
          activeIndex={mode === "upload" ? 0 : 1} 
          onChange={(i) => setMode(i === 0 ? "upload" : "unsplash")} 
        />
        
        {mode === "upload" && (
          <div className="flex flex-col gap-2">
            <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-black/[0.1] dark:border-white/[0.1] rounded-lg cursor-pointer hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors relative overflow-hidden">
              {isUploading ? (
                <span className="text-[13px] text-gray-500">Uploading...</span>
              ) : (
                <>
                  <Plus className="w-5 h-5 text-gray-400 mb-1" />
                  <span className="text-[13px] text-gray-500">Click to upload</span>
                </>
              )}
              <input type="file" className="hidden" accept="image/*" onChange={handleUpload} disabled={isUploading} />
            </label>
            <Input 
              value={overrides.alt ?? ""} 
              onChange={(val) => handleUpdate({ alt: val })} 
              placeholder="Alt Text (Optional)"
            />
          </div>
        )}

        {mode === "unsplash" && (
          <div className="flex flex-col gap-3">
            <Input 
              value={searchQuery}
              onChange={setSearchQuery}
              onKeyDown={handleSearch}
              placeholder="Search & hit Enter..."
            />
            {isSearching && <div className="text-[13px] text-gray-500 text-center py-4">Searching...</div>}
            {!isSearching && unsplashResults.length > 0 && (
              <div className="grid grid-cols-2 gap-1.5 max-h-[240px] overflow-y-auto custom-scrollbar pr-1">
                {unsplashResults.map(img => (
                  <button
                    key={img.id}
                    onClick={() => handleUpdate({ src: img.urls.regular, alt: img.alt_description })}
                    className="relative aspect-video rounded overflow-hidden group border border-black/10 dark:border-white/10"
                  >
                    <img src={img.urls.small} alt={img.alt_description || ""} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </button>
                ))}
              </div>
            )}
            {!isSearching && unsplashResults.length === 0 && searchQuery && (
              <div className="text-[13px] text-gray-500 text-center py-4">No results found</div>
            )}
          </div>
        )}
      </div>
    </Section>
  );
}

export function PropertiesPanel() {
  const { selectedId, elementOverrides, updateOverride, iframeDoc } = useEditor();
  const [activeTab, setActiveTab] = useState(3); // 0: Pages, 1: Blocks, 2: Global, 3: Properties
  const [computedStyles, setComputedStyles] = useState<Record<string, string>>({});
  const [selectedTagName, setSelectedTagName] = useState<string | null>(null);

  useEffect(() => {
    if (selectedId) {
      const timeout = setTimeout(() => {
        const doc = iframeDoc || document;
        const el = doc.querySelector(`[data-editable-id="${selectedId.replace(/"/g, '\\"')}"]`) as HTMLElement;
        if (el) {
          setSelectedTagName(el.tagName.toLowerCase());
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
            paddingTop: styles.paddingTop,
            paddingBottom: styles.paddingBottom,
          });
        }
      }, 0);
      return () => clearTimeout(timeout);
    } else {
      setComputedStyles({});
      setSelectedTagName(null);
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
          options={["Pages", "Blocks", "Global", "Props"]} 
          activeIndex={activeTab} 
          onChange={setActiveTab}
        />
      </div>

      {/* Panel Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {activeTab === 0 && <PagesView />}
        {activeTab === 1 && <BlocksView />}
        {activeTab === 2 && <GlobalView />}
        {activeTab === 3 && (
          <div className={`pb-8 transition-opacity duration-300 ${!selectedId ? 'opacity-30 pointer-events-none select-none' : ''}`}>
            
            {/* Navbar Specific Section */}
            {selectedId?.startsWith("navbar-") && (
              <Section title="Navbar Links">
                <Row label="Link 1">
                  <div className="flex flex-col gap-2 w-full">
                    <Input 
                      value={elementOverrides[`${selectedId}-link1`]?.content ?? "Features"} 
                      onChange={(val) => updateOverride(`${selectedId}-link1`, { content: val })} 
                      placeholder="Text"
                    />
                    <Input 
                      value={elementOverrides[`${selectedId}-link1`]?.href ?? ""} 
                      onChange={(val) => updateOverride(`${selectedId}-link1`, { href: val })} 
                      placeholder="https://"
                    />
                  </div>
                </Row>
                <Row label="Link 2">
                  <div className="flex flex-col gap-2 w-full">
                    <Input 
                      value={elementOverrides[`${selectedId}-link2`]?.content ?? "Pricing"} 
                      onChange={(val) => updateOverride(`${selectedId}-link2`, { content: val })} 
                      placeholder="Text"
                    />
                    <Input 
                      value={elementOverrides[`${selectedId}-link2`]?.href ?? ""} 
                      onChange={(val) => updateOverride(`${selectedId}-link2`, { href: val })} 
                      placeholder="https://"
                    />
                  </div>
                </Row>
                <Row label="Link 3">
                  <div className="flex flex-col gap-2 w-full">
                    <Input 
                      value={elementOverrides[`${selectedId}-link3`]?.content ?? "Docs"} 
                      onChange={(val) => updateOverride(`${selectedId}-link3`, { content: val })} 
                      placeholder="Text"
                    />
                    <Input 
                      value={elementOverrides[`${selectedId}-link3`]?.href ?? ""} 
                      onChange={(val) => updateOverride(`${selectedId}-link3`, { href: val })} 
                      placeholder="https://"
                    />
                  </div>
                </Row>
                <Row label="CTA">
                  <div className="flex flex-col gap-2 w-full">
                    <Input 
                      value={elementOverrides[`${selectedId}-cta-text`]?.content ?? "Get Started"} 
                      onChange={(val) => updateOverride(`${selectedId}-cta-text`, { content: val })} 
                      placeholder="Text"
                    />
                    <Input 
                      value={elementOverrides[`${selectedId}-cta`]?.href ?? ""} 
                      onChange={(val) => updateOverride(`${selectedId}-cta`, { href: val })} 
                      placeholder="https://"
                    />
                  </div>
                </Row>
              </Section>
            )}

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
                <ColorInput 
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
                <ColorInput 
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

            {/* Image Section */}
            {selectedTagName === "img" && (
              <ImageManager overrides={overrides} handleUpdate={handleUpdate} />
            )}

            {/* Layout Section */}
            <Section title="Layout">
              <Row label={<><Plus className="h-3 w-3" /> Padding Top</>}>
                <div className="flex items-center gap-2 w-full">
                  <Input 
                    value={overrides.paddingTop?.toString() ?? (computedStyles.paddingTop ? parseFloat(computedStyles.paddingTop).toString() : "0")} 
                    onChange={(val) => {
                      const num = parseInt(val);
                      if (!isNaN(num)) handleUpdate({ paddingTop: num });
                    }} 
                    postfix="Px" 
                  />
                </div>
              </Row>
              
              <Row label={<><Plus className="h-3 w-3" /> Padding Bottom</>}>
                <div className="flex items-center gap-2 w-full">
                  <Input 
                    value={overrides.paddingBottom?.toString() ?? (computedStyles.paddingBottom ? parseFloat(computedStyles.paddingBottom).toString() : "0")} 
                    onChange={(val) => {
                      const num = parseInt(val);
                      if (!isNaN(num)) handleUpdate({ paddingBottom: num });
                    }} 
                    postfix="Px" 
                  />
                </div>
              </Row>
              
              <Row label={<><Plus className="h-3 w-3" /> Invert Theme</>}>
                <div className="flex items-center gap-2 w-full">
                  <ToggleGroup 
                    options={[<span key="yes" className="text-blue-400 font-medium">Yes</span>, <span key="no">No</span>]} 
                    activeIndex={overrides.invert ? 0 : 1} 
                    onChange={(idx) => handleUpdate({ invert: idx === 0 })}
                  />
                </div>
              </Row>

              <Row label={<><Plus className="h-3 w-3" /> Background</>}>
                <ColorInput 
                  value={overrides.backgroundColor ?? computedStyles.backgroundColor ?? ""} 
                  onChange={(val) => handleUpdate({ backgroundColor: val })} 
                />
              </Row>
            </Section>
          </div>
        )}
      </div>
    </div>
  );
}
