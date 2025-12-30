import { useState, useCallback, useContext, useEffect } from "react";
import FilterConstants from "./filtersData";
import "./PhotoEditorSidebar.css";
import { reactContext } from "../../WrapFilterData/WrapperFilters";

const { filterData, PresetData } = FilterConstants;

/* -----------------------------------------
Utils
------------------------------------------ */
const getInitialFilterState = (filterData) => {
   return filterData.reduce((acc, section) => {
      section.controls.forEach(({ id, defaultValue, unit }) => {
         acc[id] = {
            value: defaultValue,
            unit,
         };
      });
      return acc;
   }, {});
};

/* return this in object
{ 
 brightness: 0, 
   contrast: 15, 
   exposure: 20, 
   saturation: 0, 
   hue: 0, 
   blur: 0, 
   grayscale: 0, 
   sepia: 0, 
   opacity: 100, 
   invert: 0 
  } */

// parse/convert the preset filter string into
// nested objected for globalfilterdata
function parseFilters(filterString) {
   const result = {};

   // Regex: matches 'filter-name(number unit)'
   // group 1: name, group 2: value, group 3: unit
   const regex = /([\w-]+)\(([\d.]+)([^)]*)\)/g;
   let match;

   while ((match = regex.exec(filterString)) !== null) {
      const [_, name, value, unit] = match;
      result[name] = {
         value: parseFloat(value),
         unit: unit.trim(),
      };
   }

   return result;
}

/* -----------------------------------------
   Component
------------------------------------------ */
const PhotoEditorSidebar = () => {
   const tabs = ["All", "Filters", "Presets"];
   const { globalFilterData, setGlobalFilterData } = useContext(reactContext);
   const [activeTab, setActiveTab] = useState("All");
   const [activePreset, setActivePreset] = useState("Original");

   /* ---- useCallback help to memorize the function ----*/
   /* ---- on every re-render which will avoid ----*/
   /* ---- Creating new function when react re-render ----*/
   const handleRangeChange = useCallback((event) => {
      const { id, value } = event.target;

      // Use the functional update to ensure we don't have dependency issues
      // AND wrap in a transition if using React 18+ to prioritize UI responsiveness
      setGlobalFilterData((prev) => {
         if (prev[id].value === Number(value)) return prev; // Skip if no change
         return {
            ...prev,
            [id]: { ...prev[id], value: Number(value) },
         };
      });
      setActivePreset("");
   }, []);

   //Initiailzed filterdata is seeting in globalfilterdata
   //without useeffect the context cannot re-render immediatly after initialized
   useEffect(() => {
      setGlobalFilterData(() => getInitialFilterState(filterData));
   }, []);

   /* Memoized preset preview style */
   const getPresetPreviewStyle = useCallback((preset) => {
      return {
         backgroundImage:
            "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDa1tDzYwxRMFylULhlUaolLWmx7rDkhJphX3fZt4bXLmfa054Xp0zEW-DjyEjtfbEUiSraqZGaUQ4C8D9uefXMrQ6lwVnP5WIAlXUvhf-PPVhNEBU2RJ98xsqdo6dCHfZRBqUuIKSDTGO15Q8Sp-h94B4grd22p5QuBrcst5XYAejlazFPPy68wvtDXYVSfGeb6f0LZ8tJRiOhwlvV3Kjl7j-bfWzDki2MzBNz_nSZNRSqDWYMxPMqFpkWe9PcJKm-dz7YZLY4vQ')",
         filter: preset.style.filters ?? "gray(10px)",
         opacity: preset.style.opacity ?? 1,
      };
   }, []);

   /* ---- Show which preset is active ----  */
   const handleActivePreset = useCallback((name, id) => {
      setActivePreset(name);
      const ParsedPresetStringtoObj = parseFilters(PresetData[id].style.filters);
      setGlobalFilterData(ParsedPresetStringtoObj);
   }, []);

   return (
      <aside className="editor-sidebar">
         {/* Tabs */}
         <div className="tab-header">
            {tabs.map((tab) => (
               <button
                  key={tab}
                  className={`tab-button ${activeTab === tab ? "active" : ""}`}
                  onClick={() => setActiveTab(tab)}
               >
                  {tab}
               </button>
            ))}
         </div>

         <div className="sidebar-content">
            {/* Adjust Tab */}
            {(activeTab === "All" || activeTab === "Filters") &&
               filterData.map((section) => (
                  <div key={section.SectionName} className="card">
                     <div className="row">
                        {section.icon ? <>{section.icon}</> : "error"}
                        <h4>{section.SectionName}</h4>
                     </div>

                     <div className="slider-stack">
                        {section.controls.map((control) => (
                           <div key={control.id} className="slider-container">
                              <div className="slider-info">
                                 <span>{control.label}</span>
                                 <span>{globalFilterData[`${control?.id}`]["value"]}</span>
                              </div>

                              <input
                                 id={control.id}
                                 type="range"
                                 className="custom-range"
                                 min={control.min}
                                 max={control.max}
                                 value={globalFilterData[`${control.id}`]["value"]}
                                 onChange={handleRangeChange}
                              />
                           </div>
                        ))}
                     </div>
                  </div>
               ))}

            {/* Presets */}
            {(activeTab === "All" || activeTab === "Presets") && (
               <section className="control-group">
                  <h3>Filter Presets</h3>

                  <div className="filter-grid">
                     {PresetData.map((preset, id) => (
                        <button
                           key={preset.name}
                           className={`preset-card ${preset.name === activePreset ? "active" : ""}`}
                           onClick={() => handleActivePreset(preset.name, id)}
                        >
                           <div
                              className="filter-preview"
                              style={{ backgroundColor: preset.style.backgroundColor }}
                           >
                              <div className="preview-image" style={getPresetPreviewStyle(preset)} />
                           </div>

                           <span style={{ fontSize: "0.7rem" }}>{preset.name}</span>
                        </button>
                     ))}
                  </div>
               </section>
            )}
         </div>

         {/* Footer */}
         <div className="sidebar-footer">
            <button className="btn-auto-enhance">Auto Enhance</button>
         </div>
      </aside>
   );
};

export default PhotoEditorSidebar;
