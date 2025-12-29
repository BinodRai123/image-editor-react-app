import { useState } from "react";
import "./PhotoEditorSidebar.css";
import FilterConstants from "./filtersData";

const { filterData, PresetData } = FilterConstants;

const getInitialFilterState = (data) => {
   return data.reduce((acc, section) => {
      section.controls.forEach((control) => {
         acc[control.id] = control.defaultValue;
      });
      return acc;
   }, {});
};

const PhotoEditorSidebar = () => {
   const [activeTab, setActiveTab] = useState("Adjust");
   const [filterDatas, setFilterDatas] = useState(() => getInitialFilterState(filterData));
   const tabs = ["Adjust", "Layers", "History"];

   console.log(filterDatas);

   const handleFilterRangeChange = (id) => (event) => {
      const value = Number(event.target.value);

      setFilterDatas((prev) => ({
         ...prev,
         [id]: value,
      }));
   };

   return (
      <aside className="editor-sidebar">
         {/* Tab Navigation */}
         <div className="tab-header">
            {tabs.map((tab) => (
               <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`tab-button ${activeTab === tab ? "active" : ""}`}
               >
                  {tab}
               </button>
            ))}
         </div>

         {/* Scrollable Content */}
         <div className="sidebar-content">
            {filterData.map((filter) => (
               <div key={filter.SectionName} className="card">
                  {/* SectionName Header */}
                  <div>
                     <h4>{filter.SectionName}</h4>
                  </div>

                  {/* Slider List */}
                  <div className="slider-stack">
                     {filter.controls.map((control) => (
                        <div key={control.id} className="slider-container">
                           <div className="slider-info">
                              <span>{control.label}</span>
                              <span>{filterDatas[control.id]}</span>
                           </div>
                           <input
                              type="range"
                              className="custom-range"
                              min={control.min}
                              max={control.max}
                              value={filterDatas[control.id]}
                              onChange={handleFilterRangeChange(control.id)}
                           />
                        </div>
                     ))}
                  </div>
               </div>
            ))}

            <section className="control-group">
               <h3>Filter Presets</h3>
               <div className="filter-grid">
                  {PresetData.map((filter) => (
                     <button
                        key={filter.name}
                        className={`preset-card ${filter.name === "Original" ? "active" : ""}`}
                     >
                        <div
                           className="filter-preview"
                           style={{ backgroundColor: filter.style.backgroundColor }}
                        >
                           <div
                              className="preview-image"
                              style={{
                                 backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDa1tDzYwxRMFylULhlUaolLWmx7rDkhJphX3fZt4bXLmfa054Xp0zEW-DjyEjtfbEUiSraqZGaUQ4C8D9uefXMrQ6lwVnP5WIAlXUvhf-PPVhNEBU2RJ98xsqdo6dCHfZRBqUuIKSDTGO15Q8Sp-h94B4grd22p5QuBrcst5XYAejlazFPPy68wvtDXYVSfGeb6f0LZ8tJRiOhwlvV3Kjl7j-bfWzDki2MzBNz_nSZNRSqDWYMxPMqFpkWe9PcJKm-dz7YZLY4vQ')`,
                                 filter: filter.style.filter,
                                 opacity: filter.style.opacity || 0.8,
                              }}
                           ></div>
                        </div>
                        <span style={{ fontSize: "0.7rem" }}>{filter.name}</span>
                     </button>
                  ))}
               </div>
            </section>
         </div>

         {/* Footer Action */}
         <div className="sidebar-footer">
            <button className="btn-auto-enhance">Auto Enhance</button>
         </div>
      </aside>
   );
};

export default PhotoEditorSidebar;
