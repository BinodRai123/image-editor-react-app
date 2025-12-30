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

console.log(getInitialFilterState(filterData));

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

/* -----------------------------------------
   Component
------------------------------------------ */
const PhotoEditorSidebar = () => {
   const tabs = ["Adjust", "Layers", "History"];
   const [filtr, setGlobalFilterData] = useContext(reactContext);

   const [activeTab, setActiveTab] = useState("Adjust");
   const [filters, setFilters] = useState(() => getInitialFilterState(filterData));
   const [activePreset, setActivePreset] = useState("Original");

   /* ---- useCallback help to memorize the function ----*/
   /* ---- on every re-render which will avoid ----*/
   /* ---- Creating new function when react re-render ----*/
   const handleRangeChange = useCallback((event) => {
      const { id, value } = event.target;

      setFilters((prev) => ({
         ...prev,
         [id]: { ...prev[id], value: Number(value) },
      }));
   }, []);

   useEffect(() => {
      setGlobalFilterData(filters);
   }, [filters]);

   // console.log("filters => ", filters);
   // // console.log(filterData);
   // console.log("global filter => ", filtr);
   /* Memoized preset preview style */
   const getPresetPreviewStyle = useCallback(
      (preset) => ({
         backgroundImage:
            "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDa1tDzYwxRMFylULhlUaolLWmx7rDkhJphX3fZt4bXLmfa054Xp0zEW-DjyEjtfbEUiSraqZGaUQ4C8D9uefXMrQ6lwVnP5WIAlXUvhf-PPVhNEBU2RJ98xsqdo6dCHfZRBqUuIKSDTGO15Q8Sp-h94B4grd22p5QuBrcst5XYAejlazFPPy68wvtDXYVSfGeb6f0LZ8tJRiOhwlvV3Kjl7j-bfWzDki2MzBNz_nSZNRSqDWYMxPMqFpkWe9PcJKm-dz7YZLY4vQ')",
         filter: preset.style.filter,
         opacity: preset.style.opacity ?? 0.8,
      }),
      []
   );

   /* ---- Show which preset is active ----  */
   const handleActivePreset = useCallback((name) => {
      setActivePreset(name);
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
            {activeTab === "Adjust" &&
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
                                 <span>{filters[control.id]["value"]}</span>
                              </div>

                              <input
                                 id={control.id}
                                 type="range"
                                 className="custom-range"
                                 min={control.min}
                                 max={control.max}
                                 value={filters[control.id]["value"]}
                                 onChange={handleRangeChange}
                              />
                           </div>
                        ))}
                     </div>
                  </div>
               ))}

            {/* Presets */}
            {activeTab === "Adjust" && (
               <section className="control-group">
                  <h3>Filter Presets</h3>

                  <div className="filter-grid">
                     {PresetData.map((preset) => (
                        <button
                           key={preset.name}
                           className={`preset-card ${preset.name === activePreset ? "active" : ""}`}
                           onClick={() => handleActivePreset(preset.name)}
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
