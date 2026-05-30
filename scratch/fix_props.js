const fs = require('fs');
let content = fs.readFileSync('src/components/PropertiesPanel.tsx', 'utf8');

// 1. Remove + from labels
content = content.replace(/label=\{<><Plus className="h-3 w-3" \/> (.*?)<\/>\}/g, 'label="$1"');

// 2. Replace Opacity and Visible rows
const oldOpacityVisible = `<Row label="Opacity">
                <div className="flex items-center gap-3 w-full">
                  <div className="w-16"><Input value="1" /></div>
                  <Slider value={0.8} />
                </div>
              </Row>
              <Row label="Visible">
                <ToggleGroup options={[<span key="yes" className="text-blue-400 font-medium">Yes</span>, <span key="no">No</span>]} activeIndex={0} />
              </Row>`;

const newOpacityVisible = `<Row label="Opacity">
                <div className="flex items-center gap-3 w-full">
                  <div className="w-16">
                    <Input 
                      value={overrides.opacity?.toString() ?? (computedStyles.opacity ? computedStyles.opacity : "1")} 
                      onChange={(val) => {
                        const num = parseFloat(val);
                        if (!isNaN(num)) handleUpdate({ opacity: num });
                      }} 
                    />
                  </div>
                  <Slider 
                    value={overrides.opacity ?? (computedStyles.opacity ? parseFloat(computedStyles.opacity) : 1)} 
                    onChange={(val) => handleUpdate({ opacity: val })} 
                  />
                </div>
              </Row>
              <Row label="Visible">
                <ToggleGroup 
                  options={[<span key="yes" className="text-blue-400 font-medium">Yes</span>, <span key="no">No</span>]} 
                  activeIndex={overrides.visible === false ? 1 : 0} 
                  onChange={(idx) => handleUpdate({ visible: idx === 0 })}
                />
              </Row>`;

content = content.replace(oldOpacityVisible, newOpacityVisible);

// 3. Remove OpenType row
content = content.replace(/<Row label="OpenType">[\s\S]*?<\/Row>/g, '');

// 4. Remove Styles row
content = content.replace(/<Row label="Styles">[\s\S]*?<\/Row>/g, '');

// 5. Fix FontDropdown trim
content = content.replace(
  "value={overrides.fontFamily ?? (computedStyles.fontFamily ? computedStyles.fontFamily.replace(/['\"]/g, '').split(',')[0] : \"\")}",
  "value={overrides.fontFamily ?? (computedStyles.fontFamily ? computedStyles.fontFamily.replace(/['\"]/g, '').split(',')[0].trim() : \"\")}"
);

// 6. Update Slider component
const oldSliderRegex = /function Slider\(\{ value \}: \{ value: number \}\) \{.*?return.*?<\/div>.*?<\/div>.*?;\s*\}/s;

const newSlider = `function Slider({ value, onChange }: { value: number, onChange?: (val: number) => void }) {
  return (
    <div 
      className="w-full flex items-center gap-2 cursor-pointer" 
      onMouseDown={(e) => {
        if (!onChange) return;
        const rect = e.currentTarget.getBoundingClientRect();
        let newVal = (e.clientX - rect.left) / rect.width;
        onChange(Math.max(0, Math.min(1, newVal)));
        const handleMouseMove = (moveE: MouseEvent) => {
          let newVal = (moveE.clientX - rect.left) / rect.width;
          onChange(Math.max(0, Math.min(1, newVal)));
        };
        const handleMouseUp = () => {
          window.removeEventListener('mousemove', handleMouseMove as any);
          window.removeEventListener('mouseup', handleMouseUp);
        };
        window.addEventListener('mousemove', handleMouseMove as any);
        window.addEventListener('mouseup', handleMouseUp);
      }}
    >
      <div className="relative flex-1 h-1 bg-black/10 dark:bg-[#1c1c1a] rounded-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 bottom-0 bg-blue-500 rounded-full" style={{ width: \`\${value * 100}%\` }} />
      </div>
      <div className="w-3 h-3 bg-[#EFEEEA] rounded-full shadow-sm border border-black/20 shrink-0 pointer-events-none" />
    </div>
  );
}`;

content = content.replace(oldSliderRegex, newSlider);


// 7. Replace Global Typography
const oldGlobalTypo = `<Section title="Typography">
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
      </Section>`;

const newGlobalTypo = `<Section title="Heading Typography">
        <Row label="Font">
          <FontDropdown 
            value={globalTheme.headingFont ?? ""} 
            onChange={(font) => handleUpdate({ headingFont: font })} 
          />
        </Row>
        <Row label="Weight">
          <Input 
            value={globalTheme.headingFontWeight ?? ""} 
            onChange={(val) => handleUpdate({ headingFontWeight: val })} 
            placeholder="e.g. 700 or bold"
          />
        </Row>
        <Row label="Letter Spacing">
          <Input 
            value={globalTheme.headingLetterSpacing ?? ""} 
            onChange={(val) => handleUpdate({ headingLetterSpacing: val })} 
            placeholder="e.g. -0.02em"
          />
        </Row>
        <Row label="Line Height">
          <Input 
            value={globalTheme.headingLineHeight ?? ""} 
            onChange={(val) => handleUpdate({ headingLineHeight: val })} 
            placeholder="e.g. 1.2"
          />
        </Row>
      </Section>
      <Section title="Body Typography">
        <Row label="Font">
          <FontDropdown 
            value={globalTheme.bodyFont ?? ""} 
            onChange={(font) => handleUpdate({ bodyFont: font })} 
          />
        </Row>
        <Row label="Weight">
          <Input 
            value={globalTheme.bodyFontWeight ?? ""} 
            onChange={(val) => handleUpdate({ bodyFontWeight: val })} 
            placeholder="e.g. 400 or normal"
          />
        </Row>
        <Row label="Letter Spacing">
          <Input 
            value={globalTheme.bodyLetterSpacing ?? ""} 
            onChange={(val) => handleUpdate({ bodyLetterSpacing: val })} 
            placeholder="e.g. 0.01em"
          />
        </Row>
        <Row label="Line Height">
          <Input 
            value={globalTheme.bodyLineHeight ?? ""} 
            onChange={(val) => handleUpdate({ bodyLineHeight: val })} 
            placeholder="e.g. 1.6"
          />
        </Row>
      </Section>`;

content = content.replace(oldGlobalTypo, newGlobalTypo);

fs.writeFileSync('src/components/PropertiesPanel.tsx', content);
console.log('Done!');
