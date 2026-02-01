import React, { useState, useCallback, useContext, useEffect } from "react";
import FilterConstants from "./filtersData";
import "./PhotoEditorSidebar.css";
import { reactContext } from "../../WrapFilterData/WrapperFilters";

// Destructuring filterData and PresetData from FilterConstants
const { filterData, PresetData } = FilterConstants;

/* -----------------------------------------
Utils
------------------------------------------ */
//this function will return initial filter state object
// like this { brightness: {value:0, unit: '%'}, contrast: {value:15, unit: '%'} ...}
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
const PhotoEditorSidebar = React.memo(() => {
   const tabs = ["All", "Filters", "Presets"];
   const { globalFilterData, setGlobalFilterData } = useContext(reactContext);
   const [activeTab, setActiveTab] = useState("All");
   const [activePreset, setActivePreset] = useState("Original");
   const [isOpen, setIsOpen] = useState(false);

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
         backgroundImage: "",
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

   /* ---- toggle sidebar ---- */
   const toggleSidebar = () => {
      setIsOpen(!isOpen);
   };

   /* ---- Auto Enhancer button functionality ----  */
   const handleAutoEnhancer = () => {
      let min = 0,
         max = PresetData.length - 1;
      const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      setActivePreset(PresetData[randomNumber].name);
      const ParsedPresetStringtoObj = parseFilters(PresetData[randomNumber].style.filters);
      setGlobalFilterData(ParsedPresetStringtoObj);
   };

   return (
      <>
         {/* ---- Menubar Icon ----- */}
         <button
            className="menubar"
            onClick={toggleSidebar}
            style={{ background: "none", border: "none", padding: 0 }}
         >
            <div className={`menu-container ${isOpen ? "open" : ""}`}>
               <div className="bar"></div>
               <div className="bar"></div>
               <div className="bar"></div>
            </div>
         </button>

         {/* This div is used for overloady where  */}
         {/* when client clicks outside the sidebar, it closed the sidebar */}
         {isOpen && <div className="sidebar-overlay" onClick={() => setIsOpen(!isOpen)} />}

         {/* ----- Filter & Presets Sidebar ----- */}
         <aside className={`editor-sidebar ${isOpen ? "editor-sidebar-open" : ""}`}>
            {/* Tabs */}
            <div className="tab-header">
               {tabs.map((tab) => (
                  <button
                     key={tab}
                     className={`tab-button ${activeTab === tab ? "active" : ""}`}
                     onClick={() => setActiveTab(tab)}
                     title={tab}
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
                           <h1>{section.SectionName}</h1>
                        </div>

                        <div className="slider-stack">
                           {section.controls.map((control) => (
                              <div key={control.id} className="slider-container">
                                 <div className="slider-info">
                                    <label htmlFor={`${control.id}`} aria-label={`${control.id}`}>
                                       {control.label}
                                    </label>
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
                     <h1 style={{ marginBottom: "0.5rem" }}>Filter Presets</h1>

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
                                 <div
                                    className="preview-image"
                                    style={getPresetPreviewStyle(preset)}
                                    alt="Preset Background Image"
                                 />
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
               <button onClick={handleAutoEnhancer} className="btn-auto-enhance">
                  Auto Enhance
               </button>
            </div>
         </aside>
      </>
   );
});

export default PhotoEditorSidebar;
